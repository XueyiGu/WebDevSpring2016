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
                .then(function(response){
                    $scope.forms = response.data;
                });
        }

        init();

        $scope.addForm = function(form)
        {
            console.log("addForm");
            form.fields = [];
            FormService
                .createFormForUser($scope.currentUser._id, form)
                .then(init);
        };

        $scope.updateForm = function(form)
        {
            FormService
                .updateFormById($scope.form._id, form)
                .then(function(response){
                    $scope.forms[$scope.selectedFormIndex] = response.data;
                });
        };

        $scope.deleteForm = function(form)
        {
            var index = $scope.forms.indexOf(form);
            FormService
                .deleteFormById(index)
                .then(function(response){
                    $scope.forms.splice(index, 1);
                });
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