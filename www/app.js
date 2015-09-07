var elapsed = 100;
var trackIndex = 0;
var timeOfReturn = 0;

// Google Analytics

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-27668159-4', 'auto');
  ga('send', 'pageview');


//start Mixpanel

(function(f,b){if(!b.__SV){var a,e,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=f.createElement("script");a.type="text/javascript";a.async=!0;a.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";e=f.getElementsByTagName("script")[0];e.parentNode.insertBefore(a,e)}})(document,window.mixpanel||[]);
mixpanel.init("3cc8de265eae4e9f76364871a4ae56e7", {
    loaded: function() {
        distinct_id = mixpanel.get_distinct_id();
    }
});


var app = angular.module('ecstatic', [
      'ngSanitize',
      'ngAnimate',
      'timer',
      'ionic',
      'ecstatic.player',
      'ecstatic.playlist',
      'ecstatic.sockets',
      'ecstatic.soundcloud',
      'ecstatic.home',
      'ecstatic.chat',
      'ecstatic.channels',
      'ecstatic.config',
      'ecstatic.feedback',
      'ecstatic.camera',
      'ecstatic.mediapicker',
      'ecstatic.create',
      'ecstatic.videoplayer',
      'ecstatic.videolist',
])

.run(function($ionicPlatform, $rootScope, channelServices, $stateParams) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
  $rootScope.dataReady = false;
  var channelsLoaded = false;
  channelServices.getChannels().then( function (data){
    channelsLoaded = true;
    if($stateParams.channel_id){
      channelServices.joinChannel($stateParams.channel_id);
    }
  });

  $rootScope.$watch( 
    function(){return channelsLoaded},
    function(ready){$rootScope.dataReady = ready; console.log(ready)}
  );


})


.controller('NavCtrl', function($scope, $ionicSideMenuDelegate, $ionicPopover) {

    $scope.showMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
    };
    
})

/*  States.js */

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.views.maxCache(3);

  $stateProvider

    // ecstatic & it's navigation menu

    // a static bulletin board with the latest updates of the production-ready branch

    .state('home', {
        url: '/home',
        views: {
          'main': {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
          }
        }
    })

    // a list of all channels on the server

    .state('channels', {
        url: '/channels',
        views: {
          'main': {
            templateUrl: 'channels/channel-list.html',
            controller: 'ChannelsCtrl'
          }
        }
    })

            // a form that sets the name of the channel

            .state('setName', {
                url: '/setName',
                views: {
                  'main': {
                    templateUrl: 'create/setName/setName.html',
                    controller: 'setNameCtrl'
                  }
                }
            })

            // a form that sets the time left before the music starts

            .state('setTimer', {
                url: '/setTimer:channelName',
                views: {
                  'main': {
                    templateUrl: 'create/setTimer/setTimer.html',
                    controller: 'setTimerCtrl'
                  }
                }
            })

    // a feedback form that sends an e-mail to jonathan at silentdiscosquad dot com

    .state('feedback', {
        url: '/feedback',
        views: {
          'main': {
            templateUrl: 'feedback/feedback.html',
            controller: 'FeedbackCtrl'
          }
        }
    })

            // a thank you note

            .state('feedback.thankyou', {
                url: '/thankyou',
                views: {
                  'main': {
                    templateUrl: 'feedback/thankyou.html',
                    controller: 'FeedbackCtrl'
                  }
                }
            })

    // a channel 

    .state('channel', {
        url: '/channel/:channel_id',
        views: {
          'main': {
            templateUrl: 'channels/channel-tabs.html'
          }
        }

    })

            // a list of the user's likes on Soundcloud

            .state('channel.mediapicker', {
                url: '/mediapicker',
                views: {
                  'main@': {
                    templateUrl: 'mediapicker/mediapicker.html',
                    controller: 'MediapickerCtrl'
                  }
                }
            })

            // a modifiable playlist for the music player

            .state('channel.playlist', {
              url: '/playlist',
              views: {
                'main@': {
                  templateUrl: 'playlist/playlist.html',
                  controller: 'PlaylistCtrl'
                }
              }
            })

            // the output of the user's main camera and a record button

            .state('channel.camera', {
                url: '/camera',
                views: {
                  'main@': {
                    templateUrl: 'camera/camera.html',
                    controller: 'CameraCtrl'
                  }
                }
            })

            // a modifiable playlist for the video player

            .state('channel.videolist', {
                url: '/videolist',
                views: {
                  'main@': {
                    templateUrl: 'videolist/videolist.html',
                    controller: 'videolistCtrl'
                  }
                }
            })

      
    
    $urlRouterProvider.otherwise('channels');
});
