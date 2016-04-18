/**
 * Created by ceres on 4/4/16.
 */
(function(){
    "use strict";
    angular
        .module("PriceMatchApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })

                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })

                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })

                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();