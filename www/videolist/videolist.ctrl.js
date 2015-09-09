angular.module('ecstatic.videolist')

.controller('videolistCtrl',
	['$sce', 'channelServices', '$stateParams', '$scope', function($sce, channelServices, $stateParams, $scope) {
    channelServices.getChannels().then(function (channels){

        var channel = channelServices.getChannel($stateParams.channel_id);
        $scope.cliplist = [];

        for (var i = 0; i < channel.cliplist.length; i++){
        	var source = channel.cliplist[i];
        	var cliplistDict = 
        		{src: $sce.trustAsResourceUrl("https://s3.amazonaws.com/ecstatic-videos/"+source.video_key), 
        		format: source.format,
        		video_key: source.video_key,
                hasVideo:true,
                isActive:source.isActive
        		};

        	$scope.cliplist.push(cliplistDict);
        }

		console.log("channel.cliplist"+JSON.stringify($scope.cliplist));
		console.log("channel"+JSON.stringify(channel));		
	});
    $scope.toggleClip = function(clip){
        console.log("clip="+JSON.stringify(clip));
        channelServices.toggleClip($stateParams.channel_id, clip);
    }
}])
