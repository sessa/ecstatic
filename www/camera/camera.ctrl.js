angular.module('ecstatic.camera')

.controller('CameraCtrl', ['$scope', 'cameraEventServices', 'cameraServices', '$ionicHistory', function($scope, cameraEventServices, cameraServices, $ionicHistory) {
	// currently will only work in Chrome:
	// var blobURL;
	var video;
	$scope.recHold = false;
	console.log($scope.recHold);
	// var mediaRecorder;
	var file;
	
	document.getElementById('fileinput').addEventListener('change', function(){
		file = this.files[0];
		console.log("name : " + file.name);
		console.log("size : " + file.size);
		console.log("type : " + file.type);
		console.log("date : " + file.lastModified);
	}, false);

	$scope.add = function() {
		cameraServices.sendMobileVideo(file);
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
			cameraServices.sendVideo();
		}else if($scope.video){
			console.log("has mobile video");
			cameraServices.sendVideo($scope.mobileVideo);
		}else{
			console.log("no video");
		}
		$ionicHistory.goBack();
		console.log("i didnt navigate!");
	}

	$scope.sendMobileVideo = function(video) {
		cameraServices.sendMobileVideo(video);
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
	});
	$scope.showCamera();

}]);