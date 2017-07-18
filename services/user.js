var dbBridge = require('../repositories/user');
//
exports.getAllUser = function (cache, callback) {
    dbBridge.findAllUsers(cache, function (err, docs) {
		callback(err, docs)
	})
};
//
// exports.getUserById = function (id, callback) {
//     dbBridge.findOneUser(id, function (err, docs) {
//         callback(err, docs)
//     })
// };
//
exports.createUser = function (user, callback) {
    dbBridge.addOneUser(user, function (err, docs) {
        callback(err, docs)
    })
};
//
// exports.updateUser = function (id, newUser, callback) {
//     dbBridge.updateOneUser(id, newUser, function (err, docs) {
//         callback(err, docs)
//     })
// };
//
// exports.deleteUser = function (id, callback) {
//     dbBridge.removeOneUser(id, function (err, docs) {
//         callback(err, docs)
//     })
// }