angular.module('ecstatic.chat')
//on receive messages display them

.controller('chatCtrl', ["$sce", "$scope",  function($sce, $scope) {
	$scope.submitText = function(lineText){
		console.log("Hey pal heres your text: " + lineText);
	}
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
