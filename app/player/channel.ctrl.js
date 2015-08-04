angular.module('channel', [])

.controller('ctrl',
	["$sce", "$scope", "$stateParams", "Chats", function($sce, $scope, $stateParams, Chats) {
		console.log("Chats="+Chats);
        Chats.getRooms().then(function(data) {
        	console.log("stateParams.chatId"+$stateParams.chatId);
        	var player_state = JSON.parse(data.result[$stateParams.chatId].socket_info).player_state;
            console.log("data.result="+JSON.stringify(player_state.sources));
			$scope.chat = {
				sources: player_state.sources,
				theme: "bower_components/videogular-themes-default/videogular.css",
				plugins: {
					poster: "http://www.videogular.com/assets/images/videogular.png"
				}
			}
        });
	}]
)
