/**
 * Created by ceres on 4/20/16.
 */
module.exports = function(mongoose) {
    var CommentSchema = mongoose.Schema({
        "title" : String,
        "detail": String,
        "created": {type: Date, default: Date.now()},
        "restaurant_id": String,
        "username": String
    }, {collection: "project.comment"});

    return CommentSchema;
};