angular.module('ecstatic.player')

.controller('PlayerCtrl',
	["$sce", "$scope", '$rootScope', "$stateParams", "channelModel", "socketManager","$timeout", function($sce, $scope, $rootScope, $stateParams, channelModel, socketManager, $timeout) {
		
		//parse sources
		var player_state = channelModel.get($stateParams.room_id);
		console.log("player_state="+JSON.stringify(player_state));

		var controller = this;
		controller.API = null;
		controller.currentItem = 0;
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
        	local_next_song(controller);
            socketManager.next_song_action(controller.currentItem, $stateParams.room_id);
        }
        $scope.$on('nextSong', function(event, data) {
        	console.log("heard nextSong in ctrl");
        	local_next_song(controller);
        });
	}]
)

function local_next_song(controller){
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