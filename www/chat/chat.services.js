angular.module('ecstatic.chat')

.factory('chatServices', ['$rootScope', 'socket', 'socketManager', 'chatEventServices', 'cameraServices', '$sce',  function($rootScope, socket, socketManager, chatEventServices, cameraServices, $sce) {
    // We return this object to anything injecting our service
    var Service = {};
    Service.chat = [];
    Service.namePrompt = "What's Your Name?";
    Service.chatPrompt = "Type Your Message...";
    Service.textPrompt = Service.namePrompt;
    Service.username = "";
    socket.on('send_text', function (data) {
      console.log("added text from other user" + JSON.stringify(data));
      Service.chat.push(data);
      console.log("Data from server" + data.video_key);
      chatEventServices.broadcastText(data);
    });

    Service.getTextPrompt = function(){
      return Service.textPrompt;
    }
    Service.sendText = function(chatText, channel_id) {
      Service.chat.push(chatText);

      var request = {
        msg: "send_text",
        channel_id: channel_id,
        txt: chatText,
        username: Service.username,
      }

      var promise = socketManager.sendRequest(request); 
      chatEventServices.broadcastText(chatText);
      return promise;
    }

    Service.sendName = function(name) {
      Service.username = name;
      Service.textPrompt = Service.chatPrompt;
      chatEventServices.broadcastName(name);
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

.service("chatEventServices", ['$rootScope', function ($rootScope){
    this.broadcastBacklog = function(backlog) {$rootScope.$broadcast("send_chat_text", backlog);}
    this.listenBacklog = function(callback) {$rootScope.$on("send_chat_text", callback)}
    this.broadcastText = function(text) {$rootScope.$broadcast("send_text", text);}
    this.listenText = function(callback) {$rootScope.$on("send_text", callback)}
    this.broadcastName = function(name) {$rootScope.$broadcast("send_name", name);}
    this.listenName = function(callback) {$rootScope.$on("send_name", callback)};
}]);
