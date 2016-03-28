/**
 * Created by ceres on 3/16/16.
 */
(function()
{
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($rootScope, $http, $q)
    {
        var service = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldFormForm: getFieldFormForm,
            deleteFieldForForm: deleteFieldForForm,
            updateField: updateField
        };

        return service;

        function createFieldForForm(formId, field)
        {
            var deferred = $q.defer();
            $http
                .post('/api/assignment/form/'+formId+'/field', field)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getFieldsForForm(formId)
        {
            var deferred = $q.defer();
            console.log('I am in field.service.client');
            $http
                .get('/api/assignment/form/'+formId+'/field')
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getFieldFormForm(formId, fieldId)
        {
            var deferred = $q.defer();
            $http
                .get('/api/assignment/form/'+formId+'/field/' + fieldId)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFieldForForm(formId, fieldId)
        {
            var deferred = $q.defer();
            $http
                .delete('/api/assignment/form/'+formId+'/field/' + fieldId)
                .then(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateField(formId, fieldId, newField)
        {
            var deferred = $q.defer();
            setTimeout(function(){
                $http
                    .put('/api/assignment/form/'+formId+'/field/' + fieldId, newField)
                    .then(function(response){
                        deferred.resolve(response);
                    })
            }, 200);
            return deferred.promise;
        }
    }
})();