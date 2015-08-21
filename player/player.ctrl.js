angular.module('ecstatic.player')

.controller('PlayerCtrl',
	["$sce", "$scope", '$rootScope', "$stateParams", "playerServices", "$state", "$timeout", 'channelServices', 'ConfigService',function($sce, $scope, $rootScope, $stateParams, playerServices, $state, $timeout, channelServices, ConfigService) {
        playerServices.channel_id = $stateParams.channel_id;
        $scope.addSongs = function() {
            $state.go('tab.channels-add');
        }
        $scope.updatePlayer = function(){
            channelServices.getChannels().then(function (channels){
                var channel = channelServices.getChannel(playerServices.channel_id);
                var playlistLength = channel.playlist.length;
                if(playlistLength !== 0){
                    $scope.showPlayer(channel);
                }
            });
        }
        $scope.showPlayer = function(channel){
            $scope.API = null;
            $scope.currentItem = channel.playlistIndex;
            $scope.autoplay = true;
            $scope.playlist = channel.playlist;
            $scope.sources = [];
            $scope.theme = "http://www.videogular.com/styles/themes/default/latest/videogular.css";
            $scope.trackTitle = channel.playlist[$scope.currentItem].title;
            $scope.trackUser = channel.playlist[$scope.currentItem].user.username;
            var source = $scope.playlist[$scope.currentItem];
            $scope.sources.push({src: $sce.trustAsResourceUrl(source.stream_url+"?client_id="+ConfigService.getConfig().soundcloudClientId), type: "audio/"+source.original_format});
            $scope.showPlayer = true;

            $scope.updateView = function() {
                $scope.trackTitle = channel.playlist[$scope.currentItem].title;
                $scope.trackUser = channel.playlist[$scope.currentItem].user.username;
            }

            $scope.onPlayerReady = function(API) {
                var track = $scope.playlist[$scope.currentItem];
                $scope.sources.push(track);
                $scope.API = API;
                var delta = (channel.requestTime - channel.timestamp)/1000;
                $scope.API.play();
                API.seekTime(delta, false);
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
                $scope.sources.push($scope.playlist[index]);
                $timeout($scope.API.play.bind($scope.API), 100);
            }
            $scope.nextSong = function() {
                $scope.onCompleteItem();
                localNextSong($scope);
                playerServices.nextSongAction($scope.currentItem, playerServices.channel_id);
            }
            $scope.$on('nextSong', function(event, data) {
                localNextSong($scope);
            });
        }
        $scope.updatePlayer();
	}]
)


function localNextSong($scope){
    $scope.isCompleted = true;
    $scope.updateView();
    if ($scope.currentItem >= $scope.playlist.length) $scope.currentItem= 0;
    $scope.setItem($scope.currentItem);

}

