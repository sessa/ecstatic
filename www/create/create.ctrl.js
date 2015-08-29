angular.module('ecstatic.create')

.controller('CreateChannelCtrl', ['$scope', 'soundcloudService', 'channelServices', '$state', function($scope, soundcloudService, channelServices, $state) {

    $scope.create_channel = function(channelName) {
        channelServices.createChannel(channelName).then(function(data) {
            $state.go('tab.channels-player', {channel_id:data.player_state.channel_id});
        });
    }
    
}])
