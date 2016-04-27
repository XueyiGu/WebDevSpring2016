/**
 * Created by ceres on 4/18/16.
 */
module.exports = function(app, yelp, restaurantModel) {

    app.post('/api/project/restaurant/search', search);
    app.get('/api/project/restaurant/detail/:restaurantId', restaurantDetail);
    app.put('/api/project/restaurant/createRestaurant', createRestaurant);
    app.put('/api/project/restaurant/:restaurantId/addMenu', addMenu);
    app.post('/api/project/restaurant/addComment', addComment);

    app.post('/api/project/restaurant/deleteMenu', deleteMenu);

    function search(req, res)
    {
        var restaurant = req.body;
        var name = restaurant.name;
        var location = restaurant.location;
        yelp.search({ term: name, location: location })
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
    }

    function restaurantDetail(req, res){
        var id = req.params.restaurantId;
        restaurantModel
            .searchRestaurantById(id)
            .then(
                function(restaurant){
                    res.json(restaurant);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function createRestaurant(req, res){
        var restaurant = req.body;
        restaurantModel
            .createRestaurant(restaurant)
            .then(
                function(restaurant){
                    //at the same time, we need to add the
                    res.json(restaurant);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function addMenu(req, res){
        var id = req.params.restaurantId;
        var menu = req.body;
        restaurantModel
            .updateMenu(id, menu)
            .then(
                function(restuarant){
                    res.json(restuarant);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function addComment(req, res){
        var comment = req.body;
        restaurantModel
            .updateComment(comment.restaurant_id, comment)
            .then(
                function(restuarant){
                    res.json(restuarant);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function deleteMenu(req, res){
        var menu = req.body;
        restaurantModel
            .deleteMenu(menu)
            .then(
                function(restuarant){
                    res.json(restuarant);
                },
                function(err){
                    res.status(400).send(err);
                });
    }
}