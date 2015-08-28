angular.module('ecstatic.camera')

.factory('cameraServices', function(cameraEventServices) {
	var Service = {};

	var mediaRecorder;
	var videoSource;
	var videoClipURL;
	var vidHeight = 192;
	var vidWidth = 256;

	Service.cameraStart = function() {
		window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia || window.navigator.msGetUserMedia || window.navigator.oGetUserMedia;

		var success = function(stream){
			//setup the streaming video source and return it
	      	videoSource = webkitURL.createObjectURL(stream);
	      	cameraEventServices.broadcastVideoSource(videoSource);

	      	//set up the recording feature
	      	mediaRecorder = new MediaStreamRecorder(stream);
			mediaRecorder.mimeType = 'video/webm';

		    // mediaRecorder.width = vidHeight;
		    // mediaRecorder.height = vidWidth;

		    //callback for mediaRecorder when it is done processing
		    mediaRecorder.ondataavailable = function (blob) {
		        videoClipURL = URL.createObjectURL(blob);
		        cameraEventServices.broadcastVideoSource(videoClipURL);
		        mediaRecorder.stop();
		    };

		}

		var error = function(err){
		      console.log(err)
		}

		//start streaming
		window.navigator.getUserMedia({video: true}, success, error);
	}

	Service.startVideoClip = function() {
		mediaRecorder.clearOldRecordedFrames()
		cameraEventServices.broadcastVideoSource(videoSource);
		mediaRecorder.start(10000);
	}

	Service.endVideoClip = function() {
		mediaRecorder.stop();
		cameraEventServices.broadcastVideoSource(videoClipURL);
	}

	Service.submitVideoClip = function() {
		var returnTempClip = blobURL;
		mediaRecorder.clearOldRecordedFrames();
		video.stop();
		return returnTempClip;
	}

	Service.getCurrentVideoClip = function() {
		console.log("returning video");
		if(videoClipURL){
			return videoClipURL;
		}else{
			return;
			// return {};
		}
	}

	cameraEventServices.listenCameraStart( function (event, video) {
		console.log("here");
		Service.cameraStart(video);
	});

	//var video

	//function getVideo()

	//save Video(video)

	return Service;
})

.service("cameraEventServices", function($rootScope) {
	this.broadcastVideoSource = function(source) {$rootScope.$broadcast("video_source", source);}
	this.listenVideoSource = function(callback) {$rootScope.$on("video_source", callback);}
	this.broadcastCameraStart = function(video) {$rootScope.$broadcast("camera_start", video);}
	this.listenCameraStart = function(callback) {$rootScope.$on("camera_start", callback);}
});