angular.module('ecstatic.mediapicker')

.controller('MediapickerCtrl', ['$window', '$scope', 'soundcloudService', 'playerServices', 'channelServices', '$state', '$ionicActionSheet', '$timeout', function($window, $scope, soundcloudService, playerServices, channelServices, $state, $ionicActionSheet, $timeout) {
    var source;
    $scope.song_added = false;

    // Gets your likes from Soundcloud
    soundcloudService.getFavorites().then(function(data){
        $scope.sc = data;
    });


    // Show a menu when you choose a song from Soundcloud
    $scope.mediapicker_actionsheet = function(source) {
           source = source;
           var hideSheet = $ionicActionSheet.show({
             titleText: 'Modify the playlist',
             buttons: [
               { text: 'Add this song' }
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
                }
             }
           });

    }

    $scope.add_to_playlist = function(source){
        channelServices.addToPlaylist(playerServices.channel_id, source);
        console.log("added to playlist");
        $scope.song_added = true;
        setTimeout(function() {console.log("timer over"); $scope.song_added = false; console.log("timer over"); $scope.$apply();},3250);
        
        
    } 
}])



