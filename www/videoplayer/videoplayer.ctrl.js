angular.module('ecstatic.videoplayer')

.controller('VideoCtrl', ["$scope", "$stateParams", "videoplayerServices", 'channelServices', 'videoEventServices', 'videoVisibleEventServices', function($scope,  $stateParams, videoplayerServices, channelServices, videoEventServices, videoVisibleEventServices) {

        $scope.hide_video_one = false;
        $scope.hide_video_two = true;

        videoEventServices.listen(function (event, cliplist){
            $scope.videoplayerServices.cliplist = cliplist;
            $scope.render();
        });

        videoVisibleEventServices.listenVisibleVideo(function (event, video_visible) {

            if(video_visible == 0){
                $scope.hide_video_one = false;
                $scope.hide_video_two = true;
            }else{
                $scope.hide_video_two = false;
                $scope.hide_video_one = true;
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
