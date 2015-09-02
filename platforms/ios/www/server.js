/*jslint node: true */
'use strict';

// Declare variables used

var app, express, events, cors, bodyParser, client, io, async, socket, config, http, server, nodemailer, smtpTransport, aws, s3;

config = require('./config/config.json');
client = require('redis').createClient(6379, process.env.cache, {no_ready_check: true});
express = require('express');
cors = require('cors');
bodyParser = require('body-parser')
app = express();
app.set('views', __dirname + '/');
app.set('view engine', "jade"); 
app.set('port', 3001); 
app.use(express.static('./'));
app.use(cors());
async = require('async');
server = require('http').Server(app);
io = require('socket.io')(server);
nodemailer = require('nodemailer');
smtpTransport = require('nodemailer-smtp-transport');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

aws = require('aws-sdk');
s3 = new aws.S3();

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
            var socket_info_dict = JSON.parse(socket_info);
            socket_info_dict.player_state = {
                'is_playing': 1,
                'is_locked': 0, 
                'playlistIndex': 0, 
                'timestamp': new Date().getTime(), 
                'requestTime':new Date().getTime(), 
                'channel_name': data.channel_name, 
                'channel_id': socket.id, 
                'cliplist': [],
                'start_time': data.start_time,
                'chat': [],
                'playlist': []};
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
            var socket_info_dict = JSON.parse(socket_info);
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
        if(socket.rooms.indexOf(data.channel_id) < 0){
            socket.join(data.channel_id);
            socket.broadcast.to(data.channel_id).emit("update");
        }   
    });
    socket.on('send_video', function (data){
        console.log("heard send_vide");
        //if there is a video, send video to S3
        client.get(data.channel_id, function (err, socket_info){
            var params = {Bucket: 'ecstatic-videos', Key: data.video_key, Body: data.video};
            s3.putObject(params, function(err, s3data) {
                if (err)       
                {
                    console.log("Server - send_video_to_s3 - Error Uploading Video to S3 \n" + err);     
                } else {
                    console.log("Successfully uploaded data to myBucket/myKey"); 
                    var parsed_data = {
                        hasVideo: data.hasVideo,
                        video_key: data.video_key,
                        username: data.username,
                    }
                    socket_info = JSON.parse(socket_info);
                    socket_info.player_state.cliplist.push(parsed_data);
                    client.set(data.channel_id, JSON.stringify(socket_info));
                    socket.broadcast.to(data.channel_id).emit("send_video", parsed_data);
                    socket.emit("send_video", parsed_data);
                }
            });
        });
    });

    socket.on('send_text', function (data) {
        client.get(data.channel_id, function (err, socket_info){
            var parsed_data = {
                txt: data.txt,
                username: data.username,
            }
            socket_info = JSON.parse(socket_info);
            socket_info.player_state.chat.push(parsed_data);
            client.set(data.channel_id, JSON.stringify(socket_info));
            socket.broadcast.to(data.channel_id).emit("send_text", parsed_data);
        });
    });

    socket.on('chat_backlog', function (data) {
        client.get(data.channel_id, function(err, socket_info) {
            socket_info = JSON.parse(socket_info);
            socket.emit("chat_backlog", socket_info.player_state.chat);
        })
    });

    socket.on('update_channel', function (data) {
        client.get(socket.id, function (err, socket_info){
            var socket_info_dict = JSON.parse(socket_info);
            socket_info_dict.player_state = data.channel_info;
            client.set(data.channel_info.channel_id, JSON.stringify(socket_info_dict));
            socket_info_dict.callback_id = data.callback_id;
            socket.broadcast.to(data.channel_info.channel_id).emit("update");
        });
    });

 });

//routes
app.get('/soundcloud/callback', function(req, res) {
    console.log("caught");
    res.render('soundcloud/callback');
});

app.get('/soundcloudClientId', function(req, res) {
    res.json({"soundcloudClientId": process.env.soundcloudClientId});
});

app.route('/*')
.get(function(req, res) {
  res.render('index')
});

server.listen(app.get('port'), function(req, res) {
 console.log('Server listening at ' + app.get('port'));
});

//nodemailer
app.post('/feedback', urlencodedParser, function(req, res){
    var transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.mailgun.org',
        port: 25,
        auth: {
            user: 'postmaster@sandboxe5272feb9c3c4b3c88e6e69d8379de8f.mailgun.org',
            pass: '062303775835e3826aa39a0d60902ac0'
            }
        }));

    var mailOptions = {
        from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
        to: 'jonathan@silentdiscosquad.com', // list of receivers
        subject: 'Ecstatic App Feedback', // Subject line
        text: req.body.message // plaintext body
        };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
            res.redirect('#/tab/feedback/thankyou');
        }
        });
  });
