angular.module('ecstatic.chat')
//on receive messages display them

.controller('chatCtrl', ["$sce", "$scope", "chatServices","chatModel", "$stateParams",  function($sce, $scope, chatServices, chatModel, $stateParams) {
	$scope.submitText = function(lineText){
		console.log("We are submitting the text in chat.ctrl.js");
		chatModel.add(lineText);
		chatServices.sendText(lineText, $stateParams.channel_id);
	}
	console.log("about to call all chatlog");
	$scope.chatLog = chatModel.getAll($stateParams.channel_id);

	$scope.$on('chat_backlog', function(event, data) {
		console.log("returning from server with data!");
		if(data != undefined){
			console.log("data defined");
			$scope.chatLog = chatModel.addChatBacklog(data);
		}
	})

}]);