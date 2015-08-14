angular.module('ecstatic.soundcloud')

.factory('soundcloudService',['$q', '$rootScope', 'ConfigService', function($q, $rootScope, ConfigService) {
      var Service = {};
      var defer = $q.defer();

      Service.getUser = function() {
        SC.initialize({
            client_id: '9d93a2f8833de3799958dfecf637cd9a',
            redirect_uri: ConfigService.getConfigs().soundcloudBackend
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