var exports = module.exports = {};

// Declare variables used
var client, express, io, port, rtg, room_counter,request, async, proximity, util, mongoose, socket;

// Define values
util = require('util');
request = require('request');
port = process.env.PORT || 8080;
async = require('async');
client = require('redis').createClient(6379, '172.31.18.30', {});
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
        socket.on('create_room', function (data) {    
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
                socket_info_dict.player_state = {'is_playing': 1, 'is_locked': 0, 'playlistIndex': 0, 'timestamp': new Date().getTime(), 'requestTime':new Date().getTime(), 'room_name': data.room_name, 'room_id': socket.id, sources: data.sources};
                client.set(socket.id, JSON.stringify(socket_info_dict));

                //add the callback id and send it back
                socket_info_dict.callback_id = data.callback_id;
                io.sockets.emit("create_room", socket_info_dict);
            });
        });

        //lists all created rooms
        socket.on('roomList', function (data) {
            var rooms = io.sockets.adapter.rooms;
            var room_ids = [];
            console.log(rooms);
            //extract the keys (room_id)
            for(var room_id in rooms) {
                room_ids.push(room_id);
            }

            //check whether the owner is in the room, if they are, then add the room
            async.map(room_ids, get_room_info, function (err, roomList){
                socket.emit("roomList", {roomList:roomList, callback_id: data.callback_id});
            });
        });

        function get_room_info(room_id, callback){
            client.get(room_id, function (err, room_info){
                var parsed = JSON.parse(room_info);
                if("player_state" in parsed){
                    parsed.player_state.users = io.sockets.adapter.rooms[room_id];
                    parsed.player_state.requestTime = new Date().getTime();
                }
                callback(null, parsed);
            });
        }
        
        socket.on('next_song_action', function (data) {
            console.log("next_song, data="+JSON.stringify(data));
            client.get(data.room_id, function (err, socket_info){
                //create a new playerstate and save it
                socket_info_dict = JSON.parse(socket_info);
                socket_info_dict.player_state.playlistIndex = data.playlistIndex;
                socket_info_dict.player_state.timestamp = new Date().getTime();
                client.set(data.room_id, JSON.stringify(socket_info_dict));

                //add the callback id and send it back
                socket_info_dict.callback_id = data.callback_id;
                socket.broadcast.to(data.room_id).emit("next_song_action", socket_info_dict);
            });

        });

        //Joins an existing room
        socket.on('join_room', function (data) {
            console.log("socket.id="+socket.id+"joining room"+data.room_id);
            socket.join(data.room_id);
        });

        //leaves an existing room
        socket.on('leave_room', function (data){
            console.log("leave_room, data="+data);
            socket.leave(data.room_id);
        });

        socket.on('users', function (data) {
            var clients = io.sockets.adapter.rooms[data.room_id]; 
            socket.emit("users", clients);
        });


        //PLAYLIST
        socket.on('add_song', function (data) {
            var params = JSON.parse(data);
            console.log("rooms="+socket.rooms);
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

         function add_song(song, room_id){
            client.get(room_id, function (err, socket_info){
                socket_info = JSON.parse(socket_info);
                socket_info.player_state.playlist.push(song);
                client.set(room_id, JSON.stringify(socket_info));
            });
         }
     });
}
