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
