angular.module('ecstatic.sockets')

.controller('CreateChannelCtrl', ['soundcloudService', '$scope', 'playlistModel','socketManager','$state', '$ionicHistory',function(soundcloudService, $scope, playlistModel, socketManager, $state, $ionicHistory) {
    
    $scope.create_channel = function(channelName) {

        console.log(channelName);
        socketManager.createChannel(channelName).then(function(data) {
            $state.go('tab.channels-player', {channel_id:data.player_state.channel_id});
        });
    }

    soundcloudService.getUser().then(function(data){
		$scope.sc = data;
	});
	$scope.add_to_playlist = function(source){
		playlistModel.add(source);
	}
}]);
