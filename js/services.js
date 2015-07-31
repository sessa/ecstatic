angular.module('services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Silent Disco Squad',
    lastText: 'Ready to groove?',
    face: 'https://goo.gl/Jix8qP',
    url: 'https://soundcloud.com/kizma/rmfstar-kizma-takethemountain-silent-disco-mix'
  }, {
    id: 1,
    name: 'Sunset Warriors',
    lastText: '',
    face: 'http://goo.gl/6EzYGo'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
