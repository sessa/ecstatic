angular.module('ecstatic.config', [])

.factory('ConfigService', ['ApiEndpoint', '$http', '$q', '$rootScope', '$location', function (ApiEndpoint, $http, $q, $rootScope, $location) {
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
