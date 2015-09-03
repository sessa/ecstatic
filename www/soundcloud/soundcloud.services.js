angular.module('ecstatic.soundcloud')

.factory('soundcloudService',['$q', '$rootScope', 'ConfigService', '$location', function($q, $rootScope, ConfigService, $location) {
      var Service = {};
      var defer = $q.defer();

      Service.getFavorites = function() {
        ConfigService.getConfig().then(function (data) {
          console.log("getFavorites," + $location.absUrl().split(':')[0] + ":" + $location.absUrl().split(':')[1]+'3001/soundcloud/callback');
          SC.initialize({
              client_id: data.soundcloudClientId,
              redirect_uri: $location.absUrl().split(':')[1]+'3001/soundcloud/callback'
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
        });
        return defer.promise;
      }

    return Service;
}]);