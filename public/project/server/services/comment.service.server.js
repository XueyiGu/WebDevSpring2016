/**
 * Created by ceres on 4/27/16.
 */
module.exports = function(app, yelp, commentModel) {

    app.post('/api/project/comment/addComment', addComment);
    app.post('/api/project/comment/deleteComment', deleteComment);

    function addComment(req, res){
        var comment = req.body;
        commentModel
            .updateComment(comment)
            .then(
                function(restuarant){
                    res.json(restuarant);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function deleteComment(req, res){
        var menu = req.body;
        commentModel
            .deleteComment(menu)
            .then(
                function(restuarant){
                    res.json(restuarant);
                },
                function(err){
                    res.status(400).send(err);
                });
    }
};