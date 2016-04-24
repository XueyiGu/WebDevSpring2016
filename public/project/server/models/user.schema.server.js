/**
 * Created by ceres on 4/1/16.
 */
module.exports = function(mongoose) {
    var commentSchema = require("./comment.schema.server.js")(mongoose);
    var menuSchema = require("./menu.schema.server.js")(mongoose);
    var UserSchema = mongoose.Schema({
        "username" : String,
        "password": String,
        "firstName" : String,
        "lastName" : String,
        "emails" : [String],
        "phones" : [String],
        "roles": [String],
        "comments":[commentSchema],
        "menus": [menuSchema]
    }, {collection: "project.user"});

    return UserSchema;
};