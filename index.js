const express = require('express');
const app = express();
const http = require('http').Server(app);
const db = require('./db');
const io = require('socket.io')(http);
const chatControl = require('./controllers/comment');
const userControl = require('./controllers/user');

app.use('/', express.static(__dirname + '/public'));

app.get('/cleanup', chatControl.cleanUp);

io.on('connection', function (socket) {
    console.log('+1 connect');
    socket.on('check new message', function () {
    	chatControl.showAllComments(function (err, docs) {
            if (err) {
                console.log(err);
            }
			socket.emit('take new messages', docs);
        })
    });

    socket.on('send new message', function (message) {
		message.dateOfPost = Date.now();
        chatControl.createComment(message, function (err, docs) {
            if (err) {
                console.log(err);
            }
            socket.emit('take new messages', docs.ops);
            socket.broadcast.emit('take new messages', docs.ops);
        })
    });

    socket.on('getAllUserReservedNicks', function () {
        userControl.getAllUser(function (err, docs) {
            if (err) {
                console.log(err);
            }
            socket.emit('reservedNicks', docs);
        })
    });
    socket.on('new user', function (user) {
        userControl.createUser(user, function (err, docs) {
            if (err) {
                console.log(err);
            }
            socket.emit('new user', docs.ops);
            socket.broadcast.emit('reservedNicks', docs.ops);
        })
    });
});



//connecting to mongodb
db.connect('mongodb://localhost:27017/socket', function (err) {
	if (err) {
		return console.log(err);
	}
    http.listen(3128, function () {
		console.log('Chat started');
	})
});