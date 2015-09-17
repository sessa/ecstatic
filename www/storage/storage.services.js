angular.module('ecstatic.storage')

.factory('storageServices', function() {

	var Service = {};

	Service.getPlatform = function() {
		return navigator.userAgent;
	}

	Service.onDesktop = function() {
		if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
	  		return false;
		} else {
	  		return true;
		}
	}

	return Service;
});