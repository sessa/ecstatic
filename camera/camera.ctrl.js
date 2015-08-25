angular.module('ecstatic.camera')

.controller('CameraCtrl', function($scope) {
	// currently will only work in Chrome:
	var blobURL;
	var cameraOn = false;
	var started = false;
	var video;
	var mediaRecorder;

	$scope.cameraButton = function() {
		if(cameraOn){
			if(started){
				started = false;
				console.log("Closing Video");
				$scope.endVideoClip();
				cameraOn = false;
			}else{
				started = true;
				console.log("Submitting Video");
				$scope.startVideoClip();
			}
		}else{
			console.log("Turning on Camera");
			//otherwise turn camera on and record
			$scope.cameraControl();
		}
	}

	$scope.initializeVideo = function () {
		video = document.getElementById('videoElement');
	}

	$scope.cameraControl = function() {
		
		window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia || window.navigator.msGetUserMedia || window.navigator.oGetUserMedia;
		console.log(window.navigator.getUserMedia);

		var success = function(stream){
			cameraOn = true;
			video = document.getElementById('videoElement');
	      	video.src = webkitURL.createObjectURL(stream);
	      	//Even if autoplay is true you need to call the play method
	      	video.play();

	      	mediaRecorder = new MediaStreamRecorder(stream);
			mediaRecorder.mimeType = 'video/webm';

		    mediaRecorder.width = 256;
		    mediaRecorder.height = 192;

		    mediaRecorder.ondataavailable = function (blob) {
		        // POST/PUT "Blob" using FormData/XHR2
		        blobURL = URL.createObjectURL(blob);
		    };

		}
		var error = function(err){
		      console.log(err)
		}

		window.navigator.getUserMedia({video: true}, success, error);
	}

	$scope.startVideoClip = function() {
		mediaRecorder.start(10000);
	}

	$scope.endVideoClip = function() {
		mediaRecorder.stop();
		video.src = blobURL;
		video.play();
	}


});