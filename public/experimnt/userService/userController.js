/**
 * Created by ceres on 2/25/16.
 */
(function()
{
    angular
        .module("UserApp")
        .controller("userController", function UserController($scope, UserServices)
        {
            $scope.users = UserServices.findAllUsers();
        });
})();