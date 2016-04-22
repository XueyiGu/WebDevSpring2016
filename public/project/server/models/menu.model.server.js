/**
 * Created by ceres on 4/20/16.
 */
var q = require("q");

module.exports = function(mongoose, db) {

    var MenuSchema = require('./menu.schema.server.js')(mongoose);
    var menuModel = mongoose.model("menuModel", MenuSchema);

    var api = {
    };
    return api;


};