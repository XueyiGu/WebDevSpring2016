/**
 * Created by ceres on 4/20/16.
 */
var app = angular.module("PriceMatchApp");
app.controller("RestaurantController", restaurantController);

function restaurantController($scope, $rootScope, $routeParams, RestaurantService, MenuService, CommentService) {

    var vm = this;
    var restaurantId = null;
    var restaurants = null;

    $scope.search = search;
    $scope.commitAdd = addMenu;
    $scope.clickAdd = clickAdd;
    $scope.addComment = addComment;

    function init() {

        restaurantId = $routeParams.restaurantId;
        console.log(restaurantId);
        //first we need to search in the database to see if we have it
        RestaurantService
            .restaurantDetail(restaurantId)
            .then(function(response){
                if(response.data[0]){
                    $scope.restaurant = response.data[0];
                }else{
                    if($rootScope.restaurants){
                        restaurants = $rootScope.restaurants.businesses;
                    }else{
                        var restaurant = {'name': $rootScope.searchName, 'location': $rootScope.searchLocation};
                        RestaurantService
                            .search(restaurant)
                            .then(
                                function(response){
                                    if(response){
                                        restaurants = response.data.businesses;
                                    }
                                },
                                function(err) {
                                    $scope.message = err;
                                });
                    }
                    for(i in restaurants){
                        if(restaurants[i].id == restaurantId){
                            $scope.restaurant = restaurants[i];
                            return;
                        }
                    }
                }
            },
            function(err){
                $scope.message = err;
            });
    }
    init();

    function search(restaurant) {
        RestaurantService
            .search(restaurant)
            .then(
                function(response){
                    if(response){
                        $scope.restaurants = response.data;
                        console.log(response.data);
                    }
                },
                function(err) {
                    $scope.message = err;
                });
    }

    function clickAdd(menu){
    }

    function addMenu(menu){
        if(menu == null){
            $scope.message = "Please fill the Menu Name and Price. Please try again."
            return;
        }
        if(menu.name == null){
            $scope.message = "Menu Name should not be null. Please try again."
            return;
        }
        if(menuprice == null){
            $scope.message = "Menu Price should not be null. Please try again."
            return;
        }

        menu.username = $scope.currentUser.username;
        menu.restaurant_id = restaurantId;
        RestaurantService
            .restaurantDetail(restaurantId)
            .then(function(response){
                //we already have this restaurant in database
                //just add the menu to restaurant and user
                if(response.data[0]){
                    MenuService
                        .addMenu(menu)
                        .then(
                            function(response){
                                init();
                                menu.name = null;
                                menu.price = null;
                            },
                            function(err){
                                $scope.message = err;
                            }
                        )
                }
                //create this restaurant in our database
                else{
                    var restaurant = $scope.restaurant;
                    restaurant.id = restaurantId;

                    RestaurantService
                        .createRestaurant(restaurant)
                        .then(
                            function(response){
                                //add menu to restaurant and user
                                MenuService
                                    .addMenu(menu)
                                    .then(function(restaurant){
                                                init();
                                        },
                                        function(err){
                                            $scope.message = err;
                                        });
                            },
                            function(err){
                                $scope.message = err;
                            }
                        )
                }
            });
    }

    function addComment(newComment){
        newComment.username = $scope.currentUser.username;
        newComment.restaurant_id = restaurantId;

        RestaurantService
            .restaurantDetail(restaurantId)
            .then(function(response){
                //we already have this restaurant in database
                //just add the menu to restaurant and user
                if(response.data[0]){
                    CommentService
                        .addComment(newComment)
                        .then(
                            function(response){
                            init();
                            },
                            function(err){
                                $scope.message = err;
                            }
                        )
                }
                //create this restaurant in our database
                else{
                    var restaurant = $scope.restaurant;
                    restaurant.id = restaurantId;

                    RestaurantService
                        .createRestaurant(restaurant)
                        .then(
                            function(response){
                                //add comment to restaurant and user
                                CommentService
                                    .addComment(newComment)
                                    .then(function(restaurant){
                                            init();
                                        },
                                        function(err){
                                            $scope.message = err;
                                        });
                            },
                            function(err){
                                $scope.message = err;
                            }
                        )
                }
            });
    }
}
