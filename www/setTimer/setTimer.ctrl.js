angular.module('ecstatic.setTimer')

.controller('setTimerCtrl', function($scope, channelServices, $ionicLoading, $state, $ionicHistory, $stateParams){

    $scope.setTimer = function(hours, mins) {
    	hours = typeof hours !== 'undefined' ? hours : 0;
    	mins = typeof mins !== 'undefined' ? mins : 0;

		var milliSinceEpoch = new Date().getTime();
		var starterTime = (hours*3600000+mins*60000)+milliSinceEpoch;

		channelServices.createChannel($stateParams.channelName, starterTime).then(function(data) {
            $state.go('channel', {channel_id:data.player_state.channel_id});
    	});
	}
})
