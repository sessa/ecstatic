angular.module('ecstatic.player')

.factory('playerServices', function($rootScope, $sce, $stateParams, ConfigService, socket, socketManager){
	var Service = {};
	var channel_id = 0;

	Service.nextSongAction = function(playlistIndex, channel_id) {
		var request = {
			msg: "next_song_action",
			channel_id: channel_id,
			playlistIndex: playlistIndex
		}
		socket.on('next_song_action', function (data) {
			$rootScope.$broadcast('nextSong');
		});
		var promise = socketManager.sendRequest(request); 
		return promise;
	}

	return Service;
})
