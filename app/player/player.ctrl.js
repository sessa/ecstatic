angular.module('ecstatic.player')

.controller('PlayerCtrl',
	["$sce", "$scope","$stateParams", "channelModel", function($sce, $scope, $stateParams, channelModel) {
		
		//parse sources
		var player_state = channelModel.get($stateParams.room_id);
		console.log("player_state="+JSON.stringify(player_state));

		var controller = this;
		controller.API = null;
		controller.currentItem = 0;
		controller.autoplay = true;
		controller.playlist = constructPlaylist(player_state, $sce);
		console.log("controller.playlist="+JSON.stringify(controller.playlist));
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

            if (controller.currentItem >= controller.sources.length) controller.currentVideo = 0;

            controller.setItem(controller.currentItem);
        };
        controller.setItem = function(index) {
            controller.API.stop();
            controller.currentItem = index;
            controller.sources = [];
            controller.sources.push(controller.playlist[index]);
            $timeout(controller.API.play.bind(controller.API), 100);
        };
	}]
)

function constructPlaylist(player_state, $sce){
	//parse sources
    var sources = [];
    for (var index = 0; index < player_state.sources.length; index++){
    	var src = player_state.sources[index].src;
    	sources.push({src: $sce.trustAsResourceUrl(src), type: player_state.sources[index].type});
    }
    return sources;
}

//determine the offset in number of songs
//determine the offset within a particular song
function sync(player_state){
	console.log("player_state="+JSON.stringify(player_state));

}