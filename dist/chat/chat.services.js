angular.module("ecstatic.chat").factory("chatServices",["$rootScope","socket","socketManager","chatEventServices","cameraServices","$sce",function(t,e,a,n,o,c){var s={};return s.chat=[],s.namePrompt="What's Your Name?",s.chatPrompt="Type Your Message...",s.textPrompt=s.namePrompt,s.username="",e.on("send_text",function(t){console.log("added text from other user"+JSON.stringify(t)),s.chat.push(t),console.log("Data from server"+t.video_key),n.broadcastText(t)}),s.getTextPrompt=function(){return s.textPrompt},s.sendText=function(t,e){s.chat.push(t);var o={msg:"send_text",channel_id:e,txt:t,username:s.username},c=a.sendRequest(o);return n.broadcastText(t),c},s.sendName=function(t){s.username=t,s.textPrompt=s.chatPrompt,n.broadcastName(t)},s.getChatBacklog=function(t){var o={msg:"chat_backlog",channel_id:t};e.on("chat_backlog",function(t){s.chat=t,n.broadcastBacklog(t)});var c=a.sendRequest(o);return c},s}]).service("chatEventServices",["$rootScope",function(t){this.broadcastBacklog=function(e){t.$broadcast("send_chat_text",e)},this.listenBacklog=function(e){t.$on("send_chat_text",e)},this.broadcastText=function(e){t.$broadcast("send_text",e)},this.listenText=function(e){t.$on("send_text",e)},this.broadcastName=function(e){t.$broadcast("send_name",e)},this.listenName=function(e){t.$on("send_name",e)}}]);