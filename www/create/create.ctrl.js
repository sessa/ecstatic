angular.module('ecstatic.create')


.controller('setNameCtrl', function($scope, channelServices, $state) {
    $scope.nameChannel = function(channelName) {
    	$scope.channelName = channelName;
        $state.go('setTimer', {channelName:channelName});
    }
})
.controller('setTimerCtrl', function($scope, channelServices, $ionicLoading, $state, $stateParams){

    $scope.setTimer = function(hours, mins) {
    	hours = typeof hours !== 'undefined' ? hours : 0;
    	mins = typeof mins !== 'undefined' ? mins : 0;
		var milliSinceEpoch = new Date().getTime();
		var starterTime = (hours*3600000+mins*60000)+milliSinceEpoch;

		$ionicLoading.show({
			template: '<ion-spinner icon="android" class="spinner-light"></ion-spinner>'
		});
		setTimeout(function(){ 
		channelServices.createChannel($stateParams.channelName, starterTime).then(function(data) {

			$ionicLoading.hide();
            $state.go('channel', {channel_id:data.player_state.channel_id});
    	});
    	 }, 500);
	}
})
.controller('CountdownCtrl', function(countdownEventService, playerServices, $scope, channelServices, $stateParams, $state, $rootScope) {
	playerServices.getSocketId().then(function (s) {
		var channel = channelServices.getChannel($stateParams.channel_id); 
		var milliSinceEpoch = new Date().getTime();
		$scope.startTime = parseInt((channel.start_time - milliSinceEpoch)/1000);
		$rootScope.$broadcast('timer-set-countdown', $scope.startTime);
        //if()
		$scope.showCountdown = true;
		$scope.finished = function(){
			console.log("finished");
			$scope.showCountdown = false;
			countdownEventService.broadcast();
			$scope.$apply();
			//$state.go('app.channel.player', {channel_id:$stateParams.channel_id});
		}	
		if($scope.startTime < 1 ){
			$scope.finished();
		}
	});
});
