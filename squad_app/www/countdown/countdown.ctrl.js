angular.module('ecstatic.countdown')

.controller('CountdownCtrl', function($scope, channelServices, $stateParams) {
	$scope.startTime = $stateParams.startTime;
	console.log("$stateParams.startTime+"+$stateParams.startTime);
});