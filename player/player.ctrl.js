angular.module('ecstatic.player')

.controller('PlayerCtrl',
	["$sce", "$scope", 'userNumberEventService', 'updatePlayerstateEventService', "$stateParams", "playerServices", "$state", "$timeout", 'channelServices', 'ConfigService', "showPlayerServices", function($sce, $scope, userNumberEventService, updatePlayerstateEventService, $stateParams, playerServices, $state, $timeout, channelServices, ConfigService, showPlayerServices) {
        playerServices.channel_id = $stateParams.channel_id;
        channelServices.joinChannel(playerServices.channel_id);
        userNumberEventService.listen(function (event, userNumber){
            $scope.numberOfUsers = userNumber;
        });
        updatePlayerstateEventService.listen(function (event, playerstate){
            console.log("updatePlayerstateEventService, playerstate="+JSON.stringify(playerstate));
            $scope.playlist = playerstate.playlist;
        });

        $scope.addSongs = function() {
            $state.go('tab.channels-add');
        }
        // shows you the player if there is a playlist, everytime the page loads.
        $scope.render = function(){
            channelServices.getChannels().then(function (channels){
                var channel = channelServices.getChannel(playerServices.channel_id);
                $scope.numberOfUsers = Object.keys(channel.users).length;
                var playlistLength = channel.playlist.length;
                if(playlistLength !== 0){
                    showPlayerServices(channel);
                }
            });
        }

        $scope.render();
    }]
)


/*
.controller('ShowPlayerCtrl',
    ["$sce", "$scope", 'userNumberEventService', 'updatePlayerstateEventService', "$stateParams", "playerServices", "$state", "$timeout", 'channelServices', 'ConfigService',function($sce, $scope, userNumberEventService, updatePlayerstateEventService, $stateParams, playerServices, $state, $timeout, channelServices, ConfigService) {

        $scope.showPlayer = function(channel){

            $scope.API = null;
            $scope.currentItem = channel.playlistIndex;
            $scope.autoplay = true;
            $scope.playlist = channel.playlist;
            $scope.sources = [];
            $scope.theme = "http://www.videogular.com/styles/themes/default/latest/videogular.css";
            $scope.showPlayer = true;

            $scope.onLoadMetaData = function(evt) {
                $scope.API.seekTime($scope.delta, false);
                $scope.API.mediaElement[0].removeEventListener("loadedmetadata", this.onLoadMetaData.bind(this), false);
            }
            $scope.onPlayerReady = function(API) {
                $scope.API = API;
                $scope.API.mediaElement[0].addEventListener("loadedmetadata", this.onLoadMetaData.bind(this), false);
                $scope.setItem($scope.currentItem);
                $scope.delta = (channel.requestTime - channel.timestamp)/1000;
            }
            $scope.onCompleteItem = function() {
                $scope.isCompleted = true;
                $scope.currentItem++;
                if ($scope.currentItem >= $scope.playlist.length) $scope.currentItem= 0;
                $scope.setItem($scope.currentItem);
            }
            $scope.setItem = function(index) {
                $scope.API.stop();
                $scope.currentItem = index;
                $scope.sources = [];
                var source = $scope.playlist[$scope.currentItem];
                console.log("setItem, $source="+JSON.stringify(source));
                $scope.sources.push({src: $sce.trustAsResourceUrl(source.stream_url+"?client_id="+ConfigService.getConfig().soundcloudClientId), type: "audio/"+source.original_format});
                $scope.trackTitle = $scope.playlist[$scope.currentItem].title;
                $scope.trackUser = $scope.playlist[$scope.currentItem].user.username;
                $timeout($scope.API.play.bind($scope.API), 100);
            }
            $scope.nextSong = function() {
                console.log("nextSong Action");
                $scope.onCompleteItem();
                $scope.setItem($scope.currentItem);
                playerServices.nextSongAction($scope.currentItem, playerServices.channel_id);
            }
            $scope.$on('nextSong', function(event, data) {
                $scope.onCompleteItem();
                $scope.setItem($scope.currentItem);
            });
        }
    	}]
)
*/

