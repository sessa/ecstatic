angular.module('ecstatic.camera')

.controller('CameraCtrl', ['$scope', 'cameraEventServices', 'cameraServices', '$ionicHistory', '$stateParams', function($scope, cameraEventServices, cameraServices, $ionicHistory, $stateParams) {
	// currently will only work in Chrome:
	// var blobURL;
	var video;
	$scope.recHold = false;
	console.log($scope.recHold);
	// var mediaRecorder;
	$scope.onDesktop;
	var file;

	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
  		console.log("we are not in browser");
  		$scope.onDesktop = false;
	} else {
  		console.log("we are in browser");
  		$scope.onDesktop = true;
	}
	
	if(!$scope.onDesktop){
		// david's code dont touch this mother fucker
		document.getElementById('fileinput').addEventListener('change', function(){
			file = this.files[0];
		}, false);
	}

	$scope.add = function() {
		console.log("going through add function");
		cameraServices.sendMobileVideo($stateParams.channel_id, file);
	}

	$scope.onRelease = function() {
		$scope.recHold = false;
		console.log($scope.recHold);
		cameraServices.endVideoClip();
	}
	$scope.onHold = function() {
		$scope.recHold = true;
		console.log($scope.recHold);
		cameraServices.startVideoClip();
	}
	$scope.sendVideo = function() {
		//check if there is anything to send form mobile
		if(cameraServices.getCurrentBlob()){
			cameraServices.sendVideo($stateParams.channel_id);
		}else if($scope.video){
			console.log("has mobile video");
			cameraServices.sendVideo($stateParams.channel_id, $scope.mobileVideo);
		}else{
			console.log("no video");
		}
		$ionicHistory.goBack();
	}

	// $scope.sendMobileVideo = function(video) {
	// 	console.log("Send Mobile Video Channel id: " + $stateParams.channel_id);
	// 	cameraServices.sendMobileVideo($stateParams.channel_id, video);
	// }

	$scope.showCamera = function () {
		cameraServices.cameraStart();

	}
	$scope.deleteClip = function () {
		video = document.getElementById('videoElement');
		video.src = "";
		cameraServices.deleteCurrentBlob();
		cameraServices.cameraStart();
	}

	cameraEventServices.listenVideoSource(function (event, source) {
		video = document.getElementById('videoElement');
		video.src = source;
		video.play();
	});

	if($scope.onDesktop){
		//what to do for desktop
		$scope.showCamera();
	}else{
		//what to do for mobile
	}
	

}]);