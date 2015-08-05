angular.module('ecstatic.channelList', ['ecstatic.sockets'])

.controller('ChatsCtrl', ['$scope', 'socketManager', function($scope, socketManager) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // refresh the channels list
  $scope.doRefresh = function(){
        socketManager.getRooms().then(function(data) {

            var channels = [];
            var id = 0;
            data.result.forEach(function(entry) {
            	var channel = JSON.parse(entry.socket_info).player_state;
                if(channel){
                	channel.id = id;
                	id++;
                    channels.push(channel);
                }
            });
            $scope.chats = channels;
            //tell the ionScroll that the job is done
            $scope.$broadcast('scroll.refreshComplete');
        }
    )};
}]);