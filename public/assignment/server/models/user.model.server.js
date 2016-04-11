var q = require("q");

module.exports = function(mongoose, db) {

    var UserSchema = require('./user.schema.server.js')(mongoose);
    var userModel = mongoose.model("userModel", UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findOne: findOne,
        createUser: createUser,
        findUserById: findUserById,
        findUserByName: findUserByName,
        findUsersByIds: findUsersByIds,
        findAllUsers: findAllUsers,
        updateUser: updateUser,
        updateUserByAdmin: updateUserByAdmin,
        deleteUserById: deleteUserById
    };
    return api;

    function deleteUserById(userId)
    {
        var deferred = q.defer();
        userModel.remove({_id: userId},function(err, users){
            if(err){
                deferred.reject(err);
            }
            else{
                userModel.find(function(err, users){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(users);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, newUser)
    {
        //return userModel.update({_id: userId}, {$set: newUser});
        var deferred = q.defer();
        userModel.update({_id: userId}, {$set: newUser}, function(err, user) {
            if(err){
                deferred.reject(err);
            }else{
                userModel.find({_id: userId},function(err, user){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(user);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function updateUserByAdmin(userId, newUser){
        return userModel.update({_id: userId},
            {username: newUser.username,
            password: newUser.password,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            roles: newUser.roles});
    }

    function findAllUsers()
    {
        var deferred = q.defer();
        userModel.find(function(err, users){
            if(err){
                deferred.reject(err);
                console.log("find all courses errors: " + err);
            }
            else{
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findUsersByIds (userIds) {
        var deferred = q.defer();
        userModel.find({_id: userIds}, function(err, users){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByName(userName)
    {
        var deferred = q.defer();
        userModel.findOne({username: userName}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        userModel.findById({_id: userId}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        userModel.create(user, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        userModel.findOne({username: credentials.username, password: credentials.password}, function(err, user){
            if(err){
                console.log(err);
                deferred.reject(err);
            }
            else{
                console.log('findUserByCredentials '+user);
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }
    function findOne(credentials) {
        var deferred = q.defer();
        userModel.findOne({username: credentials.username}, function(err, user){
            if(err){
                console.log(err);
                deferred.reject(err);
            }
            else{
                console.log('find one '+user);
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

};