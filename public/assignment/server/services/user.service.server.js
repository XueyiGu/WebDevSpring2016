/**
 * Created by ceres on 3/16/16.
 */
module.exports = function(app, userModel) {
    app.post('/api/assignment/user/', register); //create user
    app.get('/api/assignment/user/findAllusers', findAllUsers);
    app.get('/api/assignment/user/:id', findUserById);
    app.get('/api/assignment/user/:username', findUserByName);
    app.get('/api/assignment/user', login);
    app.put('/api/assignment/user/:id', update);
    app.put('/api/assignment/user/update/:username', updateUserByAdmin)
    app.delete('/api/assignment/user/:id',deleteUserById);

    function register(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res)
    {
        userModel
            .findAllUsers()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserById(req, res)
    {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByName(req, res) {
        var username = req.params.username;
        userModel
            .findUserByName(username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function login(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username != null && password != null)
        {
            var credentials = {
                username: username,
                password: password};
            userModel
                .findUserByCredentials(credentials)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function update(req, res){
        var userId = req.params.id;
        var newUser = req.body;
        userModel
            .updateUser(userId, newUser)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUserByAdmin(req, res){
        var username = req.params.username;
        var user = req.body;
        userModel
            .updateUserByAdmin(username, user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res)
    {
        var index = req.params.id;
        userModel
            .deleteUserById(index)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
}