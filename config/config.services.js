angular.module('ecstatic.config', [])

.factory('ConfigService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
	var Service = {};

	//change this in dev vs live
	Service.getConfigs = function(){
		return CONFIG.development;
	}
	return Service;
}]);
