angular.module('ecstatic.channelList', ['ecstatic.sockets'])

.controller('ChatsCtrl', ['$scope', 'socketManager', function($scope, socketManager) {
  // refresh the rooms list
  $scope.doRefresh = function(){
        socketManager.getRooms().then(function(data) {

            var rooms = [];
            data.roomList.forEach(function(room) {
            	var player_state = room.player_state;
                if(player_state){
                  rooms.push(player_state);
                }
            });
            $scope.rooms = rooms;
            //tell the ionScroll that the job is done
            $scope.$broadcast('scroll.refreshComplete');
        }
    )};
          $scope.doRefresh();

}]);