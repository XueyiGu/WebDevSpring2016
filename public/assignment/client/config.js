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
                    templateUrl: "views/home/home.view.html",
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

                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController"
                })

                .when("/fields/:formId&:formTitle", {
                    templateUrl: "views/forms/fields.view.html",
                    controller: "FieldController"
                })

                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    resolve: {
                        loggedin: checkAdmin
                    }
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
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
        console.log('I am here!');
        //$http
        //    .get('/api/assignment/loggedin')
        //    .then(function(user){
        //        console.log('I am here 1!');
        //    });
        $http.get('/api/assignment/loggedin').success(function(user)
        {
            console.log('I am here 2!');
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                console.log('I am authenticated!');
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                console.log('I am not authenticated!');
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        console.log('I am in checkCurrentUser');
        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
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