angular.module('ecstatic.chat')

.factory('chatServices', ['$rootScope', 'socket', 'socketManager',  function($rootScope, socket, socketManager) {
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

      Service.getChatBacklog = function(channel_id) {
        console.log("Chat.Services.js - getChatBacklog()");
        var request = {
          msg: "chat_backlog",
          channel_id: channel_id,
        }
        socket.on('chat_backlog', function (data) {
          console.log("returned chat from the server" + JSON.stringify(data));
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
  	console.log("in chat.services.js add function");
    Service.chat.push(txt);
  }

  Service.addChatBacklog = function(chat_backlog) {
    console.log("setting chat backlog" + chat_backlog);
    Service.chat = chat_backlog;
    return Service.chat;
  }

  Service.getAll = function(channel_id) {
    console.log("Chat.services.js - getAll() with count: " + Service.chat.length );
    chatServices.getChatBacklog(channel_id);
    return Service.chat;
  }
  return Service;
}])
