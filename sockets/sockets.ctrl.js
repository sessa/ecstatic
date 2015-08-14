angular.module('ecstatic.sockets')

.controller('CreateChannelCtrl', ['soundcloudService', '$scope', 'playlistModel','socketManager','$state', '$ionicHistory',function(soundcloudService, $scope, playlistModel, socketManager, $state, $ionicHistory) {
    
    $scope.create_room = function() {
        socketManager.createRoom("test").then(function(data) {
            $state.go('tab.channels-player', {room_id:data.player_state.room_id});
        });
    }

    soundcloudService.getUser().then(function(data){
		$scope.sc = data;
	});
	$scope.add_to_playlist = function(source){
		playlistModel.add(source);
	}
}]);
