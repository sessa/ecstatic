angular.module('ecstatic.player')

.controller('PlayerCtrl',
	['countdownEventService', "$sce", "$scope", 'userNumberEventService', 'updatePlayerstateEventService', "$stateParams", "playerServices", "$state", "$timeout", 'channelServices', 'ConfigService', function(countdownEventService, $sce, $scope, userNumberEventService, updatePlayerstateEventService, $stateParams, playerServices, $state, $timeout, channelServices, ConfigService) {
        $scope.$watch('dataReady',function(ready){
            if (ready){ startController(); }
        });

        function startController(){
            var channel = channelServices.getChannel($stateParams.channel_id);
            $scope.numberOfUsers = Object.keys(channel.users).length;
            $scope.numberOfUsers = $scope.numberOfUsers-1;
            var playlistLength = channel.playlist.length;
            console.log("render");
            if(playlistLength !== 0 && $scope.countdownFinished){
                console.log("render playlistLength !== 0");
                playerServices.setChannel(channel);
                $scope.showPlayer = true;
                $scope.playerServices = playerServices;
            }
        }
    

        channelServices.joinChannel($stateParams.channel_id);
        userNumberEventService.listen(function (event, userNumber){
            $scope.numberOfUsers = userNumber;
        });
        countdownEventService.listen(function(event){
            console.log("countdownFinished");
            $scope.countdownFinished = true;
            $scope.render();
        });
        updatePlayerstateEventService.listen(function (event, playerstate){
            console.log("updatePlayerstateEventService, playerstate="+JSON.stringify(playerstate));
            $scope.playerServices.playlist = playerstate.playlist;
            $scope.render();
        });
        $scope.addSongs = function() {
            $state.go('app.channels-add');
        }
        $scope.playerServices = playerServices;
        // shows you the player if there is a playlist, everytime the page loads.
        
        $scope.nextSong = function() {
            console.log("nextSong Action, $scope.playerServices.currentItem"+$scope.playerServices.currentItem);
            $scope.playerServices.onCompleteItem();
            playerServices.nextSongAction($scope.playerServices.currentItem, $stateParams.channel_id);

        }

        $scope.$on('nextSong', function(event, data) {
            $scope.playerServices.onCompleteItem();
            $scope.playerServices.setItem(playerServices.currentItem);
        });
    }]
)




