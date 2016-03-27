/**
 * Created by ceres on 2/17/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, UserService, $location) {

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $scope.updateUser = function(user) {
            UserService
                .updateUser(user)
                .then(function(response){
                    console.log('I am here, updating the use profile of ' + user._id + ' '+ user.email);
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                })
        }
    }
})();