angular.module('ecstatic.player')

.factory('playerService', function($rootScope, $sce, ConfigService, socket, socketManager){
	var Service = {};
	Service.player_state = {};
	Service.playlist = [];
	Service.soundcloudResources = [];

	Service.setPlayerState = function(data) {
		Service.player_state = data;
	}
	Service.addToPlaylist = function(source) {
		console.log("source="+source);
		Service.soundcloudResources.push(source);
	    Service.playlist.push({src: $sce.trustAsResourceUrl(source.stream_url+"?client_id="+ConfigService.getConfig().soundcloudClientId), type: "audio/"+source.original_format});
	}

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
