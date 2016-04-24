/**
 * Created by ceres on 4/20/16.
 */
module.exports = function(mongoose) {
    var MenuSchema = mongoose.Schema({
        "name" : String,
        "price": {type: Number, default: 0.0},
        "display": {type: Boolean, default: true},
        "created" : {type: Date, default: Date.now()},
        "restaurant_id": String,
        "username": String
    }, {collection: "project.menu"});

    return MenuSchema;
};