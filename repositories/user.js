/**
 * Created by Alexandr on 18.07.2017.
 */
var db = require('../db');

// //users actions in db
exports.findAllUsers = function (cache, callback) {
    db.get().collection('users').find().toArray(function (err, docs) {
        docs = docs.splice(cache, docs.length);
        callback(err, docs)
    })
};
exports.addOneUser = function (user, callback) {
    db.get().collection('users').insertOne(user, function (err, docs) {
        callback(err, docs)
    })
};
