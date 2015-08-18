angular.module('ecstatic.soundcloud')

.controller('SoundcloudCtrl', ['soundcloudService', '$scope',function(soundcloudService, $scope) {
    
    soundcloudService.getUser().then(function(data){
        $scope.sc = data;
    });

}]);