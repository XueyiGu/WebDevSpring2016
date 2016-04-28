/**
 * Created by ceres on 4/27/16.
 */
module.exports = function(app, yelp, menuModel) {


    app.post('/api/project/menu/addMenu', addMenu);
    app.post('/api/project/menu/deleteMenu', deleteMenu);

    function addMenu(req, res){
        var menu = req.body;
        menuModel
            .updateMenu(menu)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function deleteMenu(req, res){
        var menu = req.body;
        menuModel
            .deleteMenu(menu)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                });
    }
};