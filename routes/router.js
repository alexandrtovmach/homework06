/**
 * Created by Alexandr on 16.07.2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var userControl = require('../controllers/user');
var chatControl = require('../controllers/comment');
var statPath = path.normalize(__dirname + '/../public');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(statPath));

app.all('*', function (req, res ,next) {
    console.log('connect' + String(Date.now()).slice(-3));
    next();
});
////user operations
app.get('/user:cach', userControl.getAllUser)
//
//app.get('/users/:id', userControl.getUserById)
//
app.post('/user/create', userControl.createUser)
//
//app.put('/users/:id', userControl.updateUser)
//
//app.delete('/users/:id', userControl.deleteUser)
//



// //chat.js operations
app.get('/chat:cach', chatControl.showAllComments);
//
// app.get('/chat/:dateOfPost', chatControl.showOneComment)
//
app.post('/chat', chatControl.createComment);
//
// app.put('/chat/:dateOfPost', chatControl.editComment)
//
// app.delete('/chat/:dateOfPost', chatControl.deleteComment)
//
// app.get('/chat/contacts/:id', chatControl.showReciversById)


module.exports = app;