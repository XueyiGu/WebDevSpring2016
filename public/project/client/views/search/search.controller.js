/**
 * Created by ceres on 4/18/16.
 */
var app = angular.module("PriceMatchApp");
app.controller("SearchController", searchController);


function searchController($scope, $rootScope, RestaurantService) {

    $scope.search = search;

    function init() {

    }
    init();

    function search(restaurant) {
        RestaurantService
            .search(restaurant)
            .then(
                function(data){
                    if(data){
                        console.log(data);
                    }else{
                        $scope.message = 'Password does not match with your username';
                    }
                },
                function(err) {
                    $scope.message = err;
                });
    }
}

//(function(){
//    "use strict";
//    angular
//        .module("PriceMatchApp")
//        .controller("SearchController", searchController);
//    //var yelp = require('yelp');
//    function searchController(yelp) {
//
//        $scope.search = search;
//
//        function init() {
//
//        }
//        init();
//
//        function search(restaurant) {
//            yelp.search({ term: restaurant.name, location: restaurant.location })
//                .then(function (data) {
//                    console.log(data);
//                })
//                .catch(function (err) {
//                    console.error(err);
//                });
//        }
//    }
//})();