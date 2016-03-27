var mock = require("./user.mock.json");
module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        findUserByName: findUserByName,
        findUsersByIds: findUsersByIds,
        findAllUsers: findAllUsers,
        updateUser: updateUser,
        deleteUserById: deleteUserById
    };
    return api;

    function deleteUserById(index)
    {
        mock.splice(index, 1);
        return mock;
    }

    function updateUser(userId, newUser)
    {
        for(var u in mock)
        {
            if(mock[u]._id == newUser._id)
            {
                mock[u] = newUser;
                return mock[u];
            }
        }
        return null;
    }

    function findAllUsers()
    {
        return mock;
    }

    function findUsersByIds (userIds) {
        var users = [];
        for (var u in userIds) {
            var user = findUserById (userIds[u]);
            if (user) {
                users.push ({
                    username: user.username,
                    _id: user._id
                });
            }
        }
        return users;
    }

    function findUserByName(userName)
    {
        for(var u in mock){
            if(mock[u].username == userName){
                return mock[u];
            }
        }
        return null;
    }

    function findUserById(userId) {
        for(var u in mock) {
            if( mock[u]._id === userId ) {
                return mock[u];
            }
        }
        return null;
    }

    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return user;
    }

    function findUserByCredentials(credentials) {
        for(var u in mock) {
            if( mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;
    }
};