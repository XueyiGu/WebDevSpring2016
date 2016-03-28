/**
 * Created by ceres on 2/26/16.
 */

(function()
{
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope, $http, $q)
    {
        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById
        };

        return service;

        function createFormForUser(userId, form)
        {
            var deferred = $q.defer();
            $http
                .post('/api/assignment/user/'+userId+'/form', form)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllFormsForUser(userId)
        {
            var deferred = $q.defer();
            $http
                .get('/api/assignment/user/'+userId+'/form')
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFormById(index)
        {
            var deferred = $q.defer();
            $http
                .delete('/api/assignment/form/' + index)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateFormById(formId, newForm)
        {
            var deferred = $q.defer();
            if(!formId)
            {
                console.log("formId is null");
            }
            $http
                .put('/api/assignment/form/' + formId, newForm)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findFormById(formId){
            var deferred = $q.defer();
            $http
                .get('/api/assignment/form/' + formId)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();