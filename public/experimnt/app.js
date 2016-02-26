/**
 * Created by ceres on 2/11/16.
 */

var app = angular.module("WhiteBoard", []);
app.controller("MovieController", MovieTableController);

function MovieTableController($scope){

    var movies = [
        {id:111, title: "Hello World", year: 2008},
        {id:222, title: "Hello World", year: 2008},
        {id:333, title: "Hello World", year: 2008}
    ];

    $scope.movies = movies;

    $scope.addMovie = function(item) {
        console.log("addMovie");

        var new_movie = {
            id: item.id,
            title: item.title,
            year: item.year
        }

        $scope.movies.push(new_movie);
    }

        $scope.deleteMovie = function(index){
            console.log(index);
            $scope.movies.splice(index,1);
        }

        $scope.selectMovie = function(movie, index){
            $scope.selectedMovieIndex = index;

            $scope.item = {
                id: movie.id,
                title: movie.title,
                year: movie.year
            };
        }

        $scope.updateMovie = function(item){
            $scope.movies[$scope.selectedMovieIndex]=
            {
                id: item.id,
                title: item.title,
                year: item.year
            }

        }
}

