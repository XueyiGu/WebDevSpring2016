/**
 * Created by ceres on 2/17/16.
 */
(function(){
    "use strict";
    angular
        .module("PriceMatchApp")
        .controller("ProfileController", profileController);

    function profileController($scope, $rootScope, UserService, RestaurantService, MenuService, CommentService, $location) {

        $scope.updateUser = updateUser;
        $scope.deleteMenu = deleteMenu;
        $scope.deleteComment = deleteComment;

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

        function updateUser(user) {
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
                    });
        }

        function deleteMenu(menu){
            var username = $scope.currentUser.username;
            menu.username = username;
            MenuService
                .deleteMenu(menu)
                .then(
                    function(response){
                        init();
                    },
                    function(err){
                        $scope.error = err;
                    }
                );
        }

        function deleteComment(comment){
            var username = $scope.currentUser.username;
            comment.username = username;
            CommentService
                .deleteComment(comment)
                .then(
                    function(response){
                        init();
                    },
                    function(err){
                        $scope.error = err;
                    }
                );
        }
    }
})();