/**
 * Created by ceres on 2/17/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, UserService, $location) {

        $scope.error = null;
        $scope.message = null;

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $scope.updateUser = function(user) {
            //console.log("update profile");
            // same validation as register
            $scope.error = null;
            $scope.message = null;

            var newUser = UserService.updateUser(user);

            if (newUser) {

                $scope.message = "User updated successfully";
                UserService.setCurrentUser(newUser);

            } else {
                $scope.error = "Unable to update the user";
            }
        }
    }
})();