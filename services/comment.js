var dbBridge = require('../repositories/chat');

exports.showAllComments = function (cache, callback) {
   dbBridge.findAllComments(cache, function (err, docs) {
       callback(err, docs)
   })
};
exports.createComment = function (comment, callback) {
    dbBridge.addOneComment(comment, function (err, docs) {
        callback(err, docs)
    })
};
exports.cleanUp = function (callback) {
    dbBridge.dropDatabase(function (err, docs) {
        callback(err, docs)
    })
};



