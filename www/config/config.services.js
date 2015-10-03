angular.module('ecstatic.config', [])

.factory('ConfigService', ['$http', '$q', '$rootScope', 'ApiEndpoint', function ($http, $q, $rootScope, ApiEndpoint) {
	var Service = {};

	Service.getConfig = function(){
		var defer = $q.defer();
		$http.get(ApiEndpoint.url+'/soundcloudClientId')
			.success(function (data){
				defer.resolve(data);
			});
		return defer.promise;
	}

	return Service;
}]);
