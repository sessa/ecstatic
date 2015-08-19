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

.factory('playerModel', function($rootScope){
	var Service = {};
	Service.player_state = {};
	Service.set = function(data) {
		Service.player_state = data;
	}
	return Service;
})

.factory('playlistModel', function($rootScope, ConfigService, $sce){
	var Service = {};
	Service.playlist = [];
	Service.add = function(source) {
	    Service.playlist.push({src: $sce.trustAsResourceUrl(source.stream_url+"?client_id="+ConfigService.getConfig().soundcloudClientId), type: "audio/"+source.original_format});
	}
	return Service;
})