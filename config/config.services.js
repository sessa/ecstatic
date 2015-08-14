angular.module('ecstatic.config', [])

.factory('ConfigService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
	var Service = {};
	Service.configData = {};

	Service.getConfig = function(){
		$http.get('config/config.json')
			.success(function (data){
		      	Service.configData = data;
	    	});
	    return Service.configData;
	}
	return Service;
}]);
