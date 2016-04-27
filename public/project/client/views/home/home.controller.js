/**
 * Created by ceres on 2/17/16.
 */
var app = angular.module("PriceMatchApp");
app.controller("HomeController", homeController);


function homeController($scope, $rootScope, $location, RestaurantService) {

    var vm = this;

    $scope.search = search;

    function init() {
        //$scope.restaurant = {'name': 'Starbucks', 'location': 'Seattle'};
        //search($scope.restaurant);
    }
    init();

    function search(restaurant) {
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