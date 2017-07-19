var db = require('../db');


//chat actions in db
exports.findAllComments = function (cache, callback) {
    db.get().collection('chat').find().sort({dateOfPost: 1}).toArray(function (err, docs) {
        docs = docs.splice(cache, docs.length);
        callback(err, docs)
    })
};
exports.addOneComment = function (comment, callback) {
    db.get().collection('chat').insertOne(comment, function (err, docs) {
        callback(err, docs)
    })
};