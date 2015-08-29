angular.module('ecstatic.camera')

.controller('CameraCtrl', ['$scope', 'cameraEventServices', 'cameraServices', function($scope, cameraEventServices, cameraServices) {
	// currently will only work in Chrome:
	// var blobURL;
	var cameraOn = false;
	var started = false;
	var video;
	$scope.hide = false;
	// var mediaRecorder;

	$scope.cameraButton = function() {
		if(cameraOn){
			if(started){
				started = false;
				console.log("Closing Video");
				cameraServices.endVideoClip();
				$scope.hide = true;
				console.log("scope.hide changed");
			}else{
				started = true;
				console.log("Submitting Video");
				cameraServices.startVideoClip();
			}
		}else{
			console.log("Turning on Camera");
			$scope.initializeVideo();
			cameraServices.cameraStart();
		}
	}

	$scope.initializeVideo = function () {
		video = document.getElementById('videoElement');
	}

	cameraEventServices.listenVideoSource(function (event, source) {
		cameraOn = true;
		video.src = source;
		video.play();
		$scope.hide = true;
	});

}]);