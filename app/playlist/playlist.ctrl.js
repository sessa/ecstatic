angular.module('ecstatic.player')

.controller('PlayerCtrl',
	["$sce", "$scope","$stateParams", "channelModel", function($sce, $scope, $stateParams, channelModel) {
		//parse sources
		var player_state = channelModel.get($stateParams.room_id);
		console.log("player_state="+JSON.stringify(player_state));
        var sources = [];
        for (var index = 0; index < player_state.sources.length; index++){
        	var src = player_state.sources[index].src;
        	sources.push({src: $sce.trustAsResourceUrl(src), type: player_state.sources[index].type});
        }

		var controller = this;
		controller.API = null;
		controller.onPlayerReady = function(API) {
			controller.API = API;
			var delta = (player_state.requestTime - player_state.timestamp)/1000;
			console.log("delta="+delta);
			API.seekTime(delta, false);
		}
		controller.autoplay = true;
		controller.sources = sources;
		controller.theme = "http://www.videogular.com/styles/themes/default/latest/videogular.css";
	}]
)

//determine the offset in number of songs
//determine the offset within a particular song
function sync(player_state){
	console.log("player_state="+JSON.stringify(player_state));

}