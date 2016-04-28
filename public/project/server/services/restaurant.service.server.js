/**
 * Created by ceres on 4/18/16.
 */
module.exports = function(app, yelp, restaurantModel) {

    app.post('/api/project/restaurant/search', search);
    app.get('/api/project/restaurant/detail/:restaurantId', restaurantDetail);
    app.put('/api/project/restaurant/createRestaurant', createRestaurant);

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
};