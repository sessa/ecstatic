angular.module('ecstatic.sockets')

.controller('ChatsCreateCtrl', ['soundcloudService', '$scope', 'playlistModel','socketManager','$state', function(soundcloudService, $scope, playlistModel, socketManager, $state) {
    
    $scope.create_room = function() {
        socketManager.createRoom("test").then(function(data) {
        	console.log("data="+JSON.stringify(data));
            $state.go('tab.chat-detail', {room_id:data.player_state.room_id});
        });
    }

    soundcloudService.getUser().then(function(data){
		$scope.sc = data;
	});
	$scope.add_to_playlist = function(source){
		console.log("add song="+JSON.stringify(source.title));
		playlistModel.add(source);
	}
}]);
