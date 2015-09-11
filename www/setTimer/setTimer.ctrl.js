angular.module('ecstatic.setTimer')

.controller('setTimerCtrl', function($scope, channelServices, $ionicLoading, $state, $ionicHistory, $stateParams){

    $scope.setTimer = function(hours, mins) {
    	hours = typeof hours !== 'undefined' ? hours : 0;
    	mins = typeof mins !== 'undefined' ? mins : 0;

		var milliSinceEpoch = new Date().getTime();
		var starterTime = (hours*3600000+mins*60000)+milliSinceEpoch;

		// $ionicLoading.show({
		// 	template: '<ion-spinner icon="android" class="spinner-light"></ion-spinner>'
		// });
		console.log("before create");
		console.log("before create+$stateParams.channelName"+$stateParams.channelName);
		channelServices.createChannel($stateParams.channelName, starterTime).then(function(data) {
			console.log("within create");
			// $ionicLoading.hide();
		 //    $ionicHistory.nextViewOptions({
		 //      disableAnimate: false,
		 //      disableBack: true
		 //    });
            $state.go('channel', {channel_id:data.player_state.channel_id});
    	});
	}
})
