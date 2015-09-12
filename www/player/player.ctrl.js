angular.module('ecstatic.player')

.controller('PlayerCtrl',
	['countdownEventService', "$sce", "$scope", 'userNumberEventService', 'updatePlayerstateEventService', "$stateParams", "playerServices", "$state", "$timeout", 'channelServices', 'ConfigService', function(countdownEventService, $sce, $scope, userNumberEventService, updatePlayerstateEventService, $stateParams, playerServices, $state, $timeout, channelServices, ConfigService) {
        
        userNumberEventService.listen(function (event, userNumber){
            $scope.numberOfUsers = userNumber;
        });

        countdownEventService.listen(function(event){
            console.log("countdownFinished");
            $scope.countdownFinished = true;
            startController();
        });

        updatePlayerstateEventService.listen(function (event, playerstate){
            console.log("updatePlayerstateEventService, playerstate="+JSON.stringify(playerstate));
            $scope.playerServices.playlist = playerstate.playlist;
            startController();
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

        function startController(){

            var channel = channelServices.getChannel($stateParams.channel_id);
            var playlistLength = channel.playlist.length;
            if(playlistLength !== 0 && $scope.countdownFinished){
                playerServices.setChannel(channel);
                $scope.playerServices = playerServices;
                $scope.showPlayer = true;
            }
        }
        $scope.$watch('dataReady',function(ready){
            if (ready){ startController(); }
        });

    }]
)




