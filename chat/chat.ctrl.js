angular.module('ecstatic.chat')
//on receive messages display them

.controller('chatCtrl', ["$sce", "$scope", "chatServices", "$stateParams",  function($sce, $scope, chatServices, $stateParams) {
	$scope.submitText = function(lineText){
		chatServices.sendText(lineText, $stateParams.channel_id);
	}

	$scope.$on('send_text', function(event, data) {
		console.log("in controller, getting sent text " + data);
	})

}]);