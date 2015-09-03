angular.module('ecstatic.videolist')

.controller('videolistCtrl',
	['channelServices', '$stateParams', '$scope', '$state', 'playerServices', function(channelServices, $stateParams, $scope, $state, playerServices) {
	$scope.goToVideolist = function(){
		$state.go('tab.channels-videolist');
	}
    channelServices.getChannels().then(function (channels){
    	console.log("playerServices.channel_id"+playerServices.channel_id);
        $scope.channel = channelServices.getChannel(playerServices.channel_id);
		console.log("channel.cliplist"+JSON.stringify(channel.cliplist));
		console.log("channel"+JSON.stringify(channel));		
	});
}])

.service("videolistEventServices", function ($rootScope){
    this.broadcast = function(data) {$rootScope.$broadcast("videoAdded", data)}
    this.listen = function(callback) {$rootScope.$on("videoAdded",callback)}
})
