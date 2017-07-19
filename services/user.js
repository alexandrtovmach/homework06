var dbBridge = require('../repositories/user');

exports.getAllUser = function (cache, callback) {
    dbBridge.findAllUsers(cache, function (err, docs) {
		callback(err, docs)
	})
};
exports.createUser = function (user, callback) {
    dbBridge.addOneUser(user, function (err, docs) {
        callback(err, docs)
    })
};