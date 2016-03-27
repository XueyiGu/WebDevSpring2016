/**
 * Created by ceres on 2/26/16.
 */

(function()
{
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope, $http)
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
            return $http.post('/api/assignment/user/'+userId+'/form', form);
        }

        function findAllFormsForUser(userId)
        {
            return $http.get('/api/assignment/user/'+userId+'/form');
        }

        function deleteFormById(index)
        {
            return $http.delete('/api/assignment/form/' + index);
        }

        function updateFormById(formId, newForm)
        {
            if(!formId)
            {
                console.log("formId is null");
            }
            return $http.put('/api/assignment/form/' + formId, newForm);
        }

        function findFormById(formId){
            return $http.get('/api/assignment/form/' + formId);
        }
    }
})();