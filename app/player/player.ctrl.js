angular.module('ecstatic.player')

.controller('PlayerCtrl',
	["$sce", "$scope","$stateParams", "channelModel", function($sce, $scope, $stateParams, channelModel) {
		//parse sources
		var player_state = channelModel.get($stateParams.room_id);
        var sources = [];
        for (var index = 0; index < player_state.sources.length; index++){
        	var src = player_state.sources[index].src;
        	sources.push({src: $sce.trustAsResourceUrl(src), type: player_state.sources[index].type});
        }

		var controller = this;
		controller.API = null;
		controller.onPlayerReady = function(API) {
			console.log("hererher");
			controller.API = API;
		};
		controller.autoplay = true;
		controller.sources = sources;
		controller.theme = "http://www.videogular.com/styles/themes/default/latest/videogular.css";
	}]
)
