angular.module('ecstatic.config', [])

.factory('ConfigService', ['ApiEndpoint', '$http', '$q', '$rootScope', '$location', function (ApiEndpoint, $http, $q, $rootScope, $location) {
	var Service = {};

	Service.getConfig = function(){
		var defer = $q.defer();
		$http.get($location.absUrl().split('/')[0]+ '//' + $location.absUrl().split('/')[2] +'/soundcloudClientId')
			.success(function (data){
				defer.resolve(data);
			});
		return defer.promise;
	}

	return Service;
}]);
