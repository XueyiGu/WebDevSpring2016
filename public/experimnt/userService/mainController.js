/**
 * Created by ceres on 2/25/16.
 */
(function()
{
    angular
        .module("UserApp")
        .controller("mainController", mainController);

    function mainController($scope, $location)
    {
        $scope.$location = $location;

        console.log($location.url());
    }
})();