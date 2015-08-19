angular.module('ecstatic.chat')

.factory('chatServices', ['$rootScope', 'socket', 'socketManager',  function($rootScope, socket, socketManager) {
    // We return this object to anything injecting our service
    var Service = {};

      socket.on('send_text', function (data) {
         console.log("added text from other user" + data);
         $rootScope.$broadcast('send_text', data);     
      })

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

      Service.getChatBacklog = function(channel_id) {
        var request = {
          msg: "chat_backlog",
          channel_id: channel_id,
        }
        socket.on('chat_backlog', function (data) {
          $rootScope.$broadcast('chat_backlog', data);
        })

        var promise = socketManager.sendRequest(request);
        return promise;
      }

      return Service;
  }])

.factory('chatModel', ['$rootScope', 'chatServices', function($rootScope, chatServices) {
  var Service = {};
  Service.chat = [];

  Service.add = function(txt) {
    Service.chat.push(txt);
  }

  Service.addChatBacklog = function(chat_backlog) {
    Service.chat = chat_backlog;
    return Service.chat;
  }

  Service.getAll = function(channel_id) {
    chatServices.getChatBacklog(channel_id);
    return Service.chat;
  }
  return Service;
}])
