angular.module('ecstatic.config', [])

.factory('ConfigService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
	var Service = {};
	Service.configData = {};

	Service.getConfig = function(){
		$http.get('config/config.json')
			.success(function (data){
				console.log("data="+JSON.stringify(data.development));
		      	Service.configData = data.development;
	    	});
	    return Service.configData;
	}
	return Service;
}]);
