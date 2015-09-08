angular.module('ecstatic.soundcloud')

.factory('soundcloudService',['$q', '$rootScope', 'ConfigService', '$location', function($q, $rootScope, ConfigService, $location) {
	  var Service = {};
	  var defer = $q.defer();

	  Service.getFavorites = function() {
		var redirect_uri = $location.absUrl().split('/')[0]+ '//' + $location.absUrl().split('/')[2] +'/soundcloud/callback';

		ConfigService.getConfig().then(function (data) {
			SC.initialize({
				client_id: data.soundcloudClientId,
				redirect_uri: redirect_uri
			});
		  	SC.connect(function() {
				SC.get('/me', function(me) {
			  		SC.get('/users/'+me.id+'/favorites', function(data) {
				  		$rootScope.$apply(defer.resolve(data));
			  		});
				});
			});
		});
		return defer.promise;
	  }

	return Service;
}]);