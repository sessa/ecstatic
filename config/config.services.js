angular.module('ecstatic.config', [])

.factory('ConfigService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
	var Service = {};
	var CONFIG = {
	  	development: {
	    	soundcloudBackend: "http://localhost:3001/soundcloud/callback"
	  	},
	  	production: {
	    	soundcloudBackend: "http://squad-dev.elasticbeanstalk.com/soundcloud/callback"
	  	}
	}

	function sendRequest() {
		var defer = $q.defer();
		$http.get("/env").success(function (data) {
    		$rootScope.$apply(defer.resolve(data));
		});
		return defer.promise;
    }

	Service.getConfigs = function(){
		var promise = sendRequest(); 
		return promise;
	}
	return Service;
}]);
