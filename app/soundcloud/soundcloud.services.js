angular.module('ecstatic.soundcloud', [])

.factory('soundcloudService',['$q', '$rootScope', function($q, $rootScope) {
      var Service = {};
      var defer = $q.defer();

      Service.getUser = function() {
        SC.initialize({
            client_id: '9d93a2f8833de3799958dfecf637cd9a',
            redirect_uri: 'http://soundcloud.dev/soundcloud.html'
        });

        SC.get('/tracks', {q:'buskers'}, function(data) {
          console.log("data="+JSON.stringify(data));
            $rootScope.$apply(defer.resolve(data));
        });
        return defer.promise;
      }

    return Service;
}]);

