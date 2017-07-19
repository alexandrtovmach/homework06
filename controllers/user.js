var User = require('../services/user');
//
//
exports.getAllUser = function (req, res) {
	User.getAllUser(+req.params.cach, function (err, docs) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(docs);
	})
};
exports.createUser = function (req, res) {
	var user = {
        userNick: req.body.userNick,
        userName: req.body.userName
	};
	User.createUser(user, function (err) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.sendStatus(200);
	})
};