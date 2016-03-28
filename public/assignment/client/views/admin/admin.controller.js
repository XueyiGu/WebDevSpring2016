/**
 * Created by ceres on 2/17/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($scope, UserService) {

        function init(){
            //find all the forms for user
            UserService
                .findAllUsers()
                .then(function(response){
                    $scope.users = response.data;
                });
        }
        init();

        $scope.addUser = function(user){
            console.log('add user' + user.username);
            //change roles to array
            var roleText = user.roles.toString();
            var roleArray = roleText.split(",");
            user.roles = roleArray;
            UserService
                .createUser(user)
                .then(init);
        }

        $scope.updateUser = function(user){
            var username = $scope.users[$scope.selectedUserIndex].username;
            console.log('update user ' + username);
            var roleText = user.roles.toString();
            console.log(roleText);
            var roleArray = [];
            if(roleText != null){
                roleArray = roleText.split(",");
            }
            user.roles = roleArray;
            UserService
                .updateUserByAdmin(username, user)
                .then(init);
        }

        $scope.deleteUser = function(user){
            console.log('admin '+ $scope.currentUser.username + ' is deleting user '+ user.username);
            UserService
                .deleteUserById($scope.users.indexOf(user))
                .then(init);
        }

        $scope.selectUser = function(user, index){
            $scope.selectedUserIndex = index;
            $scope.user = {
                username: user.username,
                password: user.password,
                roles: user.roles
            };
        }
    }
})();