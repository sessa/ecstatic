angular.module('controllers', [])

.controller('VideoCtrl',
	["$sce", function ($sce) {
		this.config = {
			sources: [
				{src: $sce.trustAsResourceUrl("http://api.soundcloud.com/tracks/147550599/stream?client_id=b49f9732e4efc7dc0e497012d17b2695"), type: "audio/mpeg"},
				{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
				{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
			],
			theme: "bower_components/videogular-themes-default/videogular.css",
			plugins: {
				poster: "http://www.videogular.com/assets/images/videogular.png"
			}
		};
	}]
)

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // refresh the channels list
  $scope.doRefresh = function(){
        Chats.getRooms().then(function(data) {

            var channels = [];
            var id = 0;
            data.result.forEach(function(entry) {
            	var channel = JSON.parse(entry.socket_info).player_state;
                if(channel){
                	channel.id = id;
                	id++;
                    channels.push(channel);
                }
            });
            $scope.chats = channels;
            //tell the ionScroll that the job is done
            $scope.$broadcast('scroll.refreshComplete');
        }
    )};
})

.controller('ChatsCreateCtrl', function($scope, Chats) {
    $scope.create_room = function() {
        Chats.create_room().then(function(data) {
            console.log("room created");
        });
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  console.log("ChatDetailCtrl");
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
	enableFriends: true
  };
})

//the Main Controller, gets info from server, updates scope for index.jade
.controller('mainController',['$scope', '$http', function($scope, $http) {

		//query index.js
		$http.get('/api/upcomingEvents')
		.success(function(data) {

			//parse the data
			$scope.upcomingEvents = data;
			$scope.server_playlist = data.playlist;
		   
			//call this function every second
			countdown(data.start_time, function(ts){
				console.log("ts.value="+ts.value);
				
				//every second
				if(!$scope.$$phase) {
				  console.log("$scope.trackIndex = trackIndex;"+trackIndex);
				  $scope.trackIndex = trackIndex;
				  $scope.$apply() 
				}

				//if there are less than 2 seconds left before the event, hide the join button
				if(ts.value < -2000){
				  $scope.showButton = "hidden";
				}

				//if the event has not started, hide a label and button 
				else{
				  $scope.currentlyPlaying = "hidden";
				  $scope.showButton = "asdfasdfsdf";
				}

				//update the countdown every second
				//document.getElementById('seconds').innerHTML = ts.seconds.toString();
				//document.getElementById('minutes').innerHTML = ts.minutes.toString();
				//document.getElementById('hours').innerHTML = ts.hours.toString();
			  }, 
		  countdown.HOURS | countdown.MINUTES | countdown.SECONDS, 3);
	  })
	  .error(function(data) {
		  console.log('Error: ' + data);
	  });

	  //query index.js
	  $http.get('/api/sync')
	  .success(function(data) {
		  timeOfReturn = new Date().getTime();
		  var json = JSON.parse(data);
		  console.log("http.get('/app/api/sync'), timeOfReturn = "+ timeOfReturn);
		  console.log("http.get('/app/api/sync'), json = "+ data);
		  if(json.elapsedTime > 0){
			elapsed = json.elapsedTime;

			//FOR GETTING THE ACTUAL TRACK INDEX
			trackIndex = json.trackIndex;

			// updates the playlist's selected track
			console.log("trackIndex="+trackIndex);
			$scope.trackIndex = trackIndex;

			//FOR TESTING
			//trackIndex = 1;
		  }
		  else{
			console.log("event hasn't started");
		  }
	  })
	  .error(function(data) {
		  console.log('Error: ' + data);
	  });

	$scope.update_selected_track = function(index){
		$scope.trackIndex = index;
		if(!$scope.$$phase) {
		  $scope.$apply() 
		}
	}
}]);
