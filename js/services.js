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
		rooms: function() {
			 //gimme the rooms
			var socket = io('http://localhost:8080/');
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
                console.log("room created");
               	return data;
            });
		}
	};
});
