/**
 * Created by Alexandr on 18.07.2017.
 */
var db = require('../db');
//
// //users actions in db
exports.findAllUsers = function (callback) {
    db.get().collection('users').find().toArray(function (err, docs) {
        callback(err, docs)
    })
};
//
// exports.findOneUser = function (id, callback) {
//     db.get().collection('users').findOne({ userId: id }, function (err, docs) {
//         callback(err, docs)
//     })
// };
//
exports.addOneUser = function (user, callback) {
    db.get().collection('users').insertOne(user, function (err, docs) {
        callback(err, docs)
    })
};
//
// exports.updateOneUser = function (id, newUser, callback) {
//     db.get().collection('users').updateOne({userId: id}, newUser, function (err, docs) {
//         callback(err, docs)
//     });
// };
//
//
// exports.removeOneUser = function (id, callback) {
//     db.get().collection('users').removeOne({userId: id}, function (err, docs) {
//         callback(err, docs)
//     })
// };