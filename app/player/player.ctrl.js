angular.module('ecstatic.player')

.controller('PlayerCtrl',
	["$sce", "$scope","$stateParams", "channelModel", function($sce, $scope, $stateParams, channelModel) {
    	console.log("$stateParams.room_id="+JSON.stringify($stateParams.room_id));
    	console.log("channelModel.channels"+JSON.stringify(channelModel.channels));
    	var player_state = channelModel.get($stateParams.room_id);
        var sources = [];
        for (var index = 0; index < player_state.sources.length; index++){
        	var src = player_state.sources[index].src;
        	sources.push({src: $sce.trustAsResourceUrl(src), type: player_state.sources[index].type});
        }
		$scope.channel = {
			sources: sources,
			theme: "bower_components/videogular-themes-default/videogular.css",
			plugins: {
				poster: "http://www.videogular.com/assets/images/videogular.png"
			}
		}
	}]
)
