const express = require('express');
const app = express();
const http = require('http').Server(app);
const db = require('mongodb');
const io = require('socket.io')(http);
const chatControl = require('./controllers/comment');
const userControl = require('./controllers/user');

app.use('/', express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    console.log('+1 connect');
    socket.on('chat message', chatControl.showAllComments);
});















//connecting to mongodb
db.connect('mongodb://localhost:27017/ajax', function (err) {
	if (err) {
		return console.log(err);
	}
    http.listen(3128, function () {
		console.log('Chat started');
	})
});

module.exports = io;