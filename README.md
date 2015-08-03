README.md

---------------------
todos

	refactoring

	**ionic is both in lib and node_modules ???
	**find & replace chat(s) to channel(s)
	**rename the 'ecstatic' module or it's file name
	**rename index.js to server.js and add a npm start script 


---------------------
the server
	
	index.js


---------------------
States

	1. Channel list
	2. Create a channel
	3. Channel details/Player
	4. Soundcloud Media Picker


---------------------
angular modules


	1. 'services' (js/services.js)
		
		depends on 'btford.socket-io'

		'socket' factory
				connects sockets at 8080

		'Soundcloud' factory
				.getUser service
					gives a client ID to soundcloud
					gets /tracks

		'Chats' factory
				.create_room service
					promises to create a room with room_name and a list of sources (URLs)
				.getRooms service


	2. 'controllers' (js/controllers.js)

			VideoCtrl

			ChatsSCPick

			ChatsCtrl

			ChatsCreateCtrl

			ChatDetailCtrl


	3. 'ecstatic'  (js/app.js)

		!dependencies

				angular and ionic
			      'ngSanitize',
			      'ngAnimate',
			      'ionic',

			    videogular
			      'com.2fdevs.videogular',
			      'com.2fdevs.videogular.plugins.controls',
			      'com.2fdevs.videogular.plugins.overlayplay',
			      'com.2fdevs.videogular.plugins.poster'

			    modules
			      'controllers', 
			      'services',


---------------------
libraries


	1. bower.json (bower_components)

			ionic
			angular-socket-io



	2. package.json (node_modules)

			aws-sdk
			express
			grunt
			redis
			socket.io
			soundclouder


---------------------
tests

	
	Gruntfile.js (test)


---------------------
misc


	general ionic app settings
		config.xml

	/resources
		splash screens
		icons


