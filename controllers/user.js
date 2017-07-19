var User = require('../services/user');
//
//
exports.getAllUser = User.getAllUser;
//
// exports.getUserById = function (req, res) {
// 	User.getUserById(+req.params.id, function (err, docs) {
// 		if (err) {
// 			console.log(err);
// 			return res.sendStatus(500);
// 		}
// 		res.send(docs);
// 	})
// }
//
exports.createUser = User.createUser;
//
// exports.updateUser = function (req, res) {
// 	var newUser = {
// 		name: req.body.name,
// 		email: req.body.email,
// 		userId: +req.body.userId
// 	};
// 	User.updateUser(+req.params.id, newUser, function (err) {
// 		if (err) {
// 			console.log(err)
// 			return res.sendStatus(500);
// 		}
// 		res.sendStatus(200)
// 	})
// }
//
// exports.deleteUser = function (req, res) {
// 	User.deleteUser(+req.params.id, function (err) {
// 		if (err) {
// 			console.log(err);
// 			return res.sendStatus(500);
// 		}
// 		res.sendStatus(200)
// 	})
// }