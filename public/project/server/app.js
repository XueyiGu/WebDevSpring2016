/**
 * Created by ceres on 4/4/16.
 */
module.exports = function(app, yelp, mongoose, db, passport, LocalStrategy) {
    var userModel    = require("./models/user.model.server.js")(mongoose, db);
    var restaurantModel    = require("./models/restaurant.model.server.js")(mongoose, db);
    var commentModel    = require("./models/comment.model.server.js")(mongoose, db);
    var menuModel    = require("./models/menu.model.server.js")(mongoose, db);

    var userService  = require("./services/user.service.server.js") (app, userModel, passport, LocalStrategy);
    var restaurantService  = require("./services/restaurant.service.server.js") (app, yelp, restaurantModel);
}