/**
 * Created by ceres on 2/17/16.
 */
(function(){
    "use strict";
    angular
        .module("PriceMatchApp")
        .controller("HomeController", function($scope, $routeParams, $location, UserServices){
            var users = UserServices.findAllUsers();
            console.log("return all users!");
        });
})();