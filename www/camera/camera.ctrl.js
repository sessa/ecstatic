angular.module('ecstatic.camera')

.controller('CameraCtrl', ['$scope', 'cameraEventServices', 'cameraServices', function($scope, cameraEventServices, cameraServices) {
	// currently will only work in Chrome:
	// var blobURL;
	var video;
	$scope.hide = false;
	$scope.recHold = false;
	console.log($scope.recHold);
	// var mediaRecorder;

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
		//check if there is anything to send.
		if(cameraServices.getCurrentBlob()){
			cameraServices.sendVideo();
		}
	}
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
		$scope.hide = true;
	});


}]);