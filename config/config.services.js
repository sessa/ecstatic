angular.module('ecstatic.config', [])

.factory('ConfigService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
	var Service = {};
	var CONFIG = {
	  	development: {
	  		apiBackend: "http://localhost:3001/",
	    	soundcloudBackend: "http://localhost:3001/soundcloud/callback"
	  	},
	  	production: {
	  		apiBackend: "http://squad-dev.elasticbeanstalk.com:3001/",
	    	soundcloudBackend: "http://squad-dev.elasticbeanstalk.com/soundcloud/callback"
	  	}
	}

	//change this in dev vs live
	Service.getConfigs = function(){
		return CONFIG.development;
	}
	return Service;
}]);
