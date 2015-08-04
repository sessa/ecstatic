angular.module('services', ['btford.socket-io'])

.factory('socket', function (socketFactory) {
  return socketFactory({
  	ioSocket: io.connect('http://localhost:8080/')
  });
})

.factory('Soundcloud',['$q', '$rootScope', function($q, $rootScope) {
      var Service = {};
      var defer = $q.defer();

      Service.getUser = function() {
        SC.initialize({
            client_id: '9d93a2f8833de3799958dfecf637cd9a',
            redirect_uri: 'http://soundcloud.dev/soundcloud.html'
        });

        SC.get('/tracks', {q:'buskers'}, function(data) {
            $rootScope.$apply(defer.resolve(data));
        });
        return defer.promise;
      }

    return Service;
}])

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
})

// most of this model comes from: http://clintberry.com/2013/angular-js-websocket-service/
.factory('Chats', ['$q', '$rootScope', 'socket', 'channelModel', 'playlistModel', function($q, $rootScope, socket, channelModel, playlistModel) {
    // We return this object to anything injecting our service
    var Service = {};
    // Keep all pending requests here until they get responses
    var callbacks = {};
    // Create a unique callback ID to map requests to responses
    var currentCallbackId = 0;
    // Create our websocket object with the address to the websocket
    
    socket.on('create_room', function (data) {
        listener(data);
    });
    socket.on('rooms', function (data) {
        listener(data);
        channelModel.set(data);
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
      console.log("Received data from websocket: ", messageObj);
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

    // Define a "getter" for getting customer data
    Service.getRooms = function() {
      var request = {
        msg: "rooms"
      }
      // Storing in a variable for clarity on what sendRequest returns
      var promise = sendRequest(request); 
      return promise;
    }

	Service.create_room = function(room_name) {
    var sources = [];
    for(var index = 0; index < playlistModel.playlist.length; index++){
      sources.push({src:playlistModel.playlist[index].uri, type:"audio/"+playlistModel.playlist[index].original_format})
    }
  	var request = {
          msg: "create_room",
          room_name: "testy_room",
          sources: sources
        }
        // Storing in a variable for clarity on what sendRequest returns
        var promise = sendRequest(request); 
        return promise;
  	}


    return Service;
}]);

