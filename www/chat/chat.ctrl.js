angular.module('ecstatic.chat')
//on receive messages display them

.controller('ChatCtrl', ['$state', "$sce", "$scope", "chatServices", "$stateParams", "cameraServices","chatEventServices", 'channelServices', "$ionicScrollDelegate", function($state, $sce, $scope, chatServices, $stateParams,cameraServices, chatEventServices,channelServices, $ionicScrollDelegate) {
	$scope.chatLog = chatServices.getChatBacklog($stateParams.channel_id);
	$scope.channel_id = $stateParams.channel_id;
	$scope.textPrompt = chatServices.getTextPrompt();
	$scope.username = "";
    channelServices.joinChannel($stateParams.channel_id);

	$scope.goToVideolist = function(){
		$state.go('tab.channels-videolist');
	}

	$scope.getUrl = function (initial_url) {
      console.log("https://s3.amazonaws.com/ecstatic-videos" + initial_url);
      return $sce.trustAsResourceUrl("https://s3.amazonaws.com/ecstatic-videos/" + initial_url);
    }

	$scope.sendText = function(lineText) {
		//if there is anything to send, then send it.
		if(lineText){
			chatServices.sendText(lineText, $stateParams.channel_id);
		}
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

	//get the backlog of chat after pageload
	chatEventServices.listenBacklog(function (event, backlog) {
		$scope.chatLog = backlog;
		$ionicScrollDelegate.scrollBottom();
	});

	//re-render the chatlog with new text
	chatEventServices.listenText(function (event, text) {
		$scope.chatlog = chatServices.getChatBacklog($stateParams.channel_id);
		$ionicScrollDelegate.scrollBottom();
	});

	chatEventServices.listenName(function (event, name) {
		$scope.username = name;
		$scope.textPrompt = chatServices.getTextPrompt();
	});


}]);



