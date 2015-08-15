angular.module('ecstatic.soundcloud')

.factory('soundcloudService',['$q', '$rootScope', 'ConfigService', function($q, $rootScope, ConfigService) {
      var Service = {};
      var defer = $q.defer();

      Service.getUser = function() {
        console.log(ConfigService.getConfig().soundcloudBackend);
        SC.initialize({
            client_id: ConfigService.getConfig().soundcloudClientId,
            redirect_uri: ConfigService.getConfig().soundcloudBackend
        });

        // initiate auth popup
        SC.connect(function() {
          SC.get('/me', function(me) {
            SC.get('/users/'+me.id+'/favorites', function(data) {
              console.log("data="+JSON.stringify(data));
                $rootScope.$apply(defer.resolve(data));
            });
          });
        });
        
        return defer.promise;
      }

    return Service;
}]);