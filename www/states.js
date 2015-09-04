/*	States.js */

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $stateProvider

	// ecstatic & it's navigation menu

    .state('app', {
	    url: '/app',
	    abstract: true,
	    templateUrl: 'index/menu.html',
  	})

    		// a static bulletin board with the latest updates of the production-ready branch

		    .state('home', {
		    	parent: 'app',
			    url: '/home',
			    templateUrl: 'home/home.html'
		  	})

		  	// a list of all channels on the server

		    .state('channels', {
		    	parent: 'app',
			    url: '/channels',
			    templateUrl: 'channels/channel-list.html'
		  	})

		    		// a form that sets the name of the channel

				    .state('setName', {
		    			parent: 'channels',
					    url: '/setName',
					    templateUrl: 'create/setName/setName.html'
				  	})

		    				// a form that sets the time left before the music starts

						    .state('setTimer', {
		    					parent: 'channels',
							    url: '/setTimer',
							    templateUrl: 'create/setTimer/setTimer.html'
						  	})

			// a feedback form that sends an e-mail to jonathan at silentdiscosquad dot com

		    .state('feedback', {
		    	parent: 'app',
			    url: '/feedback',
			    templateUrl: 'feedback/feedback.html'
		  	})

		  			// a thank you note

				    .state('feedback.thankyou', {
					    url: '/thankyou',
					    templateUrl: 'feedback/thankyou.html'
				  	})
 
	// a channel 

    .state('channel', {
	    url: '/channel',
	    abstract: true,
	    templateUrl: 'channels/channel-tabs.html'
  	})

    		// the first tab : a music player

		    .state('player', {
		    	parent: 'channel',
			    url: '/player',
			    templateUrl: 'player/player.html'
		  	})

		  			// a list of the user's likes on Soundcloud

				    .state('player.mediapicker', {
					    url: '/mediapicker',
					    templateUrl: 'mediapicker/mediapicker.html'
				  	})

		  			// a modifiable playlist for the music player

				    //.state('', {
				  	//})

    		// the second tab : a video player

		    .state('videoplayer', {
		    	parent: 'channel',
			    url: '/videoplayer',
			    templateUrl: 'videoplayer/videoplayer.html'
		  	})
		  			// the output of the user's main camera and a record button

				    .state('tv.camera', {
					    url: '/camera',
					    templateUrl: 'camera/camera.html'
				  	})

		  			// a modifiable playlist for the video player

				    .state('tv.videolist', {
					    url: '/videolist',
					    templateUrl: 'videolist/videolist.html'
				  	})

    		// the third tab : a chatroom

		    .state('chat', {
		    	parent: 'channel',
			    url: '/chat',
			    templateUrl: 'chat/chat.html'
		  	})

		  			// a list of all users in this channel

				    //.state('', {
				  	//})

})