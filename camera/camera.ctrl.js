angular.module('ecstatic.camera')

.controller('CameraCtrl', function($scope, MediaStreamRecorder) {
	// currently will only work in Chrome:
	$scope.cameraControl = function() {
		console.log("running camera");
		window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia || window.navigator.msGetUserMedia || window.navigator.oGetUserMedia;
		console.log(window.navigator.getUserMedia);
		var success = function(stream){

	      	var video = document.getElementById('videoElement');
	      	video.src = webkitURL.createObjectURL(stream);
	      	//Even if autoplay is true you need to call the play method
	      	video.play();

	      	var mediaRecorder = new MediaStreamRecorder(stream);
			mediaRecorder.mimeType = 'video/webm';

		    mediaRecorder.width = 256;
		    mediaRecorder.height = 192;

		    mediaRecorder.ondataavailable = function (blob) {
		        // POST/PUT "Blob" using FormData/XHR2
		        var blobURL = URL.createObjectURL(blob);
		        document.write('<a href="' + blobURL + '">' + blobURL + '</a>');
		    };
		    mediaRecorder.start(3000);

		}
		var error = function(err){
		      console.log(err)
		    }
		window.navigator.getUserMedia({video: true}, success, error);
	}
})