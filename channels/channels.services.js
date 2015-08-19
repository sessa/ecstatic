angular.module('ecstatic.channels')

.factory('channelServices', ['socket', 'socketManager', 'channelModel', 'playerService', function(socket, socketManager, channelModel, playerService) {
  // We return this object to anything injecting our service
  var Service = {};

  Service.getChannels = function() {
	var request = {
		msg: "channelList"
	}

	//channelList returns all channels
    socket.on('channelList', function (data) {
        channelModel.set(data);
        socketManager.listener(data);
    });

	var promise = socketManager.sendRequest(request); 
	return promise;
  }

  Service.joinChannel = function(channel_id) {
    var request = {
      msg: "join_channel",
      channel_id:channel_id
    }
    var promise = socketManager.sendRequest(request); 
    return promise;
  }

	Service.createChannel = function(channelName) {
		var request = {
			msg: "create_channel",
			channel_name: "testy_room",
      chat: []
		}

		//When create channel returns, add the data to the channelModel
		socket.on('create_channel', function (data) {
      channelModel.add(data);
      var player_state = data.player_state;
      playerService.setPlayerState(player_state);
			socketManager.listener(data);
		});
		// Storing in a variable for clarity on what sendRequest returns
		var promise = socketManager.sendRequest(request); 
		return promise;
	}
	return Service;
}])

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
        console.log("Service.channels[index]"+Service.channels[index]);
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