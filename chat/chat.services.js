angular.module('ecstatic.chat')

.factory('chatServices', ['$rootScope', 'socket', 'socketManager', 'chatEventServices',  function($rootScope, socket, socketManager, chatEventServices) {
    // We return this object to anything injecting our service
    var Service = {};
    Service.chat = [];

    Service.sendText = function(chatText, channel_id) {
      Service.chat.push(chatText);
      var request = {
        msg: "send_text",
        channel_id: channel_id,
        txt: chatText
      }
      socket.on('send_text', function (data) {
        Service.chat.push(data);
        console.log("added text from other user" + data);
        chatEventServices.broadcastText(data);
      })
      var promise = socketManager.sendRequest(request); 
      return promise;
    }

    Service.getChatBacklog = function(channel_id) {
      var request = {
        msg: "chat_backlog",
        channel_id: channel_id,
      }
      socket.on('chat_backlog', function (data) {
        Service.chat = data;
        chatEventServices.broadcastBacklog(data)
      })
      var promise = socketManager.sendRequest(request);
      return promise;
    }
    return Service;
  }])

.service("chatEventServices", function ($rootScope){
    this.broadcastBacklog = function(backlog) {$rootScope.$broadcast("send_chat_text", backlog);}
    this.listenBacklog = function(callback) {$rootScope.$on("send_chat_text", callback)}
    this.broadcastText = function(text) {$rootScope.$broadcast("send_text", text);}
    this.listenText = function(callback) {$rootScope.$on("send_text", callback)}
});
