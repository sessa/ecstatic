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
    console.log("Service.channels="+Service.channels);
    Service.channels.push(channel);
  }
  Service.get = function(channelId){
    console.log("channelId="+channelId);
    for(var index = 0; index < Service.channels; index++){
      console.log("Service.channel"+Service.channels);
      if(Service.channels[index].room_id == channelId){
        return Service.channels[index];
      }
    }
  }
  Service.set = function(channels) {
    Service.channels = channels;
  }
  Service.remove = function(index) {
    Service.channels.remove(index);
  }
  return Service;
});
