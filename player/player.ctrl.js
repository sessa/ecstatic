angular.module('ecstatic.player')

.controller('PlayerCtrl',
	["$sce", "$scope", '$rootScope', "$stateParams", "playerModel", "playerService", "playlistModel", "$state", "$timeout", 'channelServices', function($sce, $scope, $rootScope, $stateParams, playerModel, playerService, playlistModel, $state, $timeout, channelServices) {
        var playlist = playlistModel.playlist;
        var controller = this;
        controller.addSongs = function() {
            $state.go('tab.channels-add');
        }

//        channelServices.joinChannel($stateParams.channel_id);
        if(playlist.length == 0){
            controller.showPlayer = false;
            /*channelServices.getChannels().then(function (data){
                console.log("channelbang data="+JSON.stringify(data.channelList));
                for(var index = 0; index < data.channelList.length; index++){
                    var player_state = data.channelList[index].player_state;
                    if(player_state.channel_id == $stateParams.channel_id){
                        console.log("2 player_state="+JSON.stringify(player_state));
                        createController(this, player_state, $sce, $scope, $rootScope, $stateParams, channelModel, playerService, $timeout);
                        break;
                    }
                }
            });*/
        }
        else{
            var player_state = playerModel.player_state;
            controller.showPlayer = true;
            controller.API = null;
            controller.currentItem = player_state.playlistIndex;
            controller.autoplay = true;
            controller.playlist = playlist;
            controller.sources = [];
            controller.theme = "http://www.videogular.com/styles/themes/default/latest/videogular.css";

            controller.onPlayerReady = function(API) {
                var track = controller.playlist[controller.currentItem];
                console.log("track="+track);
                controller.sources.push(track);
                console.log("controller.sources="+JSON.stringify(controller.sources));
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
                playerService.nextSongAction(controller.currentItem, $stateParams.channel_id);
            }
            /*controller.addSongs = function() {
                localNextSong(controller);
                playerService.nextSongAction(controller.currentItem, $stateParams.channel_id);
            }*/
            $scope.$on('nextSong', function(event, data) {
                localNextSong(controller);
            });
        }
	}]
)


function localNextSong(controller){
    controller.isCompleted = true;
    controller.currentItem++;
    if (controller.currentItem >= controller.playlist.length) controller.currentItem= 0;
    controller.setItem(controller.currentItem);
}

