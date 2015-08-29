angular.module('ecstatic.create')

.controller('CreateChannelCtrl', function($scope, channelServices, countdownServices, $state) {
    $scope.create_channel = function(channelName) {
        channelServices.createChannel(channelName).then(function(data) {
            $state.go('tab.channels-player', {channel_id:data.player_state.channel_id});
        });
    }
    $scope.create_timer = function(mins, hours, channelName) {
		var milliSinceEpoch = new Date().getTime();
		countdownServices.startTime = (hours*3600000+mins*60000)+milliSinceEpoch;
		
		channelServices.createChannel(channelName).then(function(data) {
            $state.go('tab.channels-countdown', {channel_id:data.player_state.channel_id});
    	});
	}
})