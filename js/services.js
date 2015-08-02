angular.module('services', ['btford.socket-io'])

.factory('socket', function (socketFactory) {
  return socketFactory({
  	ioSocket: io.connect('http://localhost:8080/')
  });
})

// most of this model comes from: http://clintberry.com/2013/angular-js-websocket-service/
.factory('Chats', ['$q', '$rootScope', 'socket', function($q, $rootScope, socket) {
    // We return this object to anything injecting our service
    var Service = {};
    // Keep all pending requests here until they get responses
    var callbacks = {};
    // Create a unique callback ID to map requests to responses
    var currentCallbackId = 0;
    // Create our websocket object with the address to the websocket
    
	socket.on('rooms', function (data) {
        listener(data);
    });
    socket.on('create_room', function (data) {
        listener(data);
    });

    function sendRequest(request) {
      var defer = $q.defer();
      var callbackId = getCallbackId();
      callbacks[callbackId] = {
        time: new Date(),
        cb:defer
      };
      request.callback_id = callbackId;
      console.log('Sending request', request);
      socket.emit(request.msg, request);
      return defer.promise;
    }

    function listener(data) {
      var messageObj = data;
      console.log("Received data from websocket: ", messageObj);
      // If an object exists with callback_id in our callbacks object, resolve it
      if(callbacks.hasOwnProperty(messageObj.callback_id)) {
        console.log(callbacks[messageObj.callback_id]);
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
	var request = {
        msg: "create_room",
        room_name: "testy_room",
        url: "https://soundcloud.com/silentdiscosquad/sets/radio-startupfest-friday-july"
      }
      // Storing in a variable for clarity on what sendRequest returns
      var promise = sendRequest(request); 
      return promise;
	}


    return Service;
}]);

/*.factory('Chats', [ function (socket) {

	return {
		rooms: function() {
			socket.emit('rooms');
			socket.on('rooms', function (data) {
				data.forEach(function(chat) { console.log(chat.room_id); });
                return data;
            });
		},
		remove: function(chat) {
			chats.splice(chats.indexOf(chat), 1);
		},
		create_room: function(room_name) {
            socket.emit('create_room', {room_name: "testy_room"});
            socket.on('create_room', function (data) {
                console.log("room created, data="+data);
               	return data;
            });
		}
	};
}]);*/
