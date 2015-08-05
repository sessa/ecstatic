angular.module('ecstatic.sockets')

.controller('ChatsCreateCtrl', ['Soundcloud', '$scope', 'playlistModel','socketManager', function(Soundcloud, $scope, playlistModel, socketManager) {
    
    $scope.create_room = function() {
        socketManager.createRoom("test").then(function(data) {
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
