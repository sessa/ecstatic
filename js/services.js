angular.module('services', ['btford.socket-io'])

.factory('socket', function (socketFactory) {
  return socketFactory({
  	ioSocket: io.connect('http://localhost:8080/')
  });
})

.factory('Chats', function (socket) {

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
		rooms: function() {
			 //gimme the rooms

			socket.emit('rooms');
			socket.on('rooms', function (data) {
                console.log("data="+JSON.stringify(data));
                return data;
            });
		},
		remove: function(chat) {
			chats.splice(chats.indexOf(chat), 1);
		},
		create_room: function(room_name) {
            socket.emit('create_room', {room_name: "testy_room"});
            socket.on('create_room', function (data) {
                console.log("room created, data="+data);
               	return data;
            });
		}
	};
});
