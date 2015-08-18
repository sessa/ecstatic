angular.module('ecstatic.chat')

.factory('chatServices', ['socket', 'socketManager',  function(socket, socketManager) {
    // We return this object to anything injecting our service
    var Service = {};

      Service.sendText = function(text, channel_id) {
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

  Service.add = function(source) {
    Service.chat.push(source);
  }

  Service.getAll = function() {
    return chat;
  }
  return Service;
})
