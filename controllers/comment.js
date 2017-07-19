var Comment = require('../services/comment');
var io = require('../index.js');


exports.showAllComments = function (count) {
	console.log(count);
	Comment.showAllComments(count, function (err, docs) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
        io.emit('take new messages', docs);
	})
};
//
// exports.showOneComment = function (req, res) {
//     Comment.showOneComment(+req.params.dateOfPost, function (err, docs) {
//         if (err) {
//             console.log(err);
//             return res.sendStatus(500);
//         }
//         res.send(docs);
//     })
// };

exports.createComment = function (req, res) {
	var comment = {
        userNick: req.body.userNick,
        userName: req.body.userName,
        reciverNick: req.body.reciverNick,
        textMessage: req.body.textMessage,
		dateOfPost: Date.now()
	};
	Comment.createComment(comment, function (err) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(comment);
	})
};
//
// exports.editComment = function (req, res) {
// 	var editedComment = {
// 		senderId: +req.body.senderId,
// 		reciverId: +req.body.reciverId,
// 		textContent: req.body.textContent,
// 		dateOfPost: Date.now()
// 	};
// 	Comment.editComment(+req.params.dateOfPost, editedComment, function (err) {
// 		if (err) {
// 			console.log(err)
// 			return res.sendStatus(500);
// 		}
// 		res.sendStatus(200)
// 	})
// };
//
// exports.deleteComment = function (req, res) {
// 	Comment.deleteComment(+req.params.dateOfPost, function (err) {
// 		if (err) {
// 			console.log(err);
// 			return res.sendStatus(500);
// 		}
// 		res.sendStatus(200)
// 	})
// };
//
// exports.showReciversById = function (req, res) {
// 	Comment.showReciversById(+req.params.id, function (err, docs) {
// 		if (err) {
// 			console.log(err);
// 			return res.sendStatus(500);
// 		}
// 		res.send(docs);
// 	})
// };
