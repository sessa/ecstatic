angular.module('ecstatic.player')

.controller('PlayerCtrl',
	["$sce", "$scope", '$rootScope', "$stateParams", "channelModel", "socketManager","$timeout", '$state', '$ionicHistory', function($sce, $scope, $rootScope, $stateParams, channelModel, socketManager, $timeout, $state,$ionicHistory) {
		//parse sources
        var player_state = channelModel.get($stateParams.channel_id);
        if(!player_state){
            socketManager.getChannels().then(function (data){
                console.log("channelbang data="+JSON.stringify(data));
                for(var index = 0; index < data.channelList.length; index++){
                    var player_state = channelList[index].player_state;
                    if(player_state.channel_id == $stateParams.channel_id){
                      console.log("player_state="+JSON.stringify(player_state));
                      createController(player_state);
                      break;
                    }
                }
            });
        }
        else{
            createController(player_state);
        }
	}]
)

function createController(player_state){
    var controller = this;
    controller.API = null;
    controller.currentItem = player_state.playlistIndex;
    controller.autoplay = true;
    controller.playlist = constructPlaylist(player_state, $sce);
    controller.sources = [];
    controller.theme = "http://www.videogular.com/styles/themes/default/latest/videogular.css";

    controller.onPlayerReady = function(API) {
        controller.sources.push(controller.playlist[controller.currentItem]);
        controller.API = API;
        var delta = (player_state.requestTime - player_state.timestamp)/1000;
        API.seekTime(delta, false);
    }
    controller.onCompleteItem = function() {
        controller.isCompleted = true;
        controller.currentItem++;
        if (controller.currentItem >= controller.playlist.length) controller.currentItem= 0;
        controller.setItem(controller.currentItem);
    }
    controller.setItem = function(index) {
        controller.API.stop();
        controller.currentItem = index;
        controller.sources = [];
        controller.sources.push(controller.playlist[index]);
        $timeout(controller.API.play.bind(controller.API), 100);
    }
    controller.nextSong = function() {
        localNextSong(controller);
        socketManager.nextSongAction(controller.currentItem, $stateParams.channel_id);
    }
    controller.addSongs = function() {
        localNextSong(controller);
        socketManager.nextSongAction(controller.currentItem, $stateParams.channel_id);
    }
    $scope.$on('nextSong', function(event, data) {
        localNextSong(controller);
    });
    $scope.$on('getChannel', function(event, data) {
        console.log("heard getChannel");
        localNextSong(controller);
    });
}


function localNextSong(controller){
    controller.isCompleted = true;
    controller.currentItem++;
    if (controller.currentItem >= controller.playlist.length) controller.currentItem= 0;
    controller.setItem(controller.currentItem);
}

function constructPlaylist(player_state, $sce){
	//parse sources
    var sources = [];
    for (var index = 0; index < player_state.sources.length; index++){
    	var src = player_state.sources[index].src;
    	sources.push({src: $sce.trustAsResourceUrl(src), type: player_state.sources[index].type});
    }
    return sources;
}