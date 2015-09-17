angular.module('ecstatic.camera')

.controller('CameraCtrl', ['$scope', 'cameraEventServices', 'cameraServices', '$ionicHistory', '$stateParams', '$ionicHistory', function($scope, cameraEventServices, cameraServices, $ionicHistory, $stateParams, $ionicHistory) {
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
		document.getElementById('fileinput').addEventListener('change', function(){
			file = this.files[0];
			$scope.add();
		}, false);
	}

	$scope.add = function() {
		console.log("going through add function");
		cameraServices.sendMobileVideo($stateParams.channel_id, file);
		$ionicHistory.goBack(); 
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
				console.log("printing shit");

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
		console.log("show cam");
		$scope.showCamera();
	}else{
		//what to do for mobile
	}
	

}]);