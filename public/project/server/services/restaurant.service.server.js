/**
 * Created by ceres on 4/18/16.
 */
module.exports = function(app, yelp) {

    app.post('/api/project/restaurant/search', search);

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
}