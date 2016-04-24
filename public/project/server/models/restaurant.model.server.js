/**
 * Created by ceres on 4/19/16.
 */
var q = require("q");

module.exports = function(mongoose, db) {

    var RestaurantSchema = require('./restaurant.schema.server.js')(mongoose);
    var restaurantModel = mongoose.model("projectRestaurantModel", RestaurantSchema);

    var api = {
        searchRestaurantById: searchRestaurantById,
        createRestaurant: createRestaurant,
        updateComment: updateComment,
        updateMenu: updateMenu
    };
    return api;

    function searchRestaurantById(restaurantId) {
        var deferred = q.defer();
        restaurantModel.find({'id': restaurantId},function(err, restaurant){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(restaurant);
            }
        });
        return deferred.promise;
    }

    function createRestaurant(restaurant){
        var deferred = q.defer();
        restaurantModel.create(restaurant, function(err, restaurant){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(restaurant);
            }
        });
        return deferred.promise;
    }

    function updateMenu(restaurantId, menu){
        var deferred = q.defer();
        restaurantModel.update({id: restaurantId},
            {$push: {menus: menu}},
            {upsert: true, new: true},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function updateComment(restaurantId, comment){
        var deferred = q.defer();
        restaurantModel.update({id: restaurantId},
            {$push: {comments: comment}},
            {upsert: true, new: true},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function createField(formid, field){
        var deferred = q.defer();
        formModel.update({_id: formid},
            {$push: {fields: field}},
            {upsert: true, new: true},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
};