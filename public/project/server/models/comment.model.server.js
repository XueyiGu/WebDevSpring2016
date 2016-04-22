/**
 * Created by ceres on 4/20/16.
 */
var q = require("q");

module.exports = function(mongoose, db) {

    var CommentSchema = require('./comment.schema.server.js')(mongoose);
    var commentModel = mongoose.model("commentModel", CommentSchema);

    var api = {
    };
    return api;


};