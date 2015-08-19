angular.module('ecstatic.chat')
//on receive messages display them

.controller('chatCtrl', ["$sce", "$scope", "chatServices","chatModel", "$stateParams",  function($sce, $scope, chatServices, chatModel, $stateParams) {
	$scope.submitText = function(lineText){
		console.log("We are submitting the text in chat.ctrl.js");
		chatModel.add(lineText);
		chatServices.sendText(lineText, $stateParams.channel_id);
		$scope.chatLog = chatModel.getAll();
	}
	$scope.chatLog = chatModel.getAll();
	$scope.$on('send_text', function(event, data) {
		console.log("We got an 'on' message in chat.ctrl.js");
		chatModel.add(lineText);
	})

}]);