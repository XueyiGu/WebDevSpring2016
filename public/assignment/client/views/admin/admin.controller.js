/**
 * Created by ceres on 2/17/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($scope, $rootScope, UserService) {

        $scope.sortType     = 'user.username'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order

        function init(){
            UserService
                .getCurrentUser()
                .then(function(user){
                    if(user.data){
                        console.log(user.data);
                        $rootScope.currentUser = user.data;
                        $scope.user = null;
                    }else{
                        $location.url("/login");
                    }
                });

            //find all the forms for user
            UserService
                .findAllUsers()
                .then(function(response){
                    $scope.users = response.data;
                },
                function(err){
                    $scope.error = err;
                });
        }
        init();

        $scope.addUser = function(user){
            if($scope.selectedUserId){
                return;
            }
            console.log('add user: ' + user.username);
            //change roles to array
            var roleText = user.roles.toString();
            var roleArray = roleText.split(",");
            user.roles = roleArray;
            UserService
                .createUser(user)
                .then(init);
        }

        $scope.updateUser = function(user){
            console.log('update user ' + user.username);
            var roleText = user.roles.toString();
            console.log(roleText);
            var roleArray = [];
            if(roleText != null){
                roleArray = roleText.split(",");
            }
            user.roles = roleArray;
            UserService
                .updateUserByAdmin($scope.selectedUserId, user)
                .then(init);
        }

        $scope.deleteUser = function(user){
            console.log('admin '+ $scope.currentUser.username + ' is deleting user '+ user.username);
            UserService
                .deleteUserById(user._id)
                .then(init);
        }

        $scope.selectUser = function(user, index){
            $scope.selectedUserId = user._id;
            $scope.user = {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles
            };
        }
    }
})();