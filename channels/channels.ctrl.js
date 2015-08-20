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
        console.log("joinChannel="+channel_id);
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
.controller('AddSongsCtrl', ['$scope', 'soundcloudService', 'playerService', '$state', function($scope, soundcloudService, playerService, $state) {
    // Gets your likes from Soundcloud
    soundcloudService.getFavorites().then(function(data){
        $scope.sc = data;
    });

    $scope.submit = function() {
        console.log("submitted");
        $state.go('tab.channels-player', {channel_id:playerService.player_state.channel_id}, {reload: true, notify:true});
    }

    $scope.add_to_playlist = function(source){
        playerService.addToPlaylist(source);
    }
}])