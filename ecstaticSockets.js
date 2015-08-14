var exports = module.exports = {};

// Declare variables used
var client, express, io, port, rtg,request, async, proximity, util, mongoose, socket, config;

// Define values
util = require('util');
request = require('request');
port = 3001;
async = require('async');
config = require('./config/config.json');
console.log("config="+config);
if(process.env.NODE_ENV == 'development'){
    config = config.development;
}
else{
    config = config.production;
}
client = require('redis').createClient(6379, config.cacheBackend, {no_ready_check: true});
proximity = require('geo-proximity').initialize(client);
socket_number = 0;

//make client avilable in index.js
exports.client = client;


exports.setupEcstaticSockets = function(app){
    // Listen
    io = require('socket.io')({
    }).listen(app.listen(port));
    console.log("Listening on port " + port);

    // Handle new messages
    io.sockets.on('connection', function (socket) {
        //needed to store data regarding the socket
        client.set(socket.id, JSON.stringify({}));

        socket.on('disconnect', function () {
            console.log("heard disconnect");
        });

        //creates a new room
        socket.on('create_channel', function (data) {    
            //check if you already joined a room
            if(Object.keys(io.sockets.adapter.rooms).length > 1){
                for(var key in io.sockets.adapter.rooms){
                    console.log("all keys="+key);
                    if(key !== socket.id){
                        console.log("leave key="+key);
                        socket.leave(key);
                    }
                }
            }
        
            client.get(socket.id, function (err, socket_info){
                //create a new playerstate and save it
                socket_info_dict = JSON.parse(socket_info);
                socket_info_dict.player_state = {'is_playing': 1, 'is_locked': 0, 'playlistIndex': 0, 'timestamp': new Date().getTime(), 'requestTime':new Date().getTime(), 'channel_name': data.channel_name, 'channel_id': socket.id, sources: data.sources};
                client.set(socket.id, JSON.stringify(socket_info_dict));

                //add the callback id and send it back
                socket_info_dict.callback_id = data.callback_id;
                io.sockets.emit("create_channel", socket_info_dict);
            });
        });

        //lists all created rooms
        socket.on('channelList', function (data) {
            var channels = io.sockets.adapter.rooms;
            var channel_ids = [];
            console.log(channels);
            //extract the keys (room_id)
            for(var channel_id in channels) {
                channel_ids.push(channel_id);
            }

            //check whether the owner is in the room, if they are, then add the room
            async.map(channel_ids, get_channel_info, function (err, channelList){
                socket.emit("channelList", {channelList:channelList, callback_id: data.callback_id});
            });
        });

        function get_channel_info(channel_id, callback){
            client.get(channel_id, function (err, channel_info){
                var parsed = JSON.parse(channel_info);
                if("player_state" in parsed){
                    parsed.player_state.users = io.sockets.adapter.rooms[channel_id];
                    parsed.player_state.requestTime = new Date().getTime();
                }
                callback(null, parsed);
            });
        }
        
        socket.on('next_song_action', function (data) {
            console.log("next_song, data="+JSON.stringify(data));
            client.get(data.channel_id, function (err, socket_info){
                //create a new playerstate and save it
                socket_info_dict = JSON.parse(socket_info);
                socket_info_dict.player_state.playlistIndex = data.playlistIndex;
                socket_info_dict.player_state.timestamp = new Date().getTime();
                client.set(data.channel_id, JSON.stringify(socket_info_dict));

                //add the callback id and send it back
                socket_info_dict.callback_id = data.callback_id;
                socket.broadcast.to(data.channel_id).emit("next_song_action", socket_info_dict);
            });

        });

        //Joins an existing channel
        socket.on('join_channel', function (data) {
            console.log("socket.id="+socket.id+"joining channel"+data.channel_id);
            socket.join(data.channel_id);
        });

        //leaves an existing channel
        socket.on('leave_channel', function (data){
            console.log("leave_channel, data="+data);
            socket.leave(data.channel_id);
        });

        socket.on('users', function (data) {
            var clients = io.sockets.adapter.rooms[data.channel_id]; 
            socket.emit("users", clients);
        });


        //PLAYLIST
        socket.on('add_song', function (data) {
            var params = JSON.parse(data);
            console.log("channels="+socket.rooms);
            //add the song to the db
            add_song(params, socket.rooms[index]);

            
            for(var index = 0; index < socket.rooms.length; index++) {
                if (socket.rooms[index] != socket.id){
                    socket.broadcast.to(socket.rooms[index]).emit("add_song", params);
                }
                else{
                    socket.emit("add_song", params);
                }  
            }
        });

         function add_song(song, channel_id){
            client.get(channel_id, function (err, socket_info){
                socket_info = JSON.parse(socket_info);
                socket_info.player_state.playlist.push(song);
                client.set(channel_id, JSON.stringify(socket_info));
            });
         }
     });
}
