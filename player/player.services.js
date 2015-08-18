angular.module('ecstatic.player')

.factory('playerService', function($rootScope){
	var Service = {};
		Service.nextSongAction = function(playlistIndex, channel_id) {
			var request = {
				msg: "next_song_action",
				channel_id: channel_id,
				playlistIndex: playlistIndex
			}
			socket.on('next_song_action', function (data) {
				$rootScope.$broadcast('nextSong');
			});
			var promise = sendRequest(request); 
			return promise;
		}
	return Service;
})

.factory('playlistModel', function($rootScope){
	var Service = {};
	Service.playlist = [];
	Service.add = function(source) {
		Service.playlist.push(source);
	}
	Service.remove = function(index) {
		Service.playlist.remove(index);
	}
	Service.getAll = function() {
		return playlist;
	}
	return Service;
})