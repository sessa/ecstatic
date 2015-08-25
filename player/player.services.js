angular.module('ecstatic.player')

.factory('playerServices', function($rootScope, $sce, $stateParams, ConfigService, socket, socketManager){
	var Service = {};
	var channel_id = 0;
	socket.on('next_song_action', function (data) {
		console.log("heard next_song_action");
		$rootScope.$broadcast('nextSong');
	});

	Service.nextSongAction = function(playlistIndex, channel_id) {
		var request = {
			msg: "next_song_action",
			channel_id: channel_id,
			playlistIndex: playlistIndex
		}
		var promise = socketManager.sendRequest(request); 
		return promise;
	}

	return Service;
})


.factory('showPlayerServices', function($sce, $scope, userNumberEventService, updatePlayerstateEventService, $stateParams, playerServices, $state, $timeout, channelServices, ConfigService){

   var Service = {};
            Service.loadChannel = function(channel) {
                $scope.API.seekTime($scope.delta, false);
                $scope.API.mediaElement[0].removeEventListener("loadedmetadata", this.onLoadMetaData.bind(this), false);
            }

            Service.API = null;
            Service.currentItem = channel.playlistIndex;
            Service.autoplay = true;
            Service.playlist = channel.playlist;
            Service.sources = [];
            Service.theme = "http://www.videogular.com/styles/themes/default/latest/videogular.css";
            Service.showPlayer = true;

            Service.onLoadMetaData = function(evt) {
                $scope.API.seekTime($scope.delta, false);
                $scope.API.mediaElement[0].removeEventListener("loadedmetadata", this.onLoadMetaData.bind(this), false);
            }
            Service.onPlayerReady = function(API) {
                $scope.API = API;
                $scope.API.mediaElement[0].addEventListener("loadedmetadata", this.onLoadMetaData.bind(this), false);
                $scope.setItem($scope.currentItem);
                $scope.delta = (channel.requestTime - channel.timestamp)/1000;
            }
            Service.onCompleteItem = function() {
                $scope.isCompleted = true;
                $scope.currentItem++;
                if ($scope.currentItem >= $scope.playlist.length) $scope.currentItem= 0;
                $scope.setItem($scope.currentItem);
            }
            Service.setItem = function(index) {
                $scope.API.stop();
                $scope.currentItem = index;
                $scope.sources = [];
                var source = $scope.playlist[$scope.currentItem];
                console.log("setItem, $source="+JSON.stringify(source));
                $scope.sources.push({src: $sce.trustAsResourceUrl(source.stream_url+"?client_id="+ConfigService.getConfig().soundcloudClientId), type: "audio/"+source.original_format});
                $scope.trackTitle = $scope.playlist[$scope.currentItem].title;
                $scope.trackUser = $scope.playlist[$scope.currentItem].user.username;
                $timeout($scope.API.play.bind($scope.API), 100);
            }
            Service.nextSong = function() {
                console.log("nextSong Action");
                $scope.onCompleteItem();
                $scope.setItem($scope.currentItem);
                playerServices.nextSongAction($scope.currentItem, playerServices.channel_id);
            }
            Service.$on('nextSong', function(event, data) {
                $scope.onCompleteItem();
                $scope.setItem($scope.currentItem);
            });

            return Service;
        })