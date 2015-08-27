angular.module('ecstatic.mediapicker')

.controller('AddSongsCtrl', ['$scope', 'soundcloudService', 'playerServices', 'channelServices', '$state', '$ionicActionSheet', '$timeout', function($scope, soundcloudService, playerServices, channelServices, $state, $ionicActionSheet, $timeout) {

    var source;
    $scope.song_added = false;

    // Gets your likes from Soundcloud
    soundcloudService.getFavorites().then(function(data){
        $scope.sc = data;
    });

    $scope.mediapicker_actionsheet = function(source) {
        // Show the action sheet
           source = source;
           var hideSheet = $ionicActionSheet.show({
             titleText: 'Modify your album',
             buttons: [
               { text: 'Play next' },
               { text: 'Move' }
             ],
             cancelText: 'Cancel',

             cancel: function() {
                  hideSheet();
                },
             buttonClicked: function(index) {
                switch(index){
                    case 0 :
                        $scope.add_to_playlist(source);
                        return true;
                    case 1 :
                        return true;
                }
             }
           });

    }

    $scope.add_to_playlist = function(source){
        channelServices.addToPlaylist(playerServices.channel_id, source);
        console.log("added to playlist");
        $scope.song_added = true;
    } 
}])



