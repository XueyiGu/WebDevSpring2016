/**
 * Created by ceres on 4/20/16.
 */
module.exports = function(mongoose) {
    var CommentSchema = mongoose.Schema({
        "title" : String,
        "detail": String,
        "created": {type: Date, default: Date.now()}
    }, {collection: "project.comment"});

    return CommentSchema;
};