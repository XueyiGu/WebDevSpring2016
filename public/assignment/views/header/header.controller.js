/**
 * Created by ceres on 2/17/16.
 */

(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", function($scope, $location, UserService){
            $scope.$location = $location;
            $scope.logout = logout;

            function logout() {
                UserService.setCurrentUser(null);
                $location.url("/home");
            }
        });
})();
