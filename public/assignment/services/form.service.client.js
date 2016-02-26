/**
 * Created by ceres on 2/26/16.
 */

(function()
{
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope)
    {
        var forms = [
            {"form_id": "000", "title": "Contacts", "userId": 123},
            {"form_id": "010", "title": "ToDo",     "userId": 123},
            {"form_id": "020", "title": "CDs",      "userId": 234},
        ];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function createFormForUser(userId, form)
        {
            //var allForms = findAllFormsForUser(userId);
            var new_form = {
                form_id: form.form_id,
                title: form.title,
                userId: userId
            }
            forms.push(new_form);
            return new_form;
        }

        function findAllFormsForUser(userId)
        {
            var result = [];
            for(var f in forms)
            {
                if(forms[f].userId == userId)
                {
                    result.push(forms[f]);
                }
            }
            return result;
        }

        function deleteFormById(formId)
        {

        }

        function updateFormById(formId, newForm)
        {
            if(!formId)
            {
                console.log("formId is null");
            }
            for(var f in forms)
            {
                if(forms[f].form_id == formId)
                {
                    forms[f].title = newForm.title;
                    return forms[f];
                }
            }
            return null;
        }

    }
})();