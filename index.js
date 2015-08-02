/*jslint node: true */
'use strict';

// Declare variables used
var ecstaticSockets, squad_app, express, path, request, events, sc, cors, sc_client_id, sc_client_secret, sc_redirect_uri, sc_api_url;
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


//CLIENT
//Templating
squad_app = express();
squad_app.set('views', __dirname + '/');
squad_app.set('view engine', "jade"); 
squad_app.set('port', 3001); 
squad_app.use(express.static('./'));
squad_app.use(cors());

//set up sockets
ecstaticSockets = require("./js/ecstaticSockets.js");
ecstaticSockets.setupEcstaticSockets(squad_app);

//routes
//############Need to refactor this to live in a nosql database. Or Postgresql.
squad_app.get('*', function(req, res) {
  	res.render('index');
});
squad_app.listen(squad_app.get('port'), function(req, res) {
 console.log('Server listening at ' + squad_app.get('port'));
});


