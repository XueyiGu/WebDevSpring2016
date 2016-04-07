/**
 * Created by ceres on 2/17/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController ($scope, $rootScope, UserService, $location) {

        $scope.login = login;

        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(
                    function(user){
                        console.log(user);
                        $rootScope.currentUser = user.data;
                        $location.url("/profile");
                    },
                    function(err) {
                        $scope.message = err;
                    });
        }
    }
})();