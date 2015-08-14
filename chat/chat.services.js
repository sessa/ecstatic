angular.module('ecstatic.chat')

//import socketManager
//send messages
.factory('chatService',['$q', '$rootScope', function($q, $rootScope) {
      var Service = {};
      var defer = $q.defer();

      Service.getUser = function() {
        
        return defer.promise;
      }

    return Service;
}]);