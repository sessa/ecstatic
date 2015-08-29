angular.module('ecstatic.mediapicker')

.factory('mediapickerServices', ['userNumberEventService', 'updatePlayerstateEventService', 'socket', 'socketManager', 'playerServices','$sce', 'ConfigService', function(userNumberEventService, updatePlayerstateEventService, socket, socketManager, playerServices, $sce, ConfigService) {
	// We return this object to anything injecting our service
	var Service = {};
	Service.channels = [];

	//This function updates the number of users, and the playlist when songs are added.
	socket.on('update', function () {
		Service.getChannels().then(function (data){
			var channel = Service.getChannel(playerServices.channel_id);
			userNumberEventService.broadcast(Object.keys(channel.users).length);
			updatePlayerstateEventService.broadcast(channel);
		});
	});

	Service.addToPlaylist = function(channel_id, source) {
		var channel = Service.getChannel(channel_id);
		channel.playlist.push(source);

		var request = {
			msg: "update_channel",
			channel_info: channel
		}

		socketManager.sendRequest(request); 
	}

	return Service;
}])	