angular.module('ecstatic.config', [])

.factory('ConfigService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
	var Service = {};

	Service.getConfig = function(){
		var defer = $q.defer();

		$http.get('soundcloudClientId')
			.success(function (data){
				defer.resolve(data);
			});
		return defer.promise;
	}

	return Service;
}]);
