angular.module('ecstatic.models', [])

.factory('playlistModel', function($rootScope){
  var Service = {};
  Service.playlist = [];
  Service.add = function(source) {
    console.log("service.playlist="+JSON.stringify(Service.playlist));
    Service.playlist.push(source);
    console.log("service.playlist="+JSON.stringify(Service.playlist));
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
    console.log("Service.channels="+JSON.stringify(channel));
    Service.channels.push(channel);
  }
  Service.get = function(channelId){
    for(var index = 0; index < Service.channels.length; index++){
      console.log("channelId="+channelId);
      console.log("Service.channels="+JSON.stringify(Service.channels));
      console.log("Service.channels[index].player_state.room_id"+Service.channels[index].player_state.room_id);
      if(Service.channels[index].player_state.room_id == channelId){
        console.log("where equal");
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
