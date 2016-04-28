/**
 * Created by ceres on 4/27/16.
 */

(function()
{
    "use strict";
    angular
        .module("PriceMatchApp")
        .factory("CommentService", CommentService);

    function CommentService($http, $rootScope, $q)
    {
        var api = {
            addComment: addComment,
            deleteComment: deleteComment
        };

        return api;

        function addComment(comment){
            console.log('I am here');
            var deferred = $q.defer();
            $http
                .post('/api/project/comment/addComment', comment)
                .then(function(response){
                        deferred.resolve(response)
                    },
                    function(err){
                        deferred.reject(err);
                    });
            return deferred.promise;
        }

        function deleteComment(comment){
            var deferred = $q.defer();
            $http.post('/api/project/comment/deleteComment', comment)
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