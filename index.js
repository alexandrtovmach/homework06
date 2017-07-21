const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use('/', express.static(__dirname + '/public'));

var connecters = [];
var messages = [];

io.on('connection', function (socket) {
    console.log('+1 connect');
	socket.emit('load users', connecters);
	socket.emit('chat history', messages);
	
	socket.on('chat message', function (mess) {
		messages.push(mess)
		socket.emit('sended message')
		io.emit('chat message', mess)
	})
	
	socket.on('get users', function () {
		socket.emit('get users', connecters)
	})
	
	socket.on('new user', function (user) {
		connecters.push(user)
		socket.emit('created user');
		socket.emit('load users', connecters);
		socket.emit('chat history', messages);
		socket.broadcast.emit('new user', user);
	})
	
	socket.on('typing', function (nick) {
		socket.broadcast.emit('typing', nick)
	})
	
	socket.on('end typing', function (nick) {
		socket.broadcast.emit('end typing', nick)
	})
	socket.on('offline', function (nick) {
		socket.broadcast.emit('offline', nick);
	})
	
	
	socket.on('disconnect', function () {
		console.log('-1 connect');
	});
    
});

http.listen(3128, function () {
	console.log('Chat started');
})