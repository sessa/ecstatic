angular.module('ecstatic.mediapicker')


.controller('AddSongsCtrl', ['$scope', 'soundcloudService', 'playerServices', 'channelServices', '$state', function($scope, soundcloudService, playerServices, channelServices, $state) {
    // Gets your likes from Soundcloud
    soundcloudService.getFavorites().then(function(data){
        $scope.sc = data;
    });

    $scope.submit = function() {
        $state.go('tab.channels-player', {channel_id: playerServices.channel_id}, {reload: true, notify:true});
    }

    $scope.add_to_playlist = function(source){
        channelServices.addToPlaylist(playerServices.channel_id, source);
    }
}])