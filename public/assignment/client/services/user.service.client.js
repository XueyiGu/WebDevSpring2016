/**
 * Created by ceres on 2/18/16.
 */
(function()
{
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope)
    {
        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,

            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById,

            setCurrentUser : setCurrentUser,
            getCurrentUser: getCurrentUser
        };

        return api;

        function createUser(user)
        {
            return $http.post('/api/assignment/user/', user);
        }

        function findUserByCredentials(username, password)
        {
            return $http.get('/api/assignment/user?username='+ username + '&password='+ password);
        }

        function updateUser(currentUser)
        {
            return $http.put('/api/assignment/user/' + currentUser._id, currentUser);
        }

        function findAllUsers()
        {
            return $http.get('/api/assignment/user/findAllUsers');
        }


        function findUserByUsername(username)
        {
            return $http.get('/api/assignment/user?username=' + username);
        }

        function deleteUserById(userId, callback)
        {

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