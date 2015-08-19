angular.module('ecstatic.chat')

.factory('chatServices', ['socket', 'socketManager',  function(socket, socketManager) {
    // We return this object to anything injecting our service
    var Service = {};

      Service.sendText = function(text, channel_id) {
      	console.log("We just sent text in chat.services.js");
        var request = {
          //msg: name of the api function
          msg: "send_text",
          channel_id: channel_id,
          txt: text
        }
        var promise = socketManager.sendRequest(request); 
        return promise;
      }
      return Service;
  }])

.factory('chatModel', function($rootScope){
  var Service = {};
  Service.chat = [];

  Service.add = function(txt) {
  	console.log("in chat.services.js add function");
    Service.chat.push(txt);
  }

  Service.getAll = function() {
    return Service.chat;
  }
  return Service;
})
