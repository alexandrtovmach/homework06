var dbBridge = require('../repositories/chat');

exports.showAllComments = function (callback) {
   dbBridge.findAllComments(function (err, docs) {
       callback(err, docs)
   })
};

exports.cleanUp = function (callback) {
   dbBridge.dropDatabase(function (err, docs) {
       callback(err, docs)
   })
};

exports.createComment = function (comment, callback) {
    dbBridge.addOneComment(comment, function (err, docs) {
        callback(err, docs)
    })
};





