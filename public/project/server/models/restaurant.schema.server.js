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
        "review_count" : String,
        "menus": [menuSchema],
        "comments":[commentSchema],
        "snippet_text": String,
        "location": {
                "address": [String],
                "city": String,
                "display_address": [String],
                "neighborhoods":[String]}

    }, {collection: "project.restaurant"});

    return RestaurantSchema;
};