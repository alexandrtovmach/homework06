var dbBridge = require('../repositories/user');
//
exports.getAllUser = function (callback) {
    dbBridge.findAllUsers(function (err, docs) {
		callback(err, docs)
	})
};

exports.createUser = function (user, callback) {
    dbBridge.addOneUser(user, function (err, docs) {
        callback(err, docs)
    })
};
