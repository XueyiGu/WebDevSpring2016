/**
 * Created by ceres on 3/16/16.
 */
(function()
{
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($rootScope, $http)
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
            return $http.post('/api/assignment/form/'+formId+'/field', field);
        }

        function getFieldsForForm(formId)
        {
            console.log('I am in field.service.client');
            return $http.get('/api/assignment/form/'+formId+'/field');
        }

        function getFieldFormForm(formId, fieldId)
        {
            return $http.get('/api/assignment/form/'+formId+'/field/' + fieldId);
        }

        function deleteFieldForForm(formId, fieldId)
        {
            return $http.delete('/api/assignment/form/'+formId+'/field/' + fieldId);
        }

        function updateField(formId, fieldId, newField)
        {
            if(!formId)
            {
                console.log("formId is null");
            }
            return $http.put('/api/assignment/form/'+formId+'/field/' + fieldId, newField);
        }
    }
})();