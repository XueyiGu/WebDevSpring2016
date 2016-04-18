/**
 * Created by ceres on 2/17/16.
 */

(function(){
    "use strict";
    angular
        .module("PriceMatchApp")
        .controller("HeaderController", function($scope, $rootScope, $location, UserService){
            $scope.$location = $location;
            $scope.logout = logout;

            function logout() {
                UserService
                    .logout()
                    .then(function(response){
                        $rootScope.currentUser = null;
                        $location.url('/home');
                    },
                        function(err) {
                            $scope.error = err;
                        });
            }
        });
})();
