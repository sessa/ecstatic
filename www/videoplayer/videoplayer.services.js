angular.module('ecstatic.videoplayer')

.factory('videoplayerServices', function($rootScope, $sce, $stateParams, ConfigService, socket, socketManager, $timeout){
	var Service = {};
	var channel_id = 0;

    Service.setChannel = function(channel) {
        Service.currentItem = channel.playlistIndex;
        Service.autoplay = true;
        Service.cliplist = channel.cliplist;
        Service.channel = channel
        Service.sources = [];
        Service.theme = "http://www.videogular.com/styles/themes/default/latest/videogular.css";
    }
    Service.onLoadMetaData = function(evt) {
        Service.API.seekTime(Service.delta, false);
        Service.API.mediaElement[0].removeEventListener("loadedmetadata", this.onLoadMetaData.bind(this), false);
    }
    Service.onVideoplayerReady = function(API) {
        Service.API = API;
        Service.API.mediaElement[0].addEventListener("loadedmetadata", this.onLoadMetaData.bind(this), false);
        Service.setItem(Service.currentItem);
        Service.delta = (Service.channel.requestTime - Service.channel.timestamp)/1000;
    }
    Service.onCompleteItem = function() {
        Service.isCompleted = true;
        Service.currentItem++;
        Service.delta = 0;
        if (Service.currentItem >= Service.cliplist.length) Service.currentItem= 0;
        Service.setItem(Service.currentItem);
    }

    Service.setItem = function(index) {
        Service.API.stop();
        Service.currentItem = index;
        Service.sources = [];
        var source = Service.cliplist[Service.currentItem];
        var type = "video/" + source.format;
        Service.sources.push({src: $sce.trustAsResourceUrl("https://s3.amazonaws.com/ecstatic-videos/"+source.video_key), type: type});
        $timeout(Service.API.play.bind(Service.API), 10);
        $timeout(Service.API.play.bind(Service.API), 25);
        $timeout(Service.API.play.bind(Service.API), 50);
        $timeout(Service.API.play.bind(Service.API), 100);
    }
    return Service;
})