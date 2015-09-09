angular.module('ecstatic.channels')

.controller('ChannelsCtrl', ['$scope', 'channelServices', '$state', function($scope, channelServices, $state) {
    $scope.$watch('dataReady',function(ready){
        if (ready){ startController(); }
    });

    function startController(){
        $scope.channels = channelServices.channels;
    }
    
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
        });
    }

    $scope.joinChannel = function(channel_id){
        console.log("join?");
        channelServices.joinChannel(channel_id);
    }
}])
