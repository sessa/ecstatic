angular.module("ecstatic.chat").controller("ChatCtrl",["$state","$sce","$scope","chatServices","$stateParams","cameraServices","chatEventServices","channelServices","$ionicScrollDelegate",function(e,t,n,o,c,a,s,l,i){n.chatLog=o.getChatBacklog(c.channel_id),n.channel_id=c.channel_id,n.textPrompt=o.getTextPrompt(),n.username="",l.joinChannel(c.channel_id),n.goToVideolist=function(){e.go("tab.channels-videolist")},n.getUrl=function(e){return console.log("https://s3.amazonaws.com/ecstatic-videos"+e),t.trustAsResourceUrl("https://s3.amazonaws.com/ecstatic-videos/"+e)},n.sendText=function(e){e&&o.sendText(e,c.channel_id)},n.sendName=function(e){o.sendName(e)},n.enterText=function(e){console.log("entered text"),""==n.username?n.sendName(e):n.sendText(e)},s.listenBacklog(function(e,t){n.chatLog=t,i.scrollBottom()}),s.listenText(function(e,t){n.chatlog=o.getChatBacklog(c.channel_id),i.scrollBottom()}),s.listenName(function(e,t){n.username=t,n.textPrompt=o.getTextPrompt()})}]);