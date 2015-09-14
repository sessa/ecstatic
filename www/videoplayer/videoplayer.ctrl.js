angular.module('ecstatic.videoplayer')

.controller('VideoCtrl', ["$scope", "$stateParams", "videoplayerServices", 'channelServices', 'videoEventServices', function($scope,  $stateParams, videoplayerServices, channelServices, videoEventServices) {

    videoEventServices.listen(function (event, cliplist){
        console.log("videoEventServices, cliplist="+JSON.stringify(cliplist));
        $scope.videoplayerServices.cliplist = cliplist;
        $scope.render();
    });

    $scope.videoMessage = "no video yet :(";
    $scope.onDesktop;
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
        console.log("we are not in browser");
        $scope.onDesktop = false;
    } else {
        console.log("we are in browser");
        $scope.onDesktop = true;
    }
    $scope.onDesktop = false;

    $scope.render = function() {
        channelServices.getChannels().then(function (channels){
            $scope.videoplayerServices = videoplayerServices;
            $scope.showVideoplayer = false;
            var channel = channelServices.getChannel($stateParams.channel_id);
            console.log("videoplayer render");
            if(videoplayerServices.getNumberOfActiveClips(channel.cliplist) !== 0){
                console.log("active clips > 0");
                videoplayerServices.setChannel(channel);
                if($scope.onDesktop){
                    $scope.showVideoplayer = true;
                }else{
                    $scope.videoMessage = "Video Playback Support Coming to Mobile Soon :)";
                }
                $scope.videoplayerServices = videoplayerServices;
            }
        });
    }
    $scope.render();
}])
