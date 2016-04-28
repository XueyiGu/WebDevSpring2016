/**
 * Created by ceres on 4/20/16.
 */
var q = require("q");

module.exports = function(mongoose, db) {

    var CommentSchema = require('./comment.schema.server.js')(mongoose);
    var commentModel = mongoose.model("commentModel", CommentSchema);

    var RestaurantSchema = require('./restaurant.schema.server.js')(mongoose);
    var restaurantModel = mongoose.model("commentRestaurantModel", RestaurantSchema);

    var UserSchema = require('./user.schema.server.js')(mongoose);
    var userModel = mongoose.model("commentUserModel", UserSchema);

    var api = {
        updateComment: updateComment,
        deleteComment: deleteComment
    };
    return api;

    function updateComment(comment){
        console.log('In comment model server');
        var deferred = q.defer();
        restaurantModel.update({id: comment.restaurant_id},
            {$push: {'comments': comment}},
            {upsert: true, new: true},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    console.log("I can be at model.server");
                    userModel.update({username: comment.username},
                        {$push: {comments: comment}},
                        {upsert: true, new: true},
                        function(err, doc){
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

    function deleteComment(comment){
        var deferred = q.defer();
        restaurantModel.findOne({id: comment.restaurant_id},
            function(err, restaurant) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    for (var i = 0; i <  restaurant.comments.length; i++) {
                        if (restaurant.comments[i].title == comment.title &&
                            restaurant.comments[i].detail == comment.detail &&
                            restaurant.comments[i].restaurant_id == comment.restaurant_id &&
                            restaurant.comments[i].username == comment.username) {
                            restaurant.comments.splice(i, 1);
                        }
                    }
                    restaurant.save();
                    deferred.resolve(restaurant.comments);
                }
            }
        );
        userModel.findOne({username: comment.username},
            function(err, user){
                if(err){
                    deferred.reject(err);
                }else{
                    for (var i in user.comments) {
                        if (user.comments[i]._id == comment._id) {
                            user.comments.splice(i, 1);
                        }
                    }
                    user.save();
                    deferred.resolve(user.comments);
                }
            });
        return deferred.promise;
    }

};