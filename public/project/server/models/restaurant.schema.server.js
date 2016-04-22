/**
 * Created by ceres on 4/20/16.
 */
module.exports = function(mongoose) {
    var commentSchema = require("./comment.schema.server.js")(mongoose);
    var menuSchema = require("./menu.schema.server.js")(mongoose);
    var RestaurantSchema = mongoose.Schema({
        "id" : String,
        "name": String,
        "image_url" : String,
        "rating_img_url_large" : String,
        "review_count" : [String],
        "comments" : [commentSchema],
        "menus": [menuSchema],
        "comments":[commentSchema],
        "user_id": String
    }, {collection: "project.restaurant"});

    return RestaurantSchema;
};