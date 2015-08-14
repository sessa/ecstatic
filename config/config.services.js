angular.module('ecstatic.config', [])

.factory('ConfigService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
	var Service = {};

	//change this in dev vs live
	Service.getConfigs = function(){
		$http.get('config/config.json').success(function (data){
			console.log("data="+data);
	      	return data.development;
	    });
	}
	return Service;
}]);
