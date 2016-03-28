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
            updateUserByAdmin: updateUserByAdmin,

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

        function updateUserByAdmin(username, user)
        {
            return $http.put('/api/assignment/user/update/'+username, user);
        }

        function findAllUsers()
        {
            return $http.get('/api/assignment/user/findAllUsers');
        }


        function findUserByUsername(username)
        {
            return $http.get('/api/assignment/user?username=' + username);
        }

        function deleteUserById(index)
        {
            return $http.delete('/api/assignment/user/'+index);
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