angular.module('ecstatic.chat')
//on receive messages display them

.controller('chatCtrl', ["$sce", "$scope", "socketManager", "$stateParams",  function($sce, $scope, socketManager, $stateParams) {
	$scope.submitText = function(lineText){
		socketManager.sendText(lineText, $stateParams.channel_id);
	}

	$scope.$on('send_text', function(event, data) {
		console.log("in controller, getting sent text " + data);

	})
}]
);
		
		//listen for new messages
        /*$scope.$on('nextSong', function(event, data) {
        	console.log("heard nextSong in ctrl");
        	localNextSong(controller);
        });
	}]*/

	// $scope.$on('chatBacklog' function(event, data) {
	// 	console.log("heard get chat backlog");
	// });