angular.module("ecstatic.setName").controller("setNameCtrl",["$scope","channelServices","$state",function(e,n,a){e.nameChannel=function(n){e.channelName=n,a.go("setTimer",{channelName:n})}}]);