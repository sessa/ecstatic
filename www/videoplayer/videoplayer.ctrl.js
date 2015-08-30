angular.module('ecstatic.videoplayer')

.controller('VideoCtrl',
	["$sce", "$scope", 'userNumberEventService', 'updatePlayerstateEventService', "$stateParams", "videoplayerServices","playerServices", "$state", "$timeout", 'channelServices', 'ConfigService', 'socket', function($sce, $scope, userNumberEventService, updatePlayerstateEventService, $stateParams, videoplayerServices, playerServices, $state, $timeout, channelServices, ConfigService, socket) {

        updatePlayerstateEventService.listen(function (event, playerstate){
            console.log("updatePlayerstateEventService, playerstate="+JSON.stringify(playerstate));
            $scope.videoplayerServices.cliplist = playerstate.cliplist;
            $scope.render();
        });

	    socket.on('send_video', function (data) {
    	    console.log("added video" + JSON.stringify(data));
            channelServices.getChannels().then(function (channels){
                var channel = channelServices.getChannel($stateParams.channel_id);
                channel.cliplist.push(data);
            });
	        //chatEventServices.broadcastText(data);
	    });

        $scope.videoplayerServices = videoplayerServices;
        // shows you the player if there is a playlist, everytime the page loads.
        $scope.render = function(){
            channelServices.getChannels().then(function (channels){
                var channel = channelServices.getChannel($stateParams.channel_id);
                $scope.numberOfUsers = Object.keys(channel.users).length;
                $scope.numberOfUsers = $scope.numberOfUsers-1;
                var cliplistLength = channel.cliplist.length;
                if(cliplistLength !== 0){
                    console.log("render");
                    videoplayerServices.setChannel(channel);
                    $scope.showVideoplayer = true;
                    $scope.videoplayerServices = videoplayerServices;
                }
            });
        }
        $scope.render();
}]);