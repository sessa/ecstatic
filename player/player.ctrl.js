angular.module('ecstatic.player')

.controller('PlayerCtrl',
	["$sce", "$scope", '$rootScope', "$stateParams", "playerServices", "$state", "$timeout", 'channelServices', function($sce, $scope, $rootScope, $stateParams, playerServices, $state, $timeout, channelServices) {
        playerServices.channel_id = $stateParams.channel_id;
        $scope.addSongs = function() {
            console.log("hello");
            $state.go('tab.channels-add');
        }
        $scope.getPlaylist = function(){
            channelServices.getPlaylist(playerServices.channel_id).then(function (playlist){
                // channelServices.joinChannel($stateParams.channel_id);
                if(playlist){
                    $scope.showPlayer = false;
                    /*channelServices.getChannels().then(function (data){
                        console.log("channelbang data="+JSON.stringify(data.channelList));
                        for(var index = 0; index < data.channelList.length; index++){
                            var player_state = data.channelList[index].player_state;
                            if(player_state.channel_id == $stateParams.channel_id){
                                console.log("2 player_state="+JSON.stringify(player_state));
                                createController(this, player_state, $sce, $scope, $rootScope, $stateParams, channelModel, playerService, $timeout);
                                break;
                            }
                        }
                    });*/
                }
                else{
                    $scope.getPlayerState();
                }
            });
        }
        $scope.getPlayerState = function(){
            channelServices.getPlayerState(playerServices.channel_id).then( function(player_state){
                $scope.showPlayer = true;
                $scope.API = null;
                $scope.currentItem = player_state.playlistIndex;
                $scope.autoplay = true;
                $scope.playlist = playlist;
                $scope.sources = [];
                $scope.theme = "http://www.videogular.com/styles/themes/default/latest/videogular.css";
                $scope.trackTitle = channelServices.soundcloudResources[$scope.currentItem].title;
                $scope.trackUser = channelServices.soundcloudResources[$scope.currentItem].user.username;

                $scope.updateView = function() {
                    $scope.trackTitle = playerService.soundcloudResources[$scope.currentItem].title;
                    $scope.trackUser = playerService.soundcloudResources[$scope.currentItem].user.username;
                }

                $scope.onPlayerReady = function(API) {
                    var track = $scope.playlist[$scope.currentItem];
                    console.log("track="+track);
                    $scope.sources.push(track);
                    console.log("$scope.sources="+JSON.stringify($scope.sources));
                    $scope.API = API;
                    var delta = (player_state.requestTime - player_state.timestamp)/1000;
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

                    localNextSong($scope);
                    playerService.nextSongAction($scope.currentItem, $stateParams.channel_id);
                }
                $scope.$on('nextSong', function(event, data) {
                    localNextSong($scope);
                });
            });
        }
        $scope.getPlaylist();
	}]
)


function localNextSong($scope){
    $scope.isCompleted = true;
    $scope.currentItem++;
    $scope.updateView();
    if ($scope.currentItem >= $scope.playlist.length) $scope.currentItem= 0;
    $scope.setItem($scope.currentItem);

}

