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
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
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
                    controller: "ProfileController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })

                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    resolve: {
                        loggedin: checkAdmin
                    }
                })

                .when("/search", {
                    templateUrl: "views/search/search.view.html",
                    controller: "SearchController"
                })
                .when("/restaurant/:restaurantId", {
                    templateUrl: "views/search/restaurant.view.html",
                    controller: "RestaurantController"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.message = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }else {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {

        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.message = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.message = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.message = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();