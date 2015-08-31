angular.module('ecstatic.camera')

.controller('CameraCtrl', ['$scope', 'cameraEventServices', 'cameraServices', function($scope, cameraEventServices, cameraServices) {
	// currently will only work in Chrome:
	// var blobURL;
	var video;
	$scope.hide = false;
	// var mediaRecorder;

	$scope.onRelease = function() {
		cameraServices.endVideoClip();
	}
	$scope.onHold = function() {
		cameraServices.startVideoClip();
	}
	$scope.sendVideo = function() {
		cameraServices.sendVideo();
	}
	$scope.showCamera = function () {
		cameraServices.cameraStart();
	}
	$scope.deleteClip = function () {
		video = document.getElementById('videoElement');
		video.src = "";
		cameraServices.deleteCurrentBlob();
	}

	cameraEventServices.listenVideoSource(function (event, source) {
		video = document.getElementById('videoElement');
		video.src = source;
		video.play();
		$scope.hide = true;
	});

}]);