/**
 * Created by ceres on 4/20/16.
 */
var q = require("q");

module.exports = function(mongoose, db) {

    var MenuSchema = require('./menu.schema.server.js')(mongoose);
    var menuModel = mongoose.model("menuModel", MenuSchema);

    var RestaurantSchema = require('./restaurant.schema.server.js')(mongoose);
    var restaurantModel = mongoose.model("menuRestaurantModel", RestaurantSchema);

    var UserSchema = require('./user.schema.server.js')(mongoose);
    var userModel = mongoose.model("menuUserModel", UserSchema);

    var api = {
        updateMenu: updateMenu,
        deleteMenu: deleteMenu
    };
    return api;

    function updateMenu(menu){
        var deferred = q.defer();
            restaurantModel.update({id: menu.restaurant_id},
                {$push: {menus: menu}},
                {upsert: true, new: true},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    userModel.update({username: menu.username},
                        {$push: {menus: menu}},
                        {upsert: true, new: true}, function(err, doc){
                            if(err){
                                deferred.reject(err);
                            }else{
                                deferred.resolve(doc);
                            }
                        });
                }
            });
        return deferred.promise;
    }

    function deleteMenu(menu){
        var deferred = q.defer();
        console.log(menu);
        restaurantModel.findOne({id: menu.restaurant_id},
            function(err, restaurant) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    for (var i = 0; i <  restaurant.menus.length; i++) {
                        if (restaurant.menus[i].name == menu.name &&
                            restaurant.menus[i].price == menu.price &&
                            restaurant.menus[i].restaurant_id == menu.restaurant_id &&
                            restaurant.menus[i].username == menu.username) {
                            restaurant.menus.splice(i, 1);
                        }
                    }
                    restaurant.save();
                    deferred.resolve(restaurant.menus);
                }
            }
        );
        userModel.findOne({username: menu.username},
            function(err, user){
                if(err){
                    deferred.reject(err);
                }else{
                    for (var i in user.menus) {
                        if (user.menus[i]._id == menu._id) {
                            user.menus.splice(i, 1);
                        }
                    }
                    user.save();
                    deferred.resolve(user.menus);
                }
            });
        return deferred.promise;
    }

};