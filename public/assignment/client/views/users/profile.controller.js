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
                    if(user.data){
                        console.log(user.data);
                        $rootScope.currentUser = user.data;
                    }else{
                        $location.url("/login");
                    }
                });
        }

        init();

        $scope.updateUser = function(user) {
            var userId = user._id;
            var newUser = {
                "username": user.username,
                "password": user.password,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "emails": user.emails,
                "phones": user.phones
            };
            UserService
                .updateUser(userId, newUser)
                .then(
                    function(response){
                        init();
                        $scope.message = 'successfully updated';
                    },
                    function(err){
                        $scope.error = err;
                    })
        }
    }
})();