angular.module('ecstatic.chat')

//import socketManager
//send messages
.factory('chatService',['$q', '$rootScope', function($q, $rootScope) {
      var Service = {};
      var defer = $q.defer();

      // Service.getChatlog = function() {
	     //   return defer.promise;
      // }

      Services.submitText = function() {
	       return defer.promise;
      }

    return Service;
}]);
