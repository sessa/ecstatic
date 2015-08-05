angular.module('ecstatic.models', [])

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
