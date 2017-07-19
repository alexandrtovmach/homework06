var Comment = require('../services/comment');


exports.showAllComments = function (req, res) {
	Comment.showAllComments(+req.params.cach, function (err, docs) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(docs);
	})
};

exports.createComment = function (req, res) {
	var comment = {
        userNick: req.body.userNick,
        userName: req.body.userName,
        reciverNick: req.body.reciverNick,
        textMessage: req.body.textMessage,
		dateOfPost: Date.now()
	};
	Comment.createComment(comment, function (err, docs) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(comment);
	})
};