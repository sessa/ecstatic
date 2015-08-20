angular.module('ecstatic.channels')

.factory('channelServices', ['socket', 'socketManager', 'playerServices','$sce', 'ConfigService',function(socket, socketManager, playerServices, $sce, ConfigService) {
  // We return this object to anything injecting our service
  var Service = {};
  Service.channels = [];

  Service.getPlayerState = function(channel_id) {
    var request = {
      msg: "channelList"
    }

    socket.on('channelList', function (data) {
        Service.setChannels(data);
        socketManager.listener(Service.getChannel(channel_id).player_state);
    });

    var promise = socketManager.sendRequest(request); 
    return promise;
  }

  Service.addToPlaylist = function(channel_id, source) {
      console.log("addToPlaylist, source="+source);
      var channel = Service.getChannel(channel_id);
      console.log("channel-"+JSON.stringify(channel));
      channel.soundcloudResources.push(source);
      channel.playlist.push({src: $sce.trustAsResourceUrl(source.stream_url+"?client_id="+ConfigService.getConfig().soundcloudClientId), type: "audio/"+source.original_format});
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

  Service.getPlaylist = function(channel_id) {
    var request = {
      msg: "channelList"
    }

    socket.on('channelList', function (data) {
      console.log("channellist returned");
        Service.setChannels(data);
        if(Service.getChannel(channel_id)){
          socketManager.listener(Service.getChannel(channel_id).sources); 
        }
    });

    var promise = socketManager.sendRequest(request); 
    return promise;
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
    for(var index = 0; index < channelList.length; index++){
      if(channelList[index].player_state){
        Service.channels.push(channelList[index].player_state);
      }
    }
  }
  Service.getChannel = function(channel_id){
    console.log("channel_id="+channel_id);
    for(var index = 0; index < Service.channels.length; index++){
      var channel = Service.channels[index];
      if(channel.channel_id == channel_id){
        console.log("Service.channels[index]"+Service.channels[index]);
        return Service.channels[index];
      }
    }
  }

  Service.setChannel = function(channel){
    console.log("setChannel, channel="+JSON.stringify(channel));
    for(var index = 0; index < Service.channels.length; index++){
      var localChannel = Service.channels[index];
      if(localChannel.channel_id == channel.channel_id){
        console.log("channel.player_state.channel_id"+channel.channel_id);
        Service.channels[index].player_state = channel;
      }
    }
  }

	Service.createChannel = function(channelName) {
		var request = {
			msg: "create_channel",
			channel_name: channelName,
      chat: []
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