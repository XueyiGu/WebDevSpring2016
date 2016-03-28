/**
 * Created by ceres on 2/17/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
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

                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController"
                })

                .when("/fields/:formId", {
                    templateUrl: "views/forms/fields.view.html",
                    controller: "FieldController"
                })

                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .otherwise({
                    redirectTo: "views/home/home.view.html"
                });
        });
})();