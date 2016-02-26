/**
 * Created by ceres on 2/25/16.
 */
(function()
{
    angular
        .module("UserApp")
        .controller("profileController", profileController);

    function profileController($scope, $routeParams, $location, UserServices)
    {
        $scope.id = $routeParams.num;
        $scope.user = UserServices.findUserById($routeParams.id);

        $scope.$location = $location;
        console.log("profile controller: " + $location.url());
    }
})();