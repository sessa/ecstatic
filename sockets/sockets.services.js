angular.module('ecstatic.sockets')

.factory('socket', ['socketFactory','ConfigService', function (socketFactory, ConfigService) {
  return socketFactory({
  	ioSocket: io.connect(ConfigService.getConfig().apiBackend)
  });
}])

.factory('socketManager', ['$q', '$rootScope', 'socket', 'channelModel', 'playlistModel', function($q, $rootScope, socket, channelModel, playlistModel) {
    // We return this object to anything injecting our service
    var Service = {};
    // Keep all pending requests here until they get responses
    var callbacks = {};
    // Create a unique callback ID to map requests to responses
    var currentCallbackId = 0;
    // Create our websocket object with the address to the websocket
    
    socket.on('create_channel', function (data) {
        channelModel.add(data);
        listener(data);
    });
    socket.on('channelList', function (data) {
        listener(data);
        channelModel.set(data);
    });

    socket.on('next_song_action', function (data) {
        $rootScope.$broadcast('nextSong');
    });

    function sendRequest(request) {
      var defer = $q.defer();
      var callbackId = getCallbackId();
      callbacks[callbackId] = {
        time: new Date(),
        cb:defer
      };
      request.callback_id = callbackId;
      console.log('Sending request', JSON.stringify(request));
      socket.emit(request.msg, request);
      return defer.promise;
    }

    function listener(data) {
      var messageObj = data;
      console.log("Received data from websocket: ", JSON.stringify(messageObj));
      // If an object exists with callback_id in our callbacks object, resolve it
      if(callbacks.hasOwnProperty(messageObj.callback_id)) {
        $rootScope.$apply(callbacks[messageObj.callback_id].cb.resolve(messageObj));
        delete callbacks[messageObj.callbackID];
      }
    }
    // This creates a new callback ID for a request
    function getCallbackId() {
      currentCallbackId += 1;
      if(currentCallbackId > 10000) {
        currentCallbackId = 0;
      }
      return currentCallbackId;
    }

    Service.getChannels = function() {
      var request = {
        msg: "channelList"
      }
      var promise = sendRequest(request); 
      return promise;
    }

    Service.joinChannel = function(channel_id) {
      var request = {
        msg: "join_channel",
        channel_id:channel_id
      }
      var promise = sendRequest(request); 
      return promise;
    }

    Service.leaveChannel = function(channel_id) {
      var request = {
        msg: "leave_channel",
        channel_id:channel_id
      }
      var promise = sendRequest(request); 
      return promise;
    }

    Service.nextSongAction = function(playlistIndex, channel_id) {
      var request = {
        msg: "next_song_action",
        channel_id: channel_id,
        playlistIndex: playlistIndex
      }
      var promise = sendRequest(request); 
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
            channel_name: channelName,
            sources: sources
          }
          // Storing in a variable for clarity on what sendRequest returns
          var promise = sendRequest(request); 
          return promise;
      }

    return Service;
}]);
