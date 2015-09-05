angular.module('ecstatic.videoplayer')

.controller('VideoCtrl', ["$scope", "$stateParams", "videoplayerServices", 'channelServices', 'videoEventServices', function($scope,  $stateParams, videoplayerServices, channelServices, videoEventServices) {

    videoEventServices.listen(function (event, cliplist){
        console.log("videoEventServices, cliplist="+JSON.stringify(cliplist));
        $scope.videoplayerServices.cliplist = cliplist;
        $scope.render();
    });

    $scope.render = function() {
        channelServices.getChannels().then(function (channels){
            $scope.videoplayerServices = videoplayerServices;
            $scope.showVideoplayer = false;
            var channel = channelServices.getChannel($stateParams.channel_id);
            if(videoplayerServices.getNumberOfActiveClips(channel.cliplist) !== 0){
                console.log("render cliplist");
                videoplayerServices.setChannel(channel);
                $scope.videoplayerServices = videoplayerServices;
                $scope.showVideoplayer = true;
            }
        });
    }
    $scope.render();
}])
