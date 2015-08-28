angular.module('ecstatic.channels')

.controller('ChannelsCtrl', ['$scope', 'channelServices', '$state', function($scope, channelServices, $state) {

// refresh the rooms list
    $scope.doRefresh = function(){
        channelServices.getChannels().then(function(data) {

            var channels = [];
            data.channelList.forEach(function(channel) {
            	var player_state = channel.player_state;
                if(player_state){
                  channels.push(player_state);
                }
            });
            $scope.channels = channels;
            //tell the ionScroll that the job is done
            $scope.$broadcast('scroll.refreshComplete');
        }
    )};
        
    $scope.doRefresh();

    $scope.joinChannel = function(channel_id){
        channelServices.joinChannel(channel_id);
    }
}])

.controller('NameChannelCtrl', ['$scope', 'soundcloudService', 'channelServices', '$state', function($scope, soundcloudService, channelServices, $state) {

    $scope.create_channel = function(channelName) {
        channelServices.createChannel(channelName).then(function(data) {
            $state.go('tab.channels-player', {channel_id:data.player_state.channel_id});
        });
    }
}])