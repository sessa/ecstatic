angular.module('ecstatic.videoplayer')

.controller('VideoCtrl', ["$scope", "$stateParams", "videoplayerServices", 'channelServices', 'videoEventServices', 'videoVisibleEventServices', function($scope,  $stateParams, videoplayerServices, channelServices, videoEventServices, videoVisibleEventServices) {

        // $scope.hidden = true;
        // $scope.hidden2 = false;

        videoVisibleEventServices.listenVisibleVideo(function (event, video_visible) {
            if(video_visible == 0){
                console.log("video changed to 0");
                $scope.hidden = false;
                $scope.hidden2 = true;
            }else{
                console.log("video changed to 1");
                $scope.hidden = true;
                $scope.hidden2 = false;
            }
        });


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
            $scope.cliplistLength = channel.cliplist.length;
            console.log("render, cliplistLength="+$scope.cliplistLength);
            if($scope.cliplistLength !== 0){
                console.log("render cliplist");
                videoplayerServices.setChannel(channel);
                $scope.showVideoplayer = true;
                $scope.videoplayerServices = videoplayerServices;
            }
        });
    }
    $scope.render();
}])
