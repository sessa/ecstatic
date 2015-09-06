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
    var firstime = true;

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

    Service.onLoadMetaData = function(evt) {
        // Service.API.seekTime(Service.delta, false);
        // Service.API_one.mediaElement[0].removeEventListener("loadedmetadata", this.onLoadMetaData.bind(this), false);
        // Service.API.seekTime(Service.delta, false);
        Service.API_two.mediaElement[0].removeEventListener("loadedmetadata", this.onLoadMetaData.bind(this), false);
    }
    Service.onVideoplayerOneReady = function(API) {
        console.log("setting api");
        Service.API_one = API;
        // Service.API_one.mediaElement[0].addEventListener("loadedmetadata", this.onLoadMetaData.bind(this), false);
        // Service.delta = (Service.channel.requestTime - Service.channel.timestamp)/1000;
    }

    Service.onVideoplayerTwoReady = function(API) {
        console.log("onplayerready");
        Service.API_two = API;
        // Service.API_two.mediaElement[0].addEventListener("loadedmetadata", this.onLoadMetaData.bind(this), false);
        Service.setItem(Service.currentItem);
        // Service.delta = (Service.channel.requestTime - Service.channel.timestamp)/1000;
    }

    Service.onCompleteItemOne = function() {
        console.log("complete");
        if(visible_video!=0){
        //     // Service.API_one.play();
            return;
        }
        // //hide this player, show second player, set source of player one and play
        $timeout(Service.API_two.play.bind(Service.API_two), 100);
        // //switch 2 hidden
        Service.switchVisiblePlayer();
        
        Service.currentItem += 2;
        Service.setItemOne(Service.currentItem);
        Service.currentItem = Service.currentItem % videos.length;

        // Service.switchVisiblePlayer();
        // Service.currentItem = Service.currentItem + 2;
        // if (Service.currentItem >= Service.cliplist.length) Service.currentItem= 0;
        // Service.setItem(Service.currentItem);
    }

    Service.onCompleteItemTwo = function() {
        if(visible_video!=1){
            // Service.API_two.stop();
            // $timeout(Service.API_two.play.bind(Service.API_two), 100);
            // Service.API_two.play();
            return;
        }
        //hide two, show one, set source of two and play
        $timeout(Service.API_one.play.bind(Service.API_one), 100);
        Service.switchVisiblePlayer();


        // Service.currentItem += 2;
        Service.setItemTwo(Service.currentItem);
        // Service.currentItem = Service.currentItem % videos.length;
        // Service.currentItem += 1;
        
        // Service.currentItem = Service.currentItem + 2;
        // if (Service.currentItem >= Service.cliplist.length) Service.currentItem= 0;
        // Service.setItem(Service.currentItem);
    }
// 
    Service.setItem = function(index) {
        console.log("setItem");
        Service.API_one.stop();
        Service.API_two.stop();
        Service.sources_one = videos[index][0].sources;
        // console.log("source: " + JSON.stringify(Service.sources_one));
        Service.sources_two = videos[(index+1)%(videos.length)][0].sources; 
        $timeout(Service.API_one.play.bind(Service.API_one), 100);
        // $timeout(Service.API_two.play.bind(Service.API_two), 100);
        // Service.API_one.play();
    }

    Service.setItemOne = function(index) {
        console.log("hello?");
        Service.API_one.stop();
        // console.log("index: " + (index));
        Service.sources_one = videos[index%videos.length][0].sources;
        Service.API_one.mediaElement[0].load();
        if(firstime){
            console.log("its the first time");
            firsttime = false;
            $timeout(Service.API_one.play.bind(Service.API_one), 100);
        }
        // $timeout(Service.API_one.play.bind(Service.API_one), 100);

    }

    Service.setItemTwo = function(index) {
        Service.API_two.stop();
        // console.log("undeffed: " + (index)%videos.length);
        Service.sources_two = videos[(index+1)%videos.length][0].sources;
        Service.API_two.mediaElement[0].load();
        // $timeout(Service.API_two.play.bind(Service.API_two), 100);
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