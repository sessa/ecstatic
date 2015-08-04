angular.module('controllers', [])

.controller('VideoCtrl',
	["$sce", "$scope", "$stateParams", "Chats", function($sce, $scope, $stateParams, Chats) {
		console.log("Chats="+Chats);
        Chats.getRooms().then(function(data) {
        	console.log("stateParams.chatId"+$stateParams.chatId);
        	var player_state = JSON.parse(data.result[$stateParams.chatId].socket_info).player_state;
            console.log("data.result="+player_state.sources);
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

.controller('DashCtrl', function($scope) {})

.controller('ChatsSCPick', ["Soundcloud", '$scope', 'playlistModel', function(Soundcloud, $scope, playlistModel) {
}])

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // refresh the channels list
  $scope.doRefresh = function(){
        Chats.getRooms().then(function(data) {

            var channels = [];
            var id = 0;
            data.result.forEach(function(entry) {
            	var channel = JSON.parse(entry.socket_info).player_state;
                if(channel){
                	channel.id = id;
                	id++;
                    channels.push(channel);
                }
            });
            $scope.chats = channels;
            //tell the ionScroll that the job is done
            $scope.$broadcast('scroll.refreshComplete');
        }
    )};
})

.controller('ChatsCreateCtrl', ["Soundcloud", '$scope', 'playlistModel','Chats', function(Soundcloud, $scope, playlistModel, Chats) {
    
    $scope.create_room = function() {
        Chats.create_room("test").then(function(data) {
        	console.log("data="+data);
            console.log("room created");
        });
    }

    Soundcloud.getUser().then(function(data){
		$scope.sc = data;
	});
	$scope.add_to_playlist = function(source){
		console.log("add song="+JSON.stringify(source.title));
		playlistModel.add(source);
	}

}])

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  console.log("ChatDetailCtrl");
});