angular.module('ecstatic.config', [])

.factory('ConfigService', ['$http', '$q', '$rootScope', '$location', function ($http, $q, $rootScope, $location) {
	var Service = {};

	Service.getConfig = function(){
		var defer = $q.defer();
		$http.get($location.absUrl().split(':')[0]+ ':' + $location.absUrl().split(':')[1] +':3001/soundcloudClientId')
			.success(function (data){
				defer.resolve(data);
			});
		return defer.promise;
	}

	return Service;
}]);
