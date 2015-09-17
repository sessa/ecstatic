angular.module('ecstatic.videoplayer')

.controller('VideoCtrl', ["$scope", "$stateParams", "videoplayerServices", 'channelServices', 'videoEventServices', function($scope,  $stateParams, videoplayerServices, channelServices, videoEventServices) {

    videoEventServices.listen(function (event, cliplist){
        console.log("videoEventServices, cliplist="+JSON.stringify(cliplist));
        $scope.videoplayerServices.cliplist = cliplist;
        $scope.render();
    });

    $scope.videoMessage = "no video yet :(";
    // $scope.onDesktop;
    // if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
    //     $scope.onDesktop = false;
    // } else {
    //     $scope.onDesktop = true;
    // }

    $scope.render = function() {
        channelServices.getChannels().then(function (channels){
            $scope.videoplayerServices = videoplayerServices;
            $scope.showVideoplayer = false;
            var channel = channelServices.getChannel($stateParams.channel_id);
            console.log("videoplayer render");
            if(videoplayerServices.getNumberOfActiveClips(channel.cliplist) !== 0){
                console.log("active clips > 0");
                videoplayerServices.setChannel(channel);
                $scope.showVideoplayer = true;
                $scope.videoplayerServices = videoplayerServices;
            }
        });
    }
    $scope.render();
}])
