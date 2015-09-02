angular.module('ecstatic.create')



.controller('setNameCtrl', function($scope, channelServices, $state) {
    $scope.nameChannel = function(channelName) {
    	//$scope.channelName = channelName;
        $state.go('app.channels-setTimer', {channelName:channelName});
    }
})
.controller('setTimerCtrl', function($scope, channelServices, $state, $stateParams){
    $scope.setTimer = function(hours, mins) {
    	hours = typeof hours !== 'undefined' ? hours : 0;
    	mins = typeof mins !== 'undefined' ? mins : 0;
		var milliSinceEpoch = new Date().getTime();
		var starterTime = (hours*3600000+mins*60000)+milliSinceEpoch;
		channelServices.createChannel($stateParams.channelName, starterTime).then(function(data) {
            $state.go('app.channels-countdown', {channel_id:data.player_state.channel_id});
    	});
	}
})
.controller('CountdownCtrl', function($scope, channelServices, $stateParams, $state, $rootScope) {
	channelServices.getChannels().then(function(data) {
		var channel = channelServices.getChannel($stateParams.channel_id); 
		var milliSinceEpoch = new Date().getTime();
		$scope.startTime = parseInt((channel.start_time - milliSinceEpoch)/1000);
		console.log("$scope.startTime"+$scope.startTime);
		$rootScope.$broadcast('timer-set-countdown', $scope.startTime);
		
		$scope.finished = function(){
			console.log("finished");
			$state.go('app.channels-player', {channel_id:$stateParams.channel_id});
		}	
		if($scope.startTime < 0 ){
			$scope.finished();
		}
	});
});
