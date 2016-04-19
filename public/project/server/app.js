/**
 * Created by ceres on 4/4/16.
 */
module.exports = function(app, yelp) {
    //var userModel    = require("./models/user.model.server.js")(mongoose, db);
    //
    //var userService  = require("./services/user.service.server.js") (app, userModel, passport, LocalStrategy);
    var restaurantService  = require("./services/restaurant.service.server.js") (app, yelp);
}