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
    console.log("add, channel.player_state="+JSON.stringify(channel.player_state));
    Service.channels.push(channel.player_state);
  }
  Service.get = function(room_id){
    console.log("get, room_Id"+room_id);
    console.log("get, Service.channels = "+Service.channels);
    for(var index = 0; index < Service.channels.length; index++){
      var channel = Service.channels[index];
      if(channel.room_id == room_id){
        return Service.channels[index];
      }
    }
  }
  Service.set = function(rooms) {
    console.log("set, rooms="+JSON.stringify(rooms));
    var roomList = rooms.roomList;
    for(var index = 0; index < roomList.length; index++){
      if(roomList[index].player_state){
        console.log("set, Service.channels.push="+JSON.stringify(roomList[index].player_state));
        Service.channels.push(roomList[index].player_state);
      }
    }
  }
  Service.remove = function(index) {
    Service.channels.remove(index);
  }
  return Service;
});
