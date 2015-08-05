angular.module('ecstatic.player', [])

.controller('PlayerCtrl',
	["$sce", "$scope", "$stateParams", "socketManager", function($sce, $scope, $stateParams, socketManager) {
        console.log("here");
        socketManager.getRooms().then(function(data) {
        	var player_state = JSON.parse(data.result[$stateParams.chatId].socket_info).player_state;
            var sources = [];
            for (var index = 0; index < player_state.sources.length; index++){
            	sources.push({src: $sce.trustAsResourceUrl(player_state.sources[index].src), type: player_state.sources[index].type});
            }
			$scope.channel = {
				sources: sources,
				theme: "bower_components/videogular-themes-default/videogular.css",
				plugins: {
					poster: "http://www.videogular.com/assets/images/videogular.png"
				}
			}
        });
	}]
)
