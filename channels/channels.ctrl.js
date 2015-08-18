angular.module('ecstatic.channels')

.controller('ChannelsCtrl', ['$scope', 'soundcloudService', 'socketManager', 'playlistModel', '$state', function($scope, soundcloudService, socketManager, playlistModel, $state) {

// refresh the rooms list
    $scope.doRefresh = function(){
        socketManager.getChannels().then(function(data) {

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
        socketManager.joinChannel(channel_id);
    }


}])

.controller('AddSongsCtrl', ['$scope', 'soundcloudService', 'socketManager', 'playlistModel', '$state', function($scope, soundcloudService, socketManager, playlistModel, $state) {

    // Gets your likes from Soundcloud
    soundcloudService.getUser().then(function(data){
        $scope.sc = data;
    });

    $scope.add_to_playlist = function(source){
        playlistModel.add(source);
    }

}])

.controller('NameChannelCtrl', ['$scope', 'soundcloudService', 'socketManager', 'playlistModel', '$state', function($scope, soundcloudService, socketManager, playlistModel, $state) {

    $scope.create_channel = function() {
        console.log("channelName")
        var habibi = $scope.channelName;
        socketManager.createChannel(habibi).then(function(data) {
            console.log("Then go")
            $state.go('tab.channels-player', {channel_id:data.player_state.channel_id});
        });
    }

    $scope.add_to_playlist = function(source){
        playlistModel.add();
    }

}]);