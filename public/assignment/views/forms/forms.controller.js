/**
 * Created by ceres on 2/17/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope, FormService) {
        var forms = FormService.findAllFormsForUser($scope.currentUser._id);
        $scope.forms = forms;

        //

        $scope.addForm = function(form)
        {
            console.log("addForm");
            var newForm = FormService.createFormForUser($scope.currentUser._id, form);
            $scope.forms.push(newForm);
        }

        $scope.updateForm = function(form)
        {
            var newForm = FormService.updateFormById($scope.form.form_id, form);
            if(!newForm)
            {
                alert("null");
                return;
            }

            $scope.forms[$scope.selectedFormIndex].title = newForm.title;
        }

        $scope.deleteForm = function(index)
        {
            $scope.forms.splice(index,1);
        }

        $scope.selectForm = function(form, index)
        {
            $scope.selectedFormIndex = index;

            $scope.form = {
                form_id: form.form_id,
                title: form.title
            };
        }

    }
})();