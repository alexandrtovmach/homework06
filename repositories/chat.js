var db = require('../db');


//chat actions in db
exports.findAllComments = function (callback) {
    db.get().collection('chat').find().sort({dateOfPost: 1}).toArray(function (err, docs) {
        callback(err, docs)
    })
};

exports.dropDatabase = function (callback) {
    db.get().dropDatabase(function (err, docs) {
        callback(err, docs)
    })
};

exports.addOneComment = function (comment, callback) {
    db.get().collection('chat').insertOne(comment, function (err, docs) {
        callback(err, docs)
    })
};
