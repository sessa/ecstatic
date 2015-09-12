angular.module('ecstatic.countdown')


.controller('CountdownCtrl', function(countdownEventService, $scope, channelServices, $stateParams, $state, $rootScope) {
	$scope.$watch('dataReady',function(ready){
        if (ready){ startController() }
    });

    function startController() {
    	var channel = channelServices.getChannel($stateParams.channel_id); 
		var milliSinceEpoch = new Date().getTime();
		$scope.startTime = parseInt((channel.start_time - milliSinceEpoch)/1000);
		$rootScope.$broadcast('timer-set-countdown', $scope.startTime);
		
		$scope.finished = function(){
			$scope.showCountdown = false;
			countdownEventService.broadcast();
			$state.go('channel', {channel_id:$stateParams.channel_id}, {reload:true});
		}	

		if($scope.startTime < 1 ){
			$scope.finished();
		}
		else{
			$scope.showCountdown = true;
		}
    }
});
