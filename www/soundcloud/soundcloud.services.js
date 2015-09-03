angular.module('ecstatic.soundcloud')

.factory('soundcloudService',['$q', '$rootScope', 'ConfigService', '$location', function($q, $rootScope, ConfigService, $location) {
      var Service = {};
      var defer = $q.defer();

      Service.getFavorites = function() {
        ConfigService.getConfig().then(function (data) {
          var redirect_uri = $location.absUrl().split(':')[0]+ ':' + $location.absUrl().split(':')[1] +':3001/soundcloud/callback';
          console.log("redirect_uri+"+redirect_uri);
          console.log("data.soundcloudClientId+"+data.soundcloudClientId);
          SC.initialize({
              client_id: data.soundcloudClientId,
              redirect_uri: redirect_uri
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