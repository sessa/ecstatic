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
      'ionic',
      'ecstatic.player',
      'ecstatic.playlist',
      'ecstatic.sockets',
      'ecstatic.models',
      'ecstatic.soundcloud',
      'ecstatic.home',
      'ecstatic.channels',
      'ecstatic.config',
      'ecstatic.feedback'
])

.run(function($ionicPlatform) {
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
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'index/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('tab.channels', {
      url: '/channels',
      views: {
        'tab-channels': {
          templateUrl: 'channels/tab-channels.html',
          controller: 'ChannelsCtrl'
        }
      }
    })
    .state('tab.name-a-channel', {
      url: '/name-a-channel',
      views: {
        'tab-channels': {
          templateUrl: 'channels/name-a-channel.html',
          controller: 'NameChannelCtrl'
        }
      }
    })
    .state('tab.channels-create', {
      url: '/create',
      views: {
        'tab-channels': {
          templateUrl: 'channels/channels-create.html',
          controller: 'AddSongsCtrl'
        }
      }
    })
    .state('tab.channels-player', {
      url: '/player/:channel_id',
      views: {
        'tab-channels': {
          templateUrl: 'player/player.html',
          controller: 'PlayerCtrl'
        }
      }
    })
    .state('tab.playlist', {
      url: '/player/:channel_id/playlist',
      views: {
        'tab-channels': {
          templateUrl: 'player/playlist.html',
          controller: 'PlaylistCtrl'
        }
      }
    })    

    .state('tab.feedback', {
      url: '/feedback',
      views: {
        'tab-feedback': {
          templateUrl: 'feedback/feedback.html',
          controller: 'FeedbackCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');
});

