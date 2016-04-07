/**
 * Created by ceres on 2/17/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, $rootScope, UserService, $location) {

        function init(){
            UserService
                .getCurrentUser()
                .then(function(user){
                    if(user){
                        $rootScope.currentUser = user.data;
                    }else{
                        $location.url("/login");
                    }
                });
        }

        init();

        $scope.updateUser = function(user) {
            UserService
                .updateUser(user)
                .then(
                    function(response){
                        console.log('I am here, updating the use profile of ' + user._id + ' '+ user.email);
                        if(response.data) {
                            UserService.setCurrentUser(response.data);
                            $location.url("/profile");
                        }
                    },
                    function(err){
                        $scope.message = err;
                    })
        }
    }
})();