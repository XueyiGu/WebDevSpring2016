/**
 * Created by ceres on 4/27/16.
 */

(function()
{
    "use strict";
    angular
        .module("PriceMatchApp")
        .factory("MenuService", MenuService);

    function MenuService($http, $rootScope, $q)
    {
        var api = {
            addMenu: addMenu,
            deleteMenu: deleteMenu
        };

        return api;

        function addMenu(menu){
            console.log('I am here');
            var deferred = $q.defer();
            $http
                .post('/api/project/menu/addMenu', menu)
                .then(function(response){
                        deferred.resolve(response)
                    },
                    function(err){
                        deferred.reject(err);
                    });
            return deferred.promise;
        }

        function deleteMenu(menu){
            var deferred = $q.defer();
            $http.post('/api/project/menu/deleteMenu', menu)
                .then(function(response){
                        deferred.resolve(response);
                    },
                    function(err){
                        deferred.reject(err);
                    });
            return deferred.promise;
        }
    }
})();