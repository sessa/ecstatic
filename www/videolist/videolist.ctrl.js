angular.module('ecstatic.videolist')

.controller('videolistCtrl',
	['$sce', 'channelServices', '$stateParams', '$scope', '$state', 'playerServices', 'videoEventServices', function($sce, channelServices, $stateParams, $scope, $state, playerServices, videoEventServices) {
    channelServices.getChannels().then(function (channels){

        var channel = channelServices.getChannel($stateParams.channel_id);
        $scope.cliplist = [];

        for (var i = 0; i < channel.cliplist.length; i++){
        	var source = channel.cliplist[i];
        	var type = "video/" + source.format;
        	var cliplistDict = 
        		{src: $sce.trustAsResourceUrl("https://s3.amazonaws.com/ecstatic-videos/"+source.video_key), 
        		type: type,
        		video_key: source.video_key
        		};

        	$scope.cliplist.push(cliplistDict);
        }

		console.log("channel.cliplist"+JSON.stringify($scope.cliplist));
		console.log("channel"+JSON.stringify(channel));		
	});
    $scope.activateClip = function(clip){
        console.log("clip="+JSON.stringify(clip));
        channelServices.setActiveClip($stateParams.channel_id, clip);
    }
}])
