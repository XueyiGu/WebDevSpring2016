/**
 * Created by ceres on 4/18/16.
 */
module.exports = function(app, yelp, restaurantModel) {

    app.post('/api/project/restaurant/search', search);
    app.post('api/project/restaurant/detail', restaurantDetail)

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
        var restaurantId = req.body;
        restaurantModel
            .searchRestaurantById(restaurantId)
            .then(
                function(restaurant){
                    //if this restaurant exists in our database, just show all the information
                    if(restaurant){
                        res.json(restaurant);
                    }
                    //if not, search this restaurant through yelp API
                    else{

                    }
                },
                function(err){

                }
            )
    }
}