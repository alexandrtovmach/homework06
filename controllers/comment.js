var Comment = require('../services/comment');


exports.showAllComments = Comment.showAllComments;

exports.createComment = Comment.createComment;


exports.cleanUp = function (req, res) {
    Comment.cleanUp(function (err) {
        if (err) {
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
};