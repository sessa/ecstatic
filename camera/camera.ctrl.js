angular.module('ecstatic.camera')

.controller('CameraCtrl', function($scope) {
	$scope.cameraControl = function() {
		console.log("running camera");
		window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia || window.navigator.msGetUserMedia || window.navigator.oGetUserMedia;
		console.log(window.navigator.getUserMedia);
		var success = function(stream){
		      var video = document.getElementById('videoElement');
		      video.src = webkitURL.createObjectURL(stream);
		      //Even if autoplay is true you need to call the play method
		      video.play();
		    }
		var error = function(err){
		      console.log(err)
		    }
		window.navigator.getUserMedia({video: true}, success, error);
	}
})