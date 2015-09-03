angular.module('ecstatic.videoplayer')

.factory('videoplayerServices', function($rootScope, $sce, $stateParams, ConfigService, socket, socketManager, $timeout){
	var Service = {};
	var channel_id = 0;
    var videos = [];
    Service.sources = [];

    Service.setChannel = function(channel) {
        Service.currentItem = channel.playlistIndex;
        Service.autoplay = true;
        Service.cliplist = channel.cliplist;
        Service.channel = channel
        Service.sources = [];
        Service.theme = "http://www.videogular.com/styles/themes/default/latest/videogular.css"
        Service.loadVideoSources();
    }

    Service.loadVideoSources = function(){
        for(var i=0; i < Service.channel.cliplist.length; i++){
            console.log("item");
            var format = "video/" + Service.channel.cliplist[i].format;
            videos[i] = [
                {
                    sources: [
                        {src:  $sce.trustAsResourceUrl("https://s3.amazonaws.com/ecstatic-videos/"+Service.channel.cliplist[i].video_key), type: format}
                    ]
                }
            ];
        }
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
        Service.currentItem++;
        Service.delta = 0;
        if (Service.currentItem >= Service.cliplist.length) Service.currentItem= 0;
        Service.setItem(Service.currentItem);
    }

    Service.setItem = function(index) {
        Service.API.stop();
        Service.sources = videos[index][0].sources;    
        $timeout(Service.API.play.bind(Service.API), 100);
    }
    
    return Service;
})