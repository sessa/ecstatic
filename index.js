/*jslint node: true */
'use strict';

// Declare variables used
var ecstaticSockets, squad_app, express, path, request, events, sc, cors, sc_client_id, sc_client_secret, sc_redirect_uri, sc_api_url, nodemailer;
sc = require("soundclouder");
sc_client_id="4cd54fa30dd13312d10dd24cc2bdcae4";
sc_client_secret="2f845ee306729bf01254031ea1eb9803";
sc_redirect_uri="http://ecstatic.fm/scRedirect";
//USED FOR SYNCING
//Change this to be a function, that returns sc_api_url
//curl -v 'http://api.soundcloud.com/resolve.json?url=https://soundcloud.com/silentdiscosquad/sets/radio-startupfest-friday-july&client_id=4cd54fa30dd13312d10dd24cc2bdcae4'  
sc_api_url = "https://api.soundcloud.com/playlists/125324586.json?client_id=4cd54fa30dd13312d10dd24cc2bdcae4";
express = require('express');
path = require('path');
request = require('request');
cors = require('cors');
nodemailer = require('nodemailer');

//CLIENT
//Templating
squad_app = express();
console.log("dirname="+__dirname);
squad_app.set('views', __dirname + '/');
squad_app.set('view engine', "jade"); 
squad_app.set('port', 8081); 
squad_app.use(express.static('./'));
squad_app.use(cors());

//set up sockets
ecstaticSockets = require("./lib/ecstaticSockets.js");
ecstaticSockets.setupEcstaticSockets(squad_app);
squad_app.route('/*')
.get(function(req, res) {
  res.render('index', {env: "production"})
});


//routes
squad_app.get('/soundcloud/callback', function(req, res) {
  	res.render('soundcloud/callback');
});
squad_app.post('/feedback', function(req, res) {
console.log("Result: "+ req.body.dname);
   /* var name = req.body.name;
    var from = req.body.from;
    var message = req.body.message;
    var to = '*******@gmail.com';
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "martin.clyde.weiss@gmail.com",
            pass: "make"
        }
    });
    var mailOptions = {
        from: from,
        to: to, 
        subject: name+' | new message !',
        text: message
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            res.redirect('/');
        }
    });*/
});
squad_app.listen(squad_app.get('port'), function(req, res) {
 console.log('Server listening at ' + squad_app.get('port'));
});

