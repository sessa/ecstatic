angular.module('ecstatic.sockets')

.factory('socket', ['socketFactory','ConfigService', function (socketFactory, ConfigService) {
	return socketFactory({
		ioSocket: io.connect(ConfigService.getConfig().apiBackend)
	});
}])

.factory('socketManager', ['$q', '$rootScope', 'socket', function($q, $rootScope, socket) {
		// We return this object to anything injecting our service
		var Service = {};
		// Keep all pending requests here until they get responses
		var callbacks = {};
		// Create a unique callback ID to map requests to responses
		var currentCallbackId = 0;
		// Create our websocket object with the address to the websocket
		
		Service.sendRequest = function(request) {
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

		Service.listener = function(data) {
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

		return Service;
}]);
