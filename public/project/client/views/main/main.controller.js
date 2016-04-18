/**
 * Created by ceres on 2/17/16.
 */
(function(){
    "use strict";
    angular
        .module("PriceMatchApp")
        .controller("MainController", MainController);
                function MainController($scope, $location)
            { 
                $scope.$location = $location; 
            }
})();