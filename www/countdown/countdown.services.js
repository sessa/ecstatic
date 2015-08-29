angular.module('ecstatic.countdown')

.factory('countdownServices', [ function(){
	var Service = {};
	Service.startTime = 0;
	return Service;
}]);
