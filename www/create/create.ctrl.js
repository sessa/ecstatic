angular.module('ecstatic.create')


.controller('setNameCtrl', function($scope, channelServices, $state) {
    $scope.nameChannel = function(channelName) {
    	$scope.channelName = channelName;
        $state.go('setTimer', {channelName:channelName});
    }
})
.controller('setTimerCtrl', function($scope, channelServices, $ionicLoading, $state, $ionicHistory, $stateParams, playerServices){

    $scope.setTimer = function(hours, mins) {
    	hours = typeof hours !== 'undefined' ? hours : 0;
    	mins = typeof mins !== 'undefined' ? mins : 0;

    	//if you have a countdown, set it
    	var hasCountdown = false;
    	if(hours + mins != 0){
    		hasCountdown = true;
    	}

		var milliSinceEpoch = new Date().getTime();
		var starterTime = (hours*3600000+mins*60000)+milliSinceEpoch;

		$ionicLoading.show({
			template: '<ion-spinner icon="android" class="spinner-light"></ion-spinner>'
		});
		setTimeout(function(){ 
		channelServices.createChannel($stateParams.channelName, starterTime, hasCountdown).then(function(data) {

			$ionicLoading.hide();
		    $ionicHistory.nextViewOptions({
		      disableAnimate: false,
		      disableBack: true
		    });
            $state.go('channel', {channel_id:data.player_state.channel_id});
    	});
    	 }, 500);
	}
})
.controller('CountdownCtrl', function(countdownEventService, playerServices, $scope, channelServices, $stateParams, $state, $rootScope) {
	$scope.$watch('dataReady',function(ready){
        if (ready){ startController() }
    });

    function startController() {
    	console.log("$stateParams.channel_id"+$stateParams.channel_id);
    	var channel = channelServices.getChannel($stateParams.channel_id); 
    	console.log("channel="+JSON.stringify(channel));
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
