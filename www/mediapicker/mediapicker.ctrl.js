angular.module('ecstatic.mediapicker')

.controller('MediapickerCtrl', ['$window', '$scope', '$ionicLoading', 'soundcloudService', 'playerServices', 'channelServices', '$state', '$ionicActionSheet', '$timeout', function($window, $scope, $ionicLoading, soundcloudService, playerServices, channelServices, $state, $ionicActionSheet, $timeout) {
    var source;
    $scope.song_added = false;

    // Gets your likes from Soundcloud
    $ionicLoading.show({
        template: '<ion-spinner icon="android" class="spinner-light"></ion-spinner>'
    });
    setTimeout(function(){     
        soundcloudService.getFavorites().then(function(data){

            $ionicLoading.hide();
            $scope.sc = data;
        });
    }, 500);

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

        //Show Feedback for adding songs
        $scope.song_added = true;

        setTimeout(function() {
             $scope.song_added = false; 
             $scope.$apply();
         },3250);
    } 
}])



