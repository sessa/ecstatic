angular.module('ecstatic.player')

.controller('PlayerCtrl',
	["$sce", "$scope", 'userNumberEventService', 'updatePlayerstateEventService', "$stateParams", "playerServices", "$state", "$timeout", 'channelServices', 'ConfigService', function($sce, $scope, userNumberEventService, updatePlayerstateEventService, $stateParams, playerServices, $state, $timeout, channelServices, ConfigService) {
        playerServices.channel_id = $stateParams.channel_id;
        channelServices.joinChannel(playerServices.channel_id);
        userNumberEventService.listen(function (event, userNumber){
            $scope.numberOfUsers = userNumber;
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
        $scope.render = function(){
            channelServices.getChannels().then(function (channels){
                var channel = channelServices.getChannel(playerServices.channel_id);
                $scope.numberOfUsers = Object.keys(channel.users).length;
                $scope.numberOfUsers = $scope.numberOfUsers-1;
                var playlistLength = channel.playlist.length;
                console.log("render")
                if(playlistLength !== 0){
                    console.log("render playlistLength !== 0");
                    playerServices.setChannel(channel);
                    $scope.showPlayer = true;
                    $scope.playerServices = playerServices;
                }
            });
        }
        
        $scope.nextSong = function() {
            console.log("nextSong Action, $scope.playerServices.currentItem"+$scope.playerServices.currentItem);
            $scope.playerServices.onCompleteItem();
            playerServices.nextSongAction($scope.playerServices.currentItem, playerServices.channel_id);

        }

        $scope.$on('nextSong', function(event, data) {
            $scope.playerServices.onCompleteItem();
            $scope.playerServices.setItem(playerServices.currentItem);
        });

        $scope.render();




    }]
)




