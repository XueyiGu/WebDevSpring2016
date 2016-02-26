/**
 * Created by ceres on 2/18/16.
 */
(function()
{
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope)
    {
        var users = [
                {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "roles": ["student"]		},
                {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "roles": ["admin"]		},
                {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": ["faculty"]		},
                {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "roles": ["student"]		}
            ];

        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };

        return service;

        function findUserByCredentials(credentials)
        {
            for (var u in users) {
                if (users[u].username === credentials.username &&
                    users[u].password === credentials.password) {
                    return users[u];
                }
            }
            return null;
        }

        function findAllUsers(callback)
        {
            callback(users);
        }

        function createUser(user)
        {
            var u = {
                username: user.username,
                password: user.password
            };
            users.push(u);
            return u;
        }

        function deleteUserById(userId, callback)
        {

        }


        function updateUser(currentUser)
        {
            var user = findUserByCredentials (currentUser.username);
            if (user != null) {
                user.firstName = currentUser.firstName;
                user.lastName = currentUser.lastName;
                user.password = currentUser.password;
                    return user;
            } else {
                return null;
            }
        }

        function setCurrentUser (user)
        {
            $rootScope.currentUser = user;
        }

        function getCurrentUser()
        {
            return $rootScope.currentUser;
        }
    }
})();