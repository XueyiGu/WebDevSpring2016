/**
 * Created by ceres on 3/16/16.
 */
module.exports = function(app, mongoose, db) {
    var userModel    = require("./models/user.model.server.js")(mongoose, db);
    var formModel   = require("./models/form.model.server.js")(mongoose, db);
    var fieldModel   = require("./models/field.model.server.js")(mongoose, db);

    var userService  = require("./services/user.service.server.js") (app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, fieldModel);
}