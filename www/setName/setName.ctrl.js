angular.module('ecstatic.setName')


.controller('setNameCtrl', ['$scope', 'channelServices', '$state', function($scope, channelServices, $state) {
    $scope.nameChannel = function(channelName) {
    	$scope.channelName = channelName;
        $state.go('setTimer', {channelName:channelName});
    }
}])
