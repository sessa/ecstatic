angular.module('ecstatic.videoplayer')

.factory('videoplayerServices', function($rootScope, $sce, $stateParams, ConfigService, socket, socketManager, $timeout, videoVisibleEventServices){
    var Service = {};
    var channel_id = 0;
    var videos = [];
    Service.sources_one = [];
    Service.sources_two = [];
    Service.API_one;
    Service.API_two;
    var visible_video = 0;
    Service.currentItem = 0;
    Service.video_one_index = 0;
    Service.video_two_index = 1;

    Service.setChannel = function(channel) {
        Service.currentItem = channel.playlistIndex;
        Service.autoplay = true;
        Service.cliplist = channel.cliplist;
        Service.channel = channel
        Service.sources_one = [];
        Service.sources_two = [];
        Service.theme = "http://www.videogular.com/styles/themes/default/latest/videogular.css"
        Service.loadVideoSources();
    }

    Service.loadVideoSources = function(){
        for(var i=0; i < Service.channel.cliplist.length; i++){
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

    Service.onVideoplayerOneReady = function(API) {
        Service.API_one = API;
    }

    Service.onVideoplayerTwoReady = function(API) {
        Service.API_two = API;
        Service.initializeVideos();
    }

    Service.onCompleteVideo = function() {
        if(visible_video == 0){
            //Video One completed
            Service.switchVisiblePlayer();
            $timeout(Service.API_two.play.bind(Service.API_two), 100);
            Service.video_one_index = (Service.video_one_index + 2)%videos.length;
            Service.setItemOne(Service.video_one_index);
        }else if(visible_video == 1){
            //Video Two completed
            Service.switchVisiblePlayer();
            $timeout(Service.API_one.play.bind(Service.API_one), 100);
            Service.video_two_index = (Service.video_two_index + 2)%videos.length;
            Service.setItemTwo(Service.video_two_index);
        }
    }
 
    Service.initializeVideos = function() {
        Service.API_one.stop();
        Service.API_two.stop();
        Service.sources_one = videos[0][0].sources;
        Service.sources_two = videos[1%(videos.length)][0].sources; 
        $timeout(Service.API_one.play.bind(Service.API_one), 100);
    }

    Service.setItemOne = function(index) {
        Service.API_one.stop();
        Service.sources_one = videos[(index)%videos.length][0].sources;
        Service.API_one.mediaElement[0].load();
    }

    Service.setItemTwo = function(index) {
        Service.API_two.stop();
        Service.sources_two = videos[(index)%videos.length][0].sources;
        Service.API_two.mediaElement[0].load();
    }

    Service.switchVisiblePlayer = function() {
        visible_video = (visible_video + 1)%2;
        videoVisibleEventServices.broadcastVisibleVideo(visible_video);
    }


    
    return Service;
})

.service("videoVisibleEventServices", function ($rootScope){
    this.broadcastVisibleVideo = function(visible) {$rootScope.$broadcast("visible_video_changed", visible);}
    this.listenVisibleVideo = function(callback) {$rootScope.$on("visible_video_changed", callback)}
})

.service("videoEventServices", function ($rootScope){
    this.broadcast = function(data) {$rootScope.$broadcast("videoAdded", data)}
    this.listen = function(callback) {$rootScope.$on("videoAdded",callback)}
})