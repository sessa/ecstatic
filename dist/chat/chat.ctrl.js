angular.module("ecstatic.chat").controller("ChatCtrl",["$state","$sce","$scope","chatServices","$stateParams","cameraServices","chatEventServices","channelServices","$ionicScrollDelegate",function(e,t,n,c,a,o,s,i,l){n.chatLog=c.getChatBacklog(a.channel_id),n.channel_id=a.channel_id,n.textPrompt=c.getTextPrompt(),n.username="",i.joinChannel(a.channel_id),n.goToVideolist=function(){e.go("tab.channels-videolist")},n.getUrl=function(e){return t.trustAsResourceUrl("https://s3.amazonaws.com/ecstatic-videos/"+e)},n.sendText=function(e){e&&c.sendText(e,a.channel_id)},n.sendName=function(e){c.sendName(e)},n.enterText=function(e){""==n.username?n.sendName(e):n.sendText(e)},s.listenBacklog(function(e,t){n.chatLog=t,l.scrollBottom()}),s.listenText(function(e,t){n.chatlog=c.getChatBacklog(a.channel_id),l.scrollBottom()}),s.listenName(function(e,t){n.username=t,n.textPrompt=c.getTextPrompt()})}]);