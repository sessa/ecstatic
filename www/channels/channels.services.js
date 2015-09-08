angular.module('ecstatic.channels')

.factory('channelServices', ['userNumberEventService', 'updatePlayerstateEventService', 'videoEventServices', 'socket', 'socketManager','$sce', 'ConfigService', function(userNumberEventService, updatePlayerstateEventService, videoEventServices, socket, socketManager, $sce, ConfigService) {
	// We return this object to anything injecting our service
	var Service = {};
	Service.channels = [];

	//This function updates the number of users, and the playlist when songs are added.
	socket.on('update', function (info) {
		Service.getChannels().then(function (data){
			console.log("updating");
			var channel = Service.getChannel(info.channel_id);
			userNumberEventService.broadcast(Object.keys(channel.users).length);
			updatePlayerstateEventService.broadcast(channel);
			videoEventServices.broadcast(channel.cliplist);
		});
	});


	Service.addToPlaylist = function(channel_id, source) {
		var channel = Service.getChannel(channel_id);
		channel.playlist.push(source);

		var request = {
			msg: "update_channel",
			channel_info: channel,
			channel_id: channel_id
		}

		socketManager.sendRequest(request); 
	}

	Service.setCountdownFinished = function(channel_id) {
		var channel = Service.getChannel(channel_id);
		var request = {
			msg: "setCountdownFinished",
			channel_id:channel_id
		}

		socketManager.sendRequest(request); 
	}

	Service.getChannels = function() {
		var request = {
			msg: "channelList"
		}

		//channelList returns all channels
		socket.on('channelList', function (data) {
			Service.setChannels(data);
			socketManager.listener(data);
		});

		var promise = socketManager.sendRequest(request); 
		return promise;
	}

	Service.joinChannel = function(channel_id) {
		var request = {
			msg: "join_channel",
			channel_id:channel_id
		}
		socketManager.sendRequest(request); 
	}

	Service.setChannels = function(channels) {
		var channelList = channels.channelList;
		Service.channels = [];
		for(var index = 0; index < channelList.length; index++){
			if(channelList[index].player_state){
				Service.channels.push(channelList[index].player_state);
			}
		}
	}

	Service.getChannel = function(channel_id){
		for(var index = 0; index < Service.channels.length; index++){
			var channel = Service.channels[index];
			if(channel.channel_id == channel_id){
				return Service.channels[index];
			}
		}
	}

	Service.setChannel = function(channel){
		for(var index = 0; index < Service.channels.length; index++){
			var localChannel = Service.channels[index];
			if(localChannel.channel_id == channel.channel_id){
				Service.channels[index].player_state = channel;
			}
		}
	}

	Service.createChannel = function(channelName, startTime, hasCountdown) {
		var request = {
			msg: "create_channel",
			channel_name: channelName,
			start_time: startTime,
			hasCountdown: hasCountdown
		}

		//When create channel returns, add the data to the channelModel
		socket.on('create_channel', function (data) {
			console.log("create_channel, data="+JSON.stringify(data));
			Service.channels.push(data.player_state);
			socketManager.listener(data);
		});
		// Storing in a variable for clarity on what sendRequest returns
		var promise = socketManager.sendRequest(request); 
		return promise;
	}
	return Service;
}])
.service("userNumberEventService", function ($rootScope){
    this.broadcast = function(userNumber) {$rootScope.$broadcast("userNumber", userNumber); console.log("userNumber="+userNumber);}
    this.listen = function(callback) {$rootScope.$on("userNumber",callback)}
})
.service("updatePlayerstateEventService", function ($rootScope){
    this.broadcast = function(playerstate) {$rootScope.$broadcast("playerstate", playerstate)}
    this.listen = function(callback) {$rootScope.$on("playerstate",callback)}
});