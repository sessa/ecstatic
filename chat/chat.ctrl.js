angular.module('ecstatic.chat')
//on receive messages display them

.controller('chatCtrl', ["$sce", "$scope", "chatServices", "$stateParams", "chatEventServices",  function($sce, $scope, chatServices, $stateParams, chatEventServices) {
	$scope.chatLog = chatServices.getChatBacklog($stateParams.channel_id);
	$scope.textPrompt = chatServices.getTextPrompt();
	$scope.username = "";

	$scope.sendText = function(lineText) {
		chatServices.sendText(lineText, $stateParams.channel_id);
	}

	$scope.sendName = function(name) {
		chatServices.sendName(name);
	}

	$scope.enterText = function(lineText) {
		console.log("entered text");
		if($scope.username == ""){
			$scope.sendName(lineText);
		}else{
			$scope.sendText(lineText);
		}
	}

	chatEventServices.listenBacklog(function (event, backlog) {
		$scope.chatLog = backlog;
	});

	chatEventServices.listenText(function (event, text) {
		$scope.chatlog = chatServices.getChatBacklog($stateParams.channel_id);
	});

	chatEventServices.listenName(function (event, name) {
		$scope.username = name;
		$scope.textPrompt = chatServices.getTextPrompt();

	});


}]);



