angular.module('ecstatic.channelList', ['ecstatic.sockets'])

.controller('ChannelsCtrl', ['$scope', 'socketManager', function($scope, socketManager) {

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
}]);