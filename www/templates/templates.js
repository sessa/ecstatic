angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("index.html","<!DOCTYPE html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width\"><title>Ecstatic</title><base href=\"/\"><!-- external imports--><link href=\"https://fonts.googleapis.com/css?family=Nunito:700,300,400\" rel=\"stylesheet\" type=\"text/css\"><!-- internal imports--><script src=\"lib/ionic/js/ionic.bundle.js\"></script><!-- cordova script (this will be a 404 during development)--><script src=\"cordova.js\"></script><link rel=\"stylesheet\" href=\"lib/ionic/css/ionic.css\"><link rel=\"stylesheet\" href=\"css/ecstatic.css\"><script src=\"lib/bower_components/angular-sanitize/angular-sanitize.min.js\"></script><script src=\"lib/bower_components/angular-animate/angular-animate.js\"></script><script src=\"lib/bower_components/angular-socket-io/socket.js\"></script><script src=\"lib/bower_components/angular-timer/dist/angular-timer.js\"></script><script src=\"lib/bower_components/videogular/videogular.js\"></script><script src=\"lib/bower_components/videogular-controls/vg-controls.js\"></script><script src=\"lib/bower_components/videogular-overlay-play/vg-overlay-play.js\"></script><script src=\"lib/bower_components/videogular-poster/vg-poster.js\"></script><script src=\"lib/bower_components/videogular-buffering/vg-buffering.js\"></script><script src=\"lib/bower_components/momentjs/min/moment.min.js\"></script><script src=\"lib/bower_components/momentjs/min/locales.min.js\"></script><script src=\"lib/bower_components/humanize-duration/humanize-duration.js\"></script><script src=\"api/lib/socket.io-client/socket.io.js\"></script><script src=\"templates/templates.js\"></script><script src=\"lib/countdown.js\"></script><script src=\"config/config.services.js\"></script><script src=\"setName/setName.module.js\"></script><script src=\"setName/setName.ctrl.js\"></script><script src=\"setTimer/setTimer.module.js\"></script><script src=\"setTimer/setTimer.ctrl.js\"></script><script src=\"countdown/countdown.module.js\"></script><script src=\"countdown/countdown.ctrl.js\"></script><script src=\"videoplayer/videoplayer.module.js\"></script><script src=\"videoplayer/videoplayer.ctrl.js\"></script><script src=\"videoplayer/videoplayer.services.js\"></script><script src=\"videolist/videolist.module.js\"></script><script src=\"videolist/videolist.ctrl.js\"></script><script src=\"videoplayer/videoplayer.services.js\"></script><script src=\"player/player.module.js\"></script><script src=\"player/player.services.js\"></script><script src=\"player/player.ctrl.js\"></script><script src=\"playlist/playlist.module.js\"></script><script src=\"playlist/playlist.ctrl.js\"></script><script src=\"soundcloud/soundcloud.module.js\"></script><script src=\"soundcloud/soundcloud.services.js\"></script><script src=\"sockets/sockets.module.js\"></script><script src=\"sockets/sockets.services.js\"></script><script src=\"sockets/sockets.ctrl.js\"></script><script src=\"chat/chat.module.js\"></script><script src=\"chat/chat.services.js\"></script><script src=\"chat/chat.ctrl.js\"></script><script src=\"feedback/feedback.module.js\"></script><script src=\"feedback/feedback.ctrl.js\"></script><script src=\"channels/channels.module.js\"></script><script src=\"channels/channels.services.js\"></script><script src=\"channels/channels.ctrl.js\"></script><script src=\"home/home.module.js\"></script><script src=\"home/home.ctrl.js\"></script><script src=\"mediapicker/mediapicker.module.js\"></script><script src=\"mediapicker/mediapicker.ctrl.js\"></script><script src=\"app.js\"></script><script src=\"camera/camera.module.js\"></script><script src=\"camera/camera.services.js\"></script><script src=\"camera/camera.ctrl.js\"></script><script src=\"//connect.soundcloud.com/sdk-2.0.0.js\"></script><script src=\"https://cdn.webrtc-experiment.com/MediaStreamRecorder.js\"></script><script src=\"https://cdnjs.cloudflare.com/ajax/libs/ngStorage/0.3.6/ngStorage.min.js\"></script></head><!-- THE APP--><body ng-app=\"ecstatic\"><ion-side-menus enable-menu-with-back-views=\"false\"><ion-side-menu-content ng-controller=\"NavCtrl\"><ion-nav-bar class=\"bar-dark\"><ion-nav-back-button></ion-nav-back-button><ion-nav-buttons side=\"left\"><button ng-click=\"showMenu()\" menu-toggle=\"left\" class=\"button button-icon button-clear ion-navicon\"></button></ion-nav-buttons><ion-nav-buttons side=\"right\"><!--button.button.button-icon.button-clear.ion-android-more-vertical(ng-click=\"\")--></ion-nav-buttons></ion-nav-bar><ion-nav-view name=\"main\" animation=\"slide-left-right\"></ion-nav-view></ion-side-menu-content><ion-side-menu side=\"left\" enable-menu-with-back-views=\"false\"><ion-content><ion-list class=\"ecstatic-menu\"><ion-item class=\"center-text\">Ecstatic <span class=\"beta-label\">BETA </span><span>v1.5.1</span></ion-item><ion-item menu-close href=\"#/home\"><i class=\"icon ion-android-home\"></i> \nHome</ion-item><ion-item menu-close href=\"#/channels\"> <i class=\"icon ion-radio-waves\"></i> Channels</ion-item><ion-item menu-close href=\"#/feedback\"> <i class=\"icon ion-clipboard\"></i> Feedback</ion-item></ion-list></ion-content></ion-side-menu></ion-side-menus></body>");
$templateCache.put("camera/camera.html","<ion-view><ion-content scroll=\"false\" class=\"darkbg has-header\"><div ng-hide=\"onDesktop\"><div class=\"vertical-screen\"><input type=\"file\" id=\"fileinput\" accept=\"video/*\"/></div></div><div ng-show=\"onDesktop\"><div class=\"vertical-screen\"><video id=\"videoElement\" loop=\"loop\"></video></div><button ng-click=\"deleteClip()\" class=\"button button-large button-clear camera-icons icon ion-trash-b\"></button><button ng-click=\"sendVideo()\" class=\"button button-large button-clear camera-icons icon ion-checkmark-circled pizza\"></button><a on-release=\"onRelease();\" on-hold=\"onHold()\" class=\"button round-icon record-button\"></a><div class=\"record-button-label\">(Hold to Rec)</div></div></ion-content></ion-view>");
$templateCache.put("channels/channel-list.html","<ion-view view-title=\"Channels\"><ion-nav-buttons side=\"secondary\"></ion-nav-buttons><ion-content class=\"gradient padding\"><ion-refresher pulling-text=\"~:D\" on-refresh=\"doRefresh()\"></ion-refresher><ion-list><a href=\"#/setName\" class=\"button button-block icon-left\">Create a channel</a><ion-item ng-repeat=\"channel in channels\" type=\"item-text-wrap\" ng-click=\"joinChannel(channel.channel_id)\" href=\"#/channel/{{channel.channel_id}}\" class=\"channel item-thumbnail-channel-left item-icon-right\"><img ng-src=\"channels/empty-poster-small.png\"/><h2>{{channel.channel_name}}</h2><h2> </h2><h3> </h3><span> </span><span> </span><span> </span><i ng-click=\"#\" class=\"icon ion-chevron-right\"></i></ion-item></ion-list></ion-content></ion-view>");
$templateCache.put("channels/channel-tabs.html","<ion-view view-title=\"{{channelName}}\" ng-controller=\"CountdownCtrl as controller\"><div ng-show=\"showCountdown\"><ion-view><ion-content class=\"gradient\"><div class=\"countdown-container\"><timer ng-attr-countdown=\"startTime\" interval=\"1000\" finish-callback=\"finished()\">{{hours}}:{{minutes}}:{{seconds}}</timer><br/><p>until the music starts</p><br/></div><div class=\"row\"> <div class=\"col col-10\"></div><div class=\"col col-80\"><div class=\"card padding center-text\"><br/><p>You can suggest music from your Soundcloud likes while waiting.</p><br/><a ui-sref=\"channel.mediapicker\" class=\"button button-dark\">Add songs!</a></div></div><div class=\"col col-10\"></div></div></ion-content></ion-view></div><div ng-hide=\"showCountdown\"><ion-tabs class=\"channel-tabs\"><ion-tab icon-off=\"ion-music-note\" icon-on=\"ion-music-note\"><ion-nav-view name=\"player\"><ion-view><ion-content class=\"gradient\"><ng-switch on=\"showPlayer\" ng-controller=\"PlayerCtrl\"><!--if the player has songs in it--><div ng-switch-when=\"true\" class=\"padding center-text player-view\"><!--the player	--><videogular vg-theme=\"playerServices.theme\" vg-player-ready=\"playerServices.onPlayerReady($API)\" vg-complete=\"playerServices.onCompleteItem()\" vg-auto-play=\"playerServices.autoplay\" class=\"videogular-container audio\"><vg-media vg-src=\"playerServices.sources\" vg-type=\"audio\"></vg-media></videogular><br/><br/><br/><img src=\"{{playerServices.trackCover}}\" class=\"cover-art\"/><p><strong>{{playerServices.trackTitle}}</strong><br/>{{playerServices.trackUser}}</p><br/><a ui-sref=\"channel.mediapicker\" class=\"button button-dark\">Add songs</a><!--a.button.button-full.button-dark(ui-sref=\"channel.playlist\") Modify the playlist--><br/><br/><button ng-click=\"nextSong()\" class=\"button button-clear\"> Skip this song</button><br/></div><!--if the player is empty--><br/><div ng-switch-default=\"ng-switch-default\" class=\"card padding center-text\"><br/><h3 class=\"title\">Oh, wait.</h3><p>There\'s no song in this playlist.</p><br/><a ui-sref=\"channel.mediapicker\" class=\"button button-dark\">Add songs</a></div></ng-switch></ion-content></ion-view></ion-nav-view></ion-tab><ion-tab icon-off=\"ion-social-youtube\" icon-on=\"ion-social-youtube\"><ion-nav-view name=\"videoplayer\"><ion-view><ion-content scroll=\"false\" class=\"darkbg has-header\"><ng-switch on=\"showVideoplayer\" ng-controller=\"VideoCtrl\"><div id=\"active-videoplayer\" ng-switch-when=\"true\"><videogular vg-player-ready=\"videoplayerServices.onVideoplayerReady($API)\" vg-complete=\"videoplayerServices.onCompleteItem()\" vg-auto-play=\"videoplayerServices.autoplay\" class=\"videogular-container video\"><vg-media id=\"videoplayer-container\" vg-src=\"videoplayerServices.sources\" vg-type=\"video\"></vg-media></videogular></div><div id=\"empty-videoplayer\" ng-switch-default=\"ng-switch-default\"><div class=\"padding\"><h2 class=\"novideoyet-text\">{{videoMessage}}</h2></div></div></ng-switch></ion-content><ion-footer ng-controller=\"VideoCtrl\"><button ng-click=\"videoplayerServices.API.toggleFullScreen()\" class=\"button button-large button-clear camera-icons icon ion-arrow-expand fullscreen-icon\"></button><a ui-sref=\"channel.videolist\" class=\"button button-large button-clear camera-icons icon ion-android-list videolist-icon\"></a><a ui-sref=\"channel.camera\" class=\"button button-large button-clear button-assertive icon ion-videocamera camera-icon\"></a></ion-footer></ion-view></ion-nav-view></ion-tab><ion-tab icon-off=\"ion-chatbubble\" icon-on=\"ion-chatbubble\"><ion-nav-view name=\"chat\"><ion-view ng-controller=\"ChatCtrl as controller\" cache-view=\"false\"><ion-content has-header=\"true\" class=\"has-header has-footer gradient padding\"><!-- Channel discussion--><div ng-repeat=\"line in chatLog track by $index\"><div class=\"chat-message scroll-item padding\"><strong>{{line.username}}:</strong> \n {{line.txt}}</div><br/></div></ion-content><ion-footer has-footer=\"true\" class=\"chat-input\"><div class=\"message-box list padding\"><form><label class=\"item-inset\"><input type=\"search\" ng-model=\"lineText\" ng-enter=\"enterText(lineText); lineText=\'\'\" placeholder=\"{{textPrompt}}\" class=\"typeform padding\"/></label><button ng-click=\"enterText(lineText); lineText=\'\'\" class=\"hidden\"></button></form></div></ion-footer></ion-view></ion-nav-view></ion-tab></ion-tabs></div></ion-view>");
$templateCache.put("channels/channel.html","<ion-view><ion-tabs class=\"tabs-dark tabs-icon-only\"><ion-tab title=\"Player\" icon-on=\"ion-ios-filing\" icon-off=\"ion-ios-filing-outline\"><ion-content><br/><h1>The Player</h1></ion-content></ion-tab><ion-tab title=\"TV\" icon-on=\"ion-ios-filing\" icon-off=\"ion-ios-filing-outline\"><ion-content><br/><h1>The TV</h1></ion-content></ion-tab><ion-tab title=\"Chat\" icon-on=\"ion-ios-filing\" icon-off=\"ion-ios-filing-outline\"><ion-content><br/><h1>The Chat</h1></ion-content></ion-tab></ion-tabs></ion-view>");
$templateCache.put("chat/chat.html","<ion-view ng-controller=\"ChatCtrl as controller\" cache-view=\"false\"><ion-content has-header=\"true\" class=\"has-header has-footer gradient padding\"><!-- Channel discussion--><div ng-repeat=\"line in chatLog track by $index\"><div class=\"chat-message scroll-item padding\"><strong>{{line.username}}:</strong> \n {{line.txt}}</div><br/></div></ion-content><ion-footer has-footer=\"true\" class=\"chat-input\"><div class=\"message-box list padding\"><form><label class=\"item-inset\"><input type=\"search\" ng-model=\"lineText\" ng-enter=\"enterText(lineText); lineText=\'\'\" placeholder=\"{{textPrompt}}\" class=\"typeform padding\"/></label><button ng-click=\"enterText(lineText); lineText=\'\'\" class=\"hidden\"></button></form></div></ion-footer></ion-view>");
$templateCache.put("countdown/countdown.html","<ion-view><ion-content class=\"gradient\"><div class=\"countdown-container\"><timer ng-attr-countdown=\"startTime\" interval=\"1000\" finish-callback=\"finished()\">{{hours}}:{{minutes}}:{{seconds}}</timer><br/><p>until the music starts</p><br/></div><div class=\"row\"> <div class=\"col col-10\"></div><div class=\"col col-80\"><div class=\"card padding center-text\"><br/><p>You can suggest music from your Soundcloud likes while waiting.</p><br/><a ui-sref=\"channel.mediapicker\" class=\"button button-dark\">Add songs!</a></div></div><div class=\"col col-10\"></div></div></ion-content></ion-view>");
$templateCache.put("feedback/feedback.html","<ion-view view-title=\"Feedback\"><ion-content><form action=\"/feedback\" method=\"post\" class=\"list\"><label class=\"item item-input padding\"><input ng-model=\"name\" id=\"name\" name=\"name\" type=\"text\" placeholder=\"First Name\"/></label><label class=\"item item-input padding\"><input ng-model=\"email\" id=\"email\" name=\"email\" type=\"email\" placeholder=\"E-mail\"/></label><label class=\"item item-input padding\"><input ng-model=\"message\" id=\"message\" name=\"message\" type=\"text\" placeholder=\"Message\"/></label><button type=\"submit\" value=\"send\" class=\"button button-positive button-full\">Send</button></form></ion-content></ion-view>");
$templateCache.put("feedback/thankyou.html","<ion-view view-title=\"Feedback\"><ion-content><br/><br/><h2>thank you :)</h2></ion-content></ion-view>");
$templateCache.put("home/home.html","<ion-view view-title=\"Welcome home.\"><ion-content class=\"padding gradient\"><div class=\"list card\"><div class=\"item item-body\"><h1>Hello Beautiful Humans!</h1><p>This app is in beta.\nUse it to <strong>unite humanity through music and dance. </strong>There are tons of new features about to be released, check back often. :)</p></div></div><div class=\"list card\"><div class=\"item item-body\"><h2>Patch: 1.5.1</h2><ul><li>- Refreshing doesn\'t break the app anymore</li><li>- Chat messages don\'t disappear, chat remembers your nickname</li><li>- The countdown page is more intuitive</li></ul></div><div class=\"item item-avatar\"><img src=\"images/AppIconSquare_1024.png\"/><h4>The Ecstatic Collective</h4><p>posted on September 7th 2015</p></div></div><div class=\"list card\"><div class=\"item item-body\"><h2>New Release: Version 1.5</h2><ul><li>- Video recording/playback</li><li>- Countdown before the music starts</li><li>- Bug fixes</li></ul></div><div class=\"item item-avatar\"><img src=\"images/AppIconSquare_1024.png\"/><h4>The Ecstatic Collective</h4><p>posted on September 5th 2015</p></div></div><div class=\"list card\"><div class=\"item item-body\"><h2>New Release: Version 1.4</h2><ul><li>- Soundcloud integration</li><li>- Anonymous chat</li><li>- Playlist creation</li><li>- Link sharing</li></ul></div><div class=\"item item-avatar\"><img src=\"images/AppIconSquare_1024.png\"/><h4>The Ecstatic Collective</h4><p>posted on August 21st 2015</p></div></div></ion-content></ion-view>");
$templateCache.put("mediapicker/mediapicker.html","<ion-view><ion-nav-buttons side=\"secondary\"></ion-nav-buttons><ion-header-bar ng-show=\"song_added\" class=\"bar bar-subheader miniplayer\"><p class=\"padding\">Song added to the playlist!</p></ion-header-bar><ion-content class=\"gradient padding has-header\"><ion-list class=\"card list\"><ion-item ng-repeat=\"source in sc track by $index\" ng-click=\"add_to_playlist(source)\"><div class=\"item-content item-button-right item-thumbnail-left\"><img src=\"{{source.artwork_url}}\" class=\"padding\"/><p>Title: \"{{source.title}}\" </p><p>Artist: \"{{source.user.username}}\"</p><p>Duration: \"{{source.duration}}\"</p><!-- a \"...\" button that opens a menu with secondary options for that song--><!--button.button.button-clear(ng-click=\"mediapicker_actionsheet(source)\")i.icon.ion-more--></div></ion-item></ion-list></ion-content></ion-view>");
$templateCache.put("player/player.html","<ion-view><ion-content class=\"gradient\"><ng-switch on=\"showPlayer\" ng-controller=\"PlayerCtrl\"><!--if the player has songs in it--><div ng-switch-when=\"true\" class=\"padding center-text player-view\"><!--the player	--><videogular vg-theme=\"playerServices.theme\" vg-player-ready=\"playerServices.onPlayerReady($API)\" vg-complete=\"playerServices.onCompleteItem()\" vg-auto-play=\"playerServices.autoplay\" class=\"videogular-container audio\"><vg-media vg-src=\"playerServices.sources\" vg-type=\"audio\"></vg-media></videogular><br/><br/><br/><img src=\"{{playerServices.trackCover}}\" class=\"cover-art\"/><p><strong>{{playerServices.trackTitle}}</strong><br/>{{playerServices.trackUser}}</p><br/><a ui-sref=\"channel.mediapicker\" class=\"button button-dark\">Add songs</a><!--a.button.button-full.button-dark(ui-sref=\"channel.playlist\") Modify the playlist--><br/><br/><button ng-click=\"nextSong()\" class=\"button button-clear\"> Skip this song</button><br/></div><!--if the player is empty--><br/><div ng-switch-default=\"ng-switch-default\" class=\"card padding center-text\"><br/><h3 class=\"title\">Oh, wait.</h3><p>There\'s no song in this playlist.</p><br/><a ui-sref=\"channel.mediapicker\" class=\"button button-dark\">Add songs</a></div></ng-switch></ion-content></ion-view>");
$templateCache.put("playlist/playlist.html","<ion-view view-title=\"Playlist\"><ion-content class=\"gradient\"><ion-list class=\"list\"><ion-item ng-repeat=\"#\" class=\"card item\"><button ng-click=\"doSomething()\"> </button><p>Title: \"source.title\"</p><p>Artist: \"source.user.username\"</p><p>Duration: \"source.duration\"</p></ion-item></ion-list></ion-content></ion-view>");
$templateCache.put("setName/setName.html","<ion-view view-title=\"\"><ion-content class=\"gradient\"><div class=\"list list-inset card padding center-text\"><h4>What is the channel\'s name?</h4><item class=\"item-input padding create-channel\"><input type=\"text\" placeholder=\"Type a name here.\" ng-model=\"channelName\" class=\"create-channel\"/></item><button ng-click=\"nameChannel(channelName)\" ng-init=\"channelName=random_name\" class=\"button button-dark button-full icon-right ion-chevron-right\">Choose starting time</button></div></ion-content></ion-view>");
$templateCache.put("setTimer/setTimer.html","<ion-view view-title=\"{{channelName}}\"><ion-content class=\"gradient\"><div ng-if=\"!doneLoading\" class=\"loader-center\"><div class=\"loader\"><i class=\"icon ion-loading-c\"></i></div></div><div style=\"text-align: center\" class=\"list list-inset card padding\"> <br/><h2>Commencing in...</h2><div class=\"row set-timer\"><div class=\"col\"><input type=\"number\" ng-model=\"startTimeHours\" min=\"0\" placeholder=\"0\" class=\"set-timer\"/></div><div class=\"col\"></div><div class=\"col\"><input type=\"number\" ng-model=\"startTimeMinutes\" min=\"0\" max=\"59\" placeholder=\"0\" class=\"set-timer\"/></div></div><div class=\"row\"><div class=\"col\"><span class=\"starting-time label\">hours</span></div><div class=\"col\"><span class=\"starting-time label\">and</span></div><div class=\"col\"><span class=\"starting-time label\">minutes</span></div></div><br/><br/><button ng-click=\"setTimer(startTimeHours, startTimeMinutes)\" ng-init=\"channelName=random_name\" class=\"button button-dark button-full\">Create {{channelName}}</button></div></ion-content></ion-view>");
$templateCache.put("soundcloud/callback.html","<body onload=\"window.opener.setTimeout(window.opener.SC.connectCallback, 1)\"><b style=\"width: 100%; text-align: center;\">\"This popup should automatically close in a few seconds\"</b></body>");
$templateCache.put("videolist/videolist.html","<ion-view view-title=\"Super Secret VideoList that controls the projector\"><ion-content class=\"gradient\"><ion-list><ion-item ng-repeat=\"clip in cliplist\" type=\"item-text-wrap\" ng-click=\"toggleClip(clip)\" class=\"item-remove-animate item-avatar item-icon-right\"><div ng-class=\"videoclip-active: {{clip.isActive}}\" class=\"card\"><h2>{{clip.video_key}}</h2><h2>it is {{clip.isActive}} that this clip is active<video width=\"320\" height=\"240\" controls=\"controls\" autoplay=\"autoplay\" loop=\"loop\"><source src=\"{{clip.src}}\" type=\"video/mp4\"/></video></h2><i class=\"icon ion-chevron-right icon-accessory\"></i></div></ion-item></ion-list></ion-content></ion-view>");
$templateCache.put("videoplayer/videoplayer.html","<ion-view><ion-content scroll=\"false\" class=\"darkbg has-header\"><ng-switch on=\"showVideoplayer\" ng-controller=\"VideoCtrl\"><div id=\"active-videoplayer\" ng-switch-when=\"true\"><videogular vg-player-ready=\"videoplayerServices.onVideoplayerReady($API)\" vg-complete=\"videoplayerServices.onCompleteItem()\" vg-auto-play=\"videoplayerServices.autoplay\" class=\"videogular-container video\"><vg-media id=\"videoplayer-container\" vg-src=\"videoplayerServices.sources\" vg-type=\"video\"></vg-media></videogular></div><div id=\"empty-videoplayer\" ng-switch-default=\"ng-switch-default\"><div class=\"padding\"><h2 class=\"novideoyet-text\">{{videoMessage}}</h2></div></div></ng-switch></ion-content><ion-footer ng-controller=\"VideoCtrl\"><button ng-click=\"videoplayerServices.API.toggleFullScreen()\" class=\"button button-large button-clear camera-icons icon ion-arrow-expand fullscreen-icon\"></button><a ui-sref=\"channel.videolist\" class=\"button button-large button-clear camera-icons icon ion-android-list videolist-icon\"></a><a ui-sref=\"channel.camera\" class=\"button button-large button-clear button-assertive icon ion-videocamera camera-icon\"></a></ion-footer></ion-view>");}]);