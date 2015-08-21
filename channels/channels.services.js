angular.module('ecstatic.channels')

.factory('channelServices', ['socket', 'socketManager', 'playerServices','$sce', 'ConfigService',function(socket, socketManager, playerServices, $sce, ConfigService) {
  // We return this object to anything injecting our service
  var Service = {};
  Service.channels = [];

  Service.addToPlaylist = function(channel_id, source) {
      var channel = Service.getChannel(channel_id);
      channel.playlist.push(source);
      var request = {
        msg: "update_channel",
        channel_info: channel
      }

      //channelList returns all channels
        socket.on('update_channel', function (data) {
            Service.setChannel(data);
            socketManager.listener(data);
        });

      socketManager.sendRequest(request); 
  }

  Service.getChannels = function() {
	var request = {
		msg: "channelList"
	}

	//channelList returns all channels
    socket.on('channelList', function (data) {
        Service.setChannels(data);
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

  Service.setChannels = function(channels) {
    var channelList = channels.channelList;
    Service.channels = [];
    for(var index = 0; index < channelList.length; index++){
      if(channelList[index].player_state){
        Service.channels.push(channelList[index].player_state);
      }
    }
  }
  Service.getChannel = function(channel_id){
    for(var index = 0; index < Service.channels.length; index++){
      var channel = Service.channels[index];
      if(channel.channel_id == channel_id){
        return Service.channels[index];
      }
    }
  }

  Service.setChannel = function(channel){
    for(var index = 0; index < Service.channels.length; index++){
      var localChannel = Service.channels[index];
      if(localChannel.channel_id == channel.channel_id){
        Service.channels[index].player_state = channel;
      }
    }
  }

	Service.createChannel = function(channelName) {
		var request = {
			msg: "create_channel",
			channel_name: channelName,
		}

		//When create channel returns, add the data to the channelModel
		socket.on('create_channel', function (data) {
      Service.channels.push(data.player_state);
      playerServices.channel_id = data.player_state.channel_id;
			socketManager.listener(data);
		});
		// Storing in a variable for clarity on what sendRequest returns
		var promise = socketManager.sendRequest(request); 
		return promise;
	}
	return Service;
}])