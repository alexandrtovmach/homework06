var db = require('../db');


//chat actions in db
exports.findAllComments = function (cache, callback) {
    db.get().collection('chat').find().sort({dateOfPost: 1}).toArray(function (err, docs) {
        docs = docs.splice(cache, docs.length);
        callback(err, docs)
    })
};
//
// exports.findOneComment = function (dateOfPost, callback) {
//     db.get().collection('comments').find({dateOfPost: dateOfPost}, function (err, docs) {
//         callback(err, docs)
//     })
// };

exports.addOneComment = function (comment, callback) {
    db.get().collection('chat').insertOne(comment, function (err, docs) {
        callback(err, docs)
    })
};
//
// exports.updateOneComment = function (dateOfPost, editedComment, callback) {
//     db.get().collection('comments').updateOne({dateOfPost: dateOfPost}, editedComment, function (err, docs) {
//         callback(err, docs)
//     })
// };
//
// exports.removeOneComment = function (dateOfPost, callback) {
//     db.get().collection('comments').removeOne({dateOfPost: dateOfPost}, function (err, docs) {
//         callback(err, docs)
//     })
// };
//
// exports.findAllContacts = function (id, callback) {
//     db.get().collection('comments').find({ $or: [{ senderId: id }, {reciverId: id}]}, {_id: 0}).toArray(function (err, docs) {
//         callback(err, docs)
//     });
// };