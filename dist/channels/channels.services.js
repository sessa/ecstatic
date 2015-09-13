angular.module("ecstatic.channels").factory("channelServices",["userNumberEventService","updatePlayerstateEventService","videoEventServices","socket","socketManager","$sce","ConfigService",function(e,n,t,a,s,c,i){var l={};return l.channels=[],a.on("update",function(a){l.getChannels().then(function(s){var c=l.getChannel(a.channel_id);e.broadcast(Object.keys(c.users).length),n.broadcast(c),t.broadcast(c.cliplist)})}),l.addToPlaylist=function(e,n){var t=l.getChannel(e);t.playlist.push(n);var a={msg:"update_channel",channel_info:t,channel_id:e};s.sendRequest(a)},l.setCountdownFinished=function(e){var n=(l.getChannel(e),{msg:"setCountdownFinished",channel_id:e});s.sendRequest(n)},l.toggleClip=function(e,n){for(var t=l.getChannel(e),a=0;a<t.cliplist.length;a++)if(t.cliplist[a].video_key===n.video_key){if(n.isActive){n.isActive=!1,t.cliplist[a]=n;break}n.isActive=!0,t.cliplist[a]=n;break}var c={msg:"update_channel",channel_info:t,channel_id:e};s.sendRequest(c)},l.getChannels=function(){var e={msg:"channelList"};a.on("channelList",function(e){l.setChannels(e),s.listener(e)});var n=s.sendRequest(e);return n},l.joinChannel=function(e){var n={msg:"join_channel",channel_id:e};s.sendRequest(n)},l.setChannels=function(e){var n=e.channelList;l.channels=[];for(var t=0;t<n.length;t++)n[t].player_state&&l.channels.push(n[t].player_state)},l.getChannel=function(e){for(var n=0;n<l.channels.length;n++){var t=l.channels[n];if(t.channel_id==e)return l.channels[n]}},l.setChannel=function(e){for(var n=0;n<l.channels.length;n++){var t=l.channels[n];t.channel_id==e.channel_id&&(l.channels[n].player_state=e)}},l.createChannel=function(e,n){var t={msg:"create_channel",channel_name:e,start_time:n};a.on("create_channel",function(e){l.channels.push(e.player_state),s.listener(e)});var c=s.sendRequest(t);return c},l}]).service("userNumberEventService",["$rootScope",function(e){this.broadcast=function(n){e.$broadcast("userNumber",n)},this.listen=function(n){e.$on("userNumber",n)}}]).service("updatePlayerstateEventService",["$rootScope",function(e){this.broadcast=function(n){e.$broadcast("playerstate",n)},this.listen=function(n){e.$on("playerstate",n)}}]);