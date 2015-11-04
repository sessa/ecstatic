README.md


		         (
		         )\
		         {_}
		        .-;-.
		       |'-=-'|
		       |     |
		       |     |
		       |     |
		       |     |
		       '.___.'

	  Thank you for being here.

---------------------

#installation
This code runs with Node 0.12.6 on 64bit Amazon Linux (Elastic Beanstalk) with Redis 2.8.

	//download the code
	git clone git@github.com:mweiss17/ecstatic.git
	
	//set environment variables
	AWS_ACCESS_KEY_ID = Your AWS Access Key
	AWS_SECRET_ACCESS_KEY = Your AWS Secret Access Key

	//install dependencies
	npm install

	//and run it
	npm start

#architecture
##todos
	refactoring

	**ionic is both in lib and node_modules ???
	**same for socket.io ???
	**find & replace chat(s) to channel(s)
	**find & replace dash to home
	**rename the 'ecstatic' module or it's file name
	**rename index.js to server.js and add a npm start script 
	**hookup cordova
	**removed unused libraries
	**retire mainController?



---------------------
##the server
	

	index.js


---------------------
##states

	0. 'tab' Abstract state for the tabs directive

		1. 'tab.dash' The home tab


		2 'tab.chats' Channel list


		3. 'tab.chats-create' Create a channel


		4. 'tab.chats-scpick' Soundcloud Media Picker


		5. 'tab.chat-detail' Channel Player


		6. 'tab.account' The Star tab



---------------------
##angular modules


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
					provides a list of all rooms


	2. 'controllers' (js/controllers.js)

			1. VideoCtrl
						plays media from the .getRooms service's list of sources


			2. ChatsSCPick
						.getUser
							asks 'Soundcloud' factory for some data 

			3. ChatsCtrl
						.doRefresh
							refreshes the list when pulled down

			4. ChatsCreateCtrl
						.create_room
							asks for a create_room promise to 'Chats' factory

			5. ChatDetailCtrl



	3. 'ecstatic'  (js/app.js)

		dependencies

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

		inits ionic

		state config



---------------------
##libraries


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
##tests


	Gruntfile.js (test)


---------------------
##misc


	general ionic app settings
		config.xml

	/resources
		splash screens
		icons


