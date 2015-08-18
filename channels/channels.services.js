angular.module('ecstatic.channels')

.factory('channelServices', ['socket', 'socketManager', 'channelModel', 'playlistModel', function(socket, socketManager, channelModel, playlistModel) {
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
		var sources = [];
		for(var index = 0; index < playlistModel.playlist.length; index++){
			//for each song in the playlist
			var media = playlistModel.playlist[index];
			sources.push({src:media.stream_url + '?client_id=9d93a2f8833de3799958dfecf637cd9a', type:"audio/"+media.original_format})
		}
		var request = {
			msg: "create_channel",
			channel_name: "testy_room",
      chat: [],
			sources: sources
		}

		//When create channel returns, add the data to the channelModel
		socket.on('create_channel', function (data) {
			channelModel.add(data);
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