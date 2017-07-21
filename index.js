const express = require('express');
const app = express();
const http = require('http').Server(app);
const db = require('./db');
const io = require('socket.io')(http);
//const chatControl = require('./controllers/comment');
//const userControl = require('./controllers/user');

app.use('/', express.static(__dirname + '/public'));

var connecters = [];
var messages = [];

io.on('connection', function (socket) {
    console.log('+1 connect');
	socket.on('chat message', function (mess) {
		messages.push(mess);
		socket.emit('sended message')
		io.emit('chat message', mess)
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
	
	socket.on('reconnect', function () {
		socket.emit('load users', connecters);
		socket.emit('chat history', messages);
	})
	
	socket.on('disconnect', function (socket) {
		console.log('-1 connect');
	});
    
});

http.listen(3128, function () {
	console.log('Chat started');
})


////connecting to mongodb
//db.connect('mongodb://localhost:27017/socket', function (err) {
//	if (err) {
//		return console.log(err);
//	}
//    http.listen(3128, function () {
//		console.log('Chat started');
//	})
//});