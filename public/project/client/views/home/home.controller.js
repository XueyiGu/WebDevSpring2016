/**
 * Created by ceres on 2/17/16.
 */
var app = angular.module("PriceMatchApp");
app.controller("HomeController", homeController);


function homeController($scope, $rootScope, $location, RestaurantService) {

    var vm = this;

    $scope.search = search;

    function search(restaurant) {

        if(restaurant == null){
            search({'name': 'starbucks', 'location': 'Seattle'});
            return;
        }
        if(restaurant.name == null){
            $scope.message = "Please type the food or restaurants you want to find";
            return;
        }

        if(restaurant.location == null){
            $scope.message = "Please give the location of the food or restaurants you want to find";
            return;
        }
        RestaurantService
            .search(restaurant)
            .then(
                function(response){
                    if(response){
                        $scope.restaurants = response.data;
                        $rootScope.restaurants = response.data;
                        $location.url("/search");
                    }
                },
                function(err) {
                    $scope.message = err;
                });
    }
}