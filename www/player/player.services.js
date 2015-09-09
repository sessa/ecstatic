angular.module('ecstatic.player')

.factory('playerServices', function($rootScope, $sce, $stateParams, ConfigService, socket, socketManager, $timeout, channelServices){
	var Service = {};
	var channel_id = 0;
    Service.soundcloudClientId = 0;
    ConfigService.getConfig().then(function (data){
         Service.soundcloudClientId = data.soundcloudClientId;
    });

	socket.on('next_song_action', function (data) {
		console.log("heard next_song_action");
		$rootScope.$broadcast('nextSong');
	});

    Service.getSocketId = function() {
        var request = {
            msg: "get_socket_id",
        }
        socket.on('get_socket_id', function (data) {
            socketManager.listener(data);
        });

        var promise = socketManager.sendRequest(request); 
        return promise;
    }

	Service.nextSongAction = function(playlistIndex, channel_id) {
		var request = {
			msg: "next_song_action",
			channel_id: channel_id,
			playlistIndex: playlistIndex
		}
		var promise = socketManager.sendRequest(request); 
		return promise;
	}

    Service.setChannel = function(channel) {
        Service.currentItem = channel.playlistIndex;
        Service.autoplay = true;
        Service.playlist = channel.playlist;
        Service.channel = channel
        Service.sources = [];
        Service.theme = "http://www.videogular.com/styles/themes/default/latest/videogular.css";
    }

    Service.onLoadMetaData = function(evt) {
        console.log("onLoadMetaData, evt="+JSON.stringify(evt));
        Service.API.seekTime(Service.delta, false);
        Service.API.mediaElement[0].removeEventListener("loadedmetadata", this.onLoadMetaData.bind(this), false);
    }

    Service.onPlayerReady = function(API) {
        console.log("onPlayerReady");
        Service.API = API;
        var channel = channelServices.getChannel($stateParams.channel_id);
        if(channel.hasCountdown){
            channelServices.setCountdownFinished($stateParams.channel_id);
        }
        else{
            Service.API.mediaElement[0].addEventListener("loadedmetadata", this.onLoadMetaData.bind(this), false);
            Service.delta = (Service.channel.requestTime - Service.channel.timestamp)/1000;
        }

        Service.setItem(Service.currentItem);
    }
    Service.onCompleteItem = function() {
        Service.isCompleted = true;
        Service.currentItem++;
        Service.delta = 0;
        if (Service.currentItem >= Service.playlist.length) Service.currentItem= 0;
        Service.setItem(Service.currentItem);
    }
    Service.setItem = function(index) {
        Service.API.stop();
        Service.currentItem = index;
        Service.sources = [];
        var source = Service.playlist[Service.currentItem];
        Service.sources.push({src: $sce.trustAsResourceUrl(source.stream_url+"?client_id="+Service.soundcloudClientId), type: "audio/"+source.original_format});
        Service.trackTitle = Service.playlist[Service.currentItem].title;
        Service.trackUser = Service.playlist[Service.currentItem].user.username;
        Service.trackCover = Service.playlist[Service.currentItem].artwork_url;
        Service.API.play();
    }
    return Service;
})
.service("countdownEventService", function ($rootScope){
    this.broadcast = function() {$rootScope.$broadcast("countdownFinished");}
    this.listen = function(callback) {$rootScope.$on("countdownFinished",callback)}
})
