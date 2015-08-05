angular.module('services', [])

.factory('Soundcloud',['$q', '$rootScope', function($q, $rootScope) {
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
}])

.factory('playlistModel', function($rootScope){
  var Service = {};
  Service.playlist = [];
  Service.add = function(source) {
    Service.playlist.push(source);
  }
  Service.remove = function(index) {
    Service.playlist.remove(index);
  }
  Service.getAll = function() {
    return playlist;
  }
  return Service;
})

.factory('channelModel', function($rootScope){
  var Service = {};
  Service.channels = [];
  Service.add = function(channel) {
    Service.channels.push(channel);
  }
  Service.set = function(channels) {
    Service.channels = channels;
  }
  Service.remove = function(index) {
    Service.channels.remove(index);
  }
  return Service;
});
