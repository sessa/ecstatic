angular.module('ecstatic.chat')
//on receive messages display them

.controller('chatCtrl', ["$sce", "$scope", "chatServices","chatModel", "$stateParams",  function($sce, $scope, chatServices, chatModel, $stateParams) {
	$scope.submitText = function(lineText){
		chatModel.add(lineText);
		chatServices.sendText(lineText, $stateParams.channel_id);
	}
	$scope.chatLog = chatModel.getAll($stateParams.channel_id);

	$scope.$on('chat_backlog', function(event, data) {
		if(data != undefined){
			$scope.chatLog = chatModel.addChatBacklog(data);
		}
	})

	$scope.$on('send_text', function(event, data) {
		chatModel.add(data);
	})

}]);