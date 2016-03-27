/**
 * Created by ceres on 3/17/16.
 */
(function(){
    angular
        .module("WhiteBoardApp", [])
        .controller("AppCtrl", function($scope, $q){

            //Step One
            //$scope.total = 7+2;
            /*$scope.total = add(7,2);
             function add(a,b){return a+b; }
             */

            //step two
            /*add(7,2, function(result){$scope.total = result;});
             function add(a,b, callback){
             callback(a+b);
             }*/

            //step three
            /*var time_start = Date.now();
             add(7,2)
             .then(function(response){
             $scope.total = response;
             $scope.timeSpan = Date.now() - time_start;
             });
             */

            function add(a,b){
                var deferred = $q.defer();
                setTimeout(function(){
                    var total = a+b;
                    if (total > a){
                        deferred.resolve(total);
                    }
                    else{
                        deferred.reject(a-b);
                    }
                }, 200);

                return deferred.promise;
            }

            //step four
            var time_start = Date.now();
            add(7,2)
                .then(function(response){
                    return add(response, -3);})
                .then(function(res_one){
                    console.log("return from first function!");
                    return res_one;
                }, function(res_two){
                    console.log("return from second function!");
                    return res_two;
                })
                .then(function(response){
                    $scope.total = response;
                    $scope.timeSpan = Date.now() - time_start;
                });



        });
})();