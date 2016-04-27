/**
 * Created by ceres on 2/17/16.
 */
(function(){
    "use strict";
    angular
        .module("PriceMatchApp")
        .controller("ProfileController", profileController);

    function profileController($scope, $rootScope, UserService, RestaurantService, $location) {

        $scope.updateUser = updateUser;
        $scope.deleteMenu = deleteMenu;

        function init(){
            console.log('begin profile');
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
            console.log("in update user");
            var userId = user._id;
            var newUser = {
                "username": user.username,
                "password": user.password,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "emails": user.emails,
                "phones": user.phones
            };
            console.log("in update user");
            return;
            //UserService
            //    .updateUser(userId, newUser)
            //    .then(
            //        function(response){
            //            console.log('successfully updated the user');
            //            return;
            //            init();
            //            $scope.message = 'successfully updated';
            //        },
            //        function(err){
            //            $scope.error = err;
            //        });
        };

        function deleteMenu(menu){
            var userId = $scope.currentUser._id;
            menu.userId = userId;
            console.log('user id: '+menu.userId);
            UserService
                .deleteMenu(menu)
                .then(
                    function(response){
                        RestaurantService
                            .deleteMenu(menu)
                            .then(function(response){
                                init();
                            },
                            function(err){
                                $scope.error = err;
                            });
                    },
                    function(err){
                        $scope.error = err;
                    }
                );
        }
    }
})();