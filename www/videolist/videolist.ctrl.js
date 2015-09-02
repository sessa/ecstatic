angular.module('ecstatic.videolist')

.controller('videolistCtrl',
	['channelServices', '$stateParams', function(channelServices, $stateParams) {
    channelServices.getChannels().then(function (channels){
        var channel = channelServices.getChannel($stateParams.channel_id);

		console.log("channel.cliplist"+JSON.stringify(channel.cliplist));
		console.log("channel"+JSON.stringify(channel));		
	});
}])

.service("videolistEventServices", function ($rootScope){
    this.broadcast = function(data) {$rootScope.$broadcast("videoAdded", data)}
    this.listen = function(callback) {$rootScope.$on("videoAdded",callback)}
})
