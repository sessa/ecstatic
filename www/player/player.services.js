angular.module('ecstatic.player')

.factory('playerServices', function($rootScope, $sce, $stateParams, ConfigService, socket, socketManager, $timeout){
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
        Service.API.mediaElement[0].addEventListener("loadedmetadata", this.onLoadMetaData.bind(this), false);
        Service.setItem(Service.currentItem);
        Service.delta = (Service.channel.requestTime - Service.channel.timestamp)/1000;
        console.log("delta="+Service.delta);
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
        console.log("setItem, $source="+JSON.stringify(source));
        Service.sources.push({src: $sce.trustAsResourceUrl(source.stream_url+"?client_id="+ConfigService.getConfig().soundcloudClientId), type: "audio/"+source.original_format});
        Service.trackTitle = Service.playlist[Service.currentItem].title;
        Service.trackUser = Service.playlist[Service.currentItem].user.username;
        Service.trackCover = Service.playlist[Service.currentItem].artwork_url;
        $timeout(Service.API.play.bind(Service.API), 100);
    }
    return Service;
})