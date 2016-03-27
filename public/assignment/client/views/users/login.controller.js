/**
 * Created by ceres on 2/17/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController ($scope, UserService, $location) {

        $scope.login = login;

        function login(user) {
            if(!user) {
                return;
            }
            console.log('I am in controller');
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                });
        }
    }
})();