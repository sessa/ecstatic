angular.module('ecstatic.chat')
//on receive messages display them

.controller('chatCtrl', ["$sce", "$scope", "chatServices", "$stateParams", "chatEventServices",  function($sce, $scope, chatServices, $stateParams, chatEventServices) {
	$scope.chatLog = chatServices.getChatBacklog($stateParams.channel_id);
	$scope.submitText = function(lineText){
		chatServices.sendText(lineText, $stateParams.channel_id);
	}

	chatEventServices.listenBacklog(function (event, backlog) {
		$scope.chatLog = backlog;
	});

	chatEventServices.listenText(function (event, text) {
		$scope.chatlog = chatServices.chat;
	});


}]);



