/**
 * Created by ceres on 2/17/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope, FormService) {

        function init(){
            //find all the forms for user
            FormService
                .findAllFormsForUser($scope.currentUser._id)
                .then(function(forms){
                    console.log(forms);
                    $scope.form = null;
                    $scope.forms = forms.data;
                });
        }

        init();

        $scope.addForm = function(form)
        {
            //if this information exists, it's not allowed to add this form
            if(form._id){
                return;
            }
            console.log("addForm");
            form.fields = [];
            form.userId = $scope.currentUser._id;
            FormService
                .createFormForUser($scope.currentUser._id, form)
                .then(init);
        };

        $scope.updateForm = function(form)
        {
            FormService
                .updateFormById($scope.form._id, form)
                .then(init);
        };

        $scope.deleteForm = function(form)
        {
            var formId = form._id;
            FormService
                .deleteFormById(formId)
                .then(init);
        };

        $scope.selectForm = function(form)
        {
            $scope.selectedFormIndex = $scope.forms.indexOf(form);

            $scope.form = {
                _id: form._id,
                title: form.title
            };
        };
    }
})();