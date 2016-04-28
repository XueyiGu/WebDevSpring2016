/**
 * Created by ceres on 4/18/16.
 */
var app = angular.module("PriceMatchApp");
app.controller("SearchController", searchController);


function searchController($scope, $rootScope, RestaurantService) {

    var vm = this;

    $scope.search = search;

    function init() {
        $scope.restaurant = {'name': 'Starbucks', 'location': 'Seattle'};
        search($scope.restaurant);
    }
    if(!$rootScope.restaurants){
        init();
    }


    function search(restaurant) {
        RestaurantService
            .search(restaurant)
            .then(
                function(response){
                    if(response){
                        $scope.restaurants = response.data;
                        $rootScope.restaurants = response.data;
                    }
                },
                function(err) {
                    $scope.message = err;
                });
    }
}
