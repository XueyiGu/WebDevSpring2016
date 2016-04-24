/**
 * Created by ceres on 2/18/16.
 */
(function()
{
    "use strict";
    angular
        .module("PriceMatchApp")
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

            getCurrentUser: getCurrentUser,
            logout: logout,

            addMenu: addMenu,
            addComment: addComment
        };

        return api;

        function createUser(user)
        {
            //creates a Defered Object which represents a task which will finish in the future
            var deferred = $q.defer();
            $http
                .post('/api/project/register', user)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByCredentials(username, password)
        {
            var deferred = $q.defer();
            $http
                .post('/api/project/user?username='+ username + '&password='+ password)
                .then(function(user){
                    console.log('user.service.client: '+user);
                    deferred.resolve(user);
                });
            return deferred.promise;
        }

        function updateUser(userId, currentUser)
        {
            var deferred = $q.defer();
            $http
                .put('/api/project/user/' + userId, currentUser)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateUserByAdmin(userId, user)
        {
            var deferred = $q.defer();
            $http
                .put('/api/project/user/updateUserByAdmin/'+userId, user)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllUsers()
        {
            var deferred = $q.defer();
            $http
                .get('/api/project/user/findAllUsers')
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }


        function findUserByUsername(username)
        {
            var deferred = $q.defer();
            $http
                .get('/api/project/user?username=' + username)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteUserById(userId)
        {
            var deferred = $q.defer();
            $http
                .delete('/api/project/user/'+userId)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getCurrentUser()
        {
            var deferred = $q.defer();
            $http
                .get('/api/project/loggedin')
                .then(function(user){
                    deferred.resolve(user);
                });
            return deferred.promise;
        }

        function logout(){
            var deferred = $q.defer();
            $http.post('/api/project/logout')
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function addMenu(menu){
            var deferred = $q.defer();
            $http.post('/api/project/user/addMenu', menu)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function addComment(comment){
            var deferred = $q.defer();
            $http.post('/api/project/user/addComment', comment)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();