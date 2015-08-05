angular.module('controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, socketManager) {
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
})

.controller('ChatsCreateCtrl', ['Soundcloud', '$scope', 'playlistModel','socketManager', function(Soundcloud, $scope, playlistModel, socketManager) {
    
    $scope.create_room = function() {
        socketManager.create_room("test").then(function(data) {
        	console.log("data="+data);
            console.log("room created");
        });
    }

    Soundcloud.getUser().then(function(data){
		$scope.sc = data;
	});
	$scope.add_to_playlist = function(source){
		console.log("add song="+JSON.stringify(source.title));
		playlistModel.add(source);
	}

}])

.controller('ChatDetailCtrl', function($scope, $stateParams, socketManager) {
  console.log("ChatDetailCtrl");
});