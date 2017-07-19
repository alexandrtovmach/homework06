const express = require('express');
const app = express();
const http = require('http').Server(app);
const db = require('./db');
const io = require('socket.io')(http);
const chatControl = require('./controllers/comment');
const userControl = require('./controllers/user');

app.use('/', express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    console.log('+1 connect');
    socket.on('check new message', function (count) {
        console.log('sync');
    	chatControl.showAllComments(count, function (err, docs) {
            if (err) {
                console.log(err);
            }
            io.emit('take new messages', docs);
        })
    });

    socket.on('send new message', function (message) {
        console.log('post');
		message.dateOfPost = Date.now();
        chatControl.createComment(message, function (err, docs) {
            if (err) {
                console.log(err);
            }
            io.emit('take new messages', docs.ops);
        })
    });

    socket.on('getAllUserReservedNicks', function (count) {
        console.log('getNicks');
        userControl.getAllUser(count, function (err, docs) {
            if (err) {
                console.log(err);
            }
            io.emit('reservedNicks', docs);
        })
    });
    socket.on('new user', function (user) {
        console.log('new user');
        userControl.createUser(user, function (err, docs) {
            if (err) {
                console.log(err);
            }
            io.emit('reservedNicks', docs.ops);
            io.emit('new user');
        })
    });
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