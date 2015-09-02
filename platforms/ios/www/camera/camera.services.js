angular.module('ecstatic.camera')

.factory('cameraServices', function(cameraEventServices, playerServices, socketManager) {
	var Service = {};

	var mediaRecorder;
	var videoSource;
	var videoClipURL;
	var current_blob;
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

		    //callback for mediaRecorder when it is done processing
		    mediaRecorder.ondataavailable = function (blob) {
		    	//save current video buffer as blob
		    	current_blob = blob;
		    	//for chat window, create local http link to clip and broadcast this
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
		cameraEventServices.broadcastVideoSource(videoSource);
		mediaRecorder.start(10000);
	}

	Service.endVideoClip = function() {
		mediaRecorder.stop();
		cameraEventServices.broadcastVideoSource(videoClipURL);
	}

	Service.deleteCurrentBlob = function() {
		current_blob = "";

	}
	Service.getCurrentBlob = function() {
		if(current_blob)
			return current_blob;
		else
			return;
	}

	Service.sendVideo = function() {
      var request = {
        msg: "send_video",
        channel_id: playerServices.channel_id,
        username: Service.username,
        video_key: "" + Service.username + "_" + (new Date()).getTime() + ".webm",
        video: Service.getCurrentBlob(),
        hasVideo: true,
      }

      var promise = socketManager.sendRequest(request); 
      return promise;
    }

	cameraEventServices.listenCameraStart( function (event, video) {
		console.log("here");
		Service.cameraStart(video);
	});

	return Service;
})

.service("cameraEventServices", function($rootScope) {
	this.broadcastVideoSource = function(source) {$rootScope.$broadcast("video_source", source);}
	this.listenVideoSource = function(callback) {$rootScope.$on("video_source", callback);}
	this.broadcastCameraStart = function(video) {$rootScope.$broadcast("camera_start", video);}
	this.listenCameraStart = function(callback) {$rootScope.$on("camera_start", callback);}
});