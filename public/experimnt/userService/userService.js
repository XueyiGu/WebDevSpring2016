/**
 * Created by ceres on 2/25/16.
 */
(function()
{
    angular
        .module("UserApp")
        .factory("UserServices", userService);

    function userService()
    {
        var users = [
            {username: "Alex"},
            {username: "Bob"},
            {username: "Charlie"},
        ];

        var services = {
            findAllUsers : findAllUsers,
            findUserById : findUserById
        };

        return services;

        function findAllUsers()
        {
            console.log("return all users!");
            return users;
        }

        function findUserById(id)
        {
            return users[id];
        }

    }
})();