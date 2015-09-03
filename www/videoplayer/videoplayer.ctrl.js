angular.module('ecstatic.videoplayer')

.controller('VideoCtrl',
	["$sce", "$scope", 'userNumberEventService', 'updatePlayerstateEventService', "$stateParams", "videoplayerServices","playerServices", "$state", "$timeout", 'channelServices', 'ConfigService', 'socket', function($sce, $scope, userNumberEventService, updatePlayerstateEventService, $stateParams, videoplayerServices, playerServices, $state, $timeout, channelServices, ConfigService, socket) {

	    socket.on('send_video', function (data) {
    	    // console.log("added video" + JSON.stringify(data));
            channelServices.getChannels().then(function (channels){
                var channel = channelServices.getChannel($stateParams.channel_id);
                videoplayerServices.setChannel(channel);
                if($scope.cliplistLength == 0){
                    $scope.render();
                }
            });
	    });

        $scope.videoplayerServices = videoplayerServices;
        // shows you the player if there is a playlist, everytime the page loads.
        $scope.render = function(){
            channelServices.getChannels().then(function (channels){
                var channel = channelServices.getChannel($stateParams.channel_id);
                $scope.numberOfUsers = Object.keys(channel.users).length;
                $scope.numberOfUsers = $scope.numberOfUsers-1;
                $scope.cliplistLength = channel.cliplist.length;
                if($scope.cliplistLength !== 0){
                    console.log("render");
                    videoplayerServices.setChannel(channel);
                    $scope.showVideoplayer = true;
                    $scope.videoplayerServices = videoplayerServices;
                }
            });
        }
        $scope.render();
}])
.service("videoEventServices", function ($rootScope){
    this.broadcast = function(data) {$rootScope.$broadcast("videoAdded", data)}
    this.listen = function(callback) {$rootScope.$on("videoAdded",callback)}
})
