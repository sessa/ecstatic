angular.module('ecstatic.models')

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
    Service.channels.push(channel.player_state);
  }
  Service.get = function(channel_id){
    console.log("channel_id="+channel_id);
    for(var index = 0; index < Service.channels.length; index++){
      var channel = Service.channels[index];
      if(channel.channel_id == channel_id){
        return Service.channels[index];
      }
    }
  }
  Service.set = function(channels) {
    var channelList = channels.channelList;
    for(var index = 0; index < channelList.length; index++){
      if(channelList[index].player_state){
        Service.channels.push(channelList[index].player_state);
      }
    }
  }
  Service.remove = function(index) {
    Service.channels.remove(index);
  }
  return Service;
});
