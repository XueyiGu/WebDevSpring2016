/**
 * Created by ceres on 2/18/16.
 */
(function()
{
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope, $q)
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
            //creates a Defered Object which represents a task which will finish in the future
            var deferred = $q.defer();
            $http
                .post('/api/assignment/user/', user)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByCredentials(username, password)
        {
            var deferred = $q.defer();
            $http
                .get('/api/assignment/user?username='+ username + '&password='+ password)
                .then(function(user){
                    console.log('user.service.client: '+user);
                    deferred.resolve(user);
                });
            return deferred.promise;
        }

        function updateUser(currentUser)
        {
            var deferred = $q.defer();
            $http
                .put('/api/assignment/user/' + currentUser._id, currentUser)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateUserByAdmin(username, user)
        {
            var deferred = $q.defer();
            $http
                .put('/api/assignment/user/update/'+username, user)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllUsers()
        {
            var deferred = $q.defer();
            $http
                .get('/api/assignment/user/findAllUsers')
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }


        function findUserByUsername(username)
        {
            var deferred = $q.defer();
            $http
                .get('/api/assignment/user?username=' + username)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteUserById(index)
        {
            var deferred = $q.defer();
            $http
                .delete('/api/assignment/user/'+index)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
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