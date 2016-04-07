/**
 * Created by ceres on 3/16/16.
 */

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(app, userModel) {

    var auth = authorized;


    app.get('/api/assignment/user/findAllusers',        findAllUsers);
    app.get('/api/assignment/user/:id',                 findUserById);
    app.get('/api/assignment/user/:username',           findUserByName);

    app.post('/api/assignment/user', passport.authenticate('local'),login);
    app.get('/api/assignment/loggedin', loggedin);
    app.post('/api/assignment/logout', logout);
    app.post('/api/assignment/user/',                   register); //create user


    app.put('/api/assignment/user/:id',                 update);
    app.put('/api/assignment/user/update/:username',    updateUserByAdmin)
    app.delete('/api/assignment/user/:id',              deleteUserById);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        if(req.isAuthenticated()){
            console.log('Get loggedin user');
            console.log(req.user);
            res.json(req.user);
        }
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByName(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    //function register(req, res) {
    //    var user = req.body;
    //    userModel
    //        .createUser(user)
    //        .then(
    //            function (doc) {
    //                res.json(doc);
    //            },
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}

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

    //function login(req, res) {
    //    var username = req.query.username;
    //    var password = req.query.password;
    //    if(username != null && password != null)
    //    {
    //        var credentials = {
    //            username: username,
    //            password: password};
    //        userModel
    //            .findUserByCredentials(credentials)
    //            .then(
    //                function (doc) {
    //                    res.json(doc);
    //                },
    //                function (err) {
    //                    res.status(400).send(err);
    //                }
    //            );
    //    }
    //}

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

    //function logout(req, res) {
    //    req.session.destroy();
    //    res.send(200);
    //}
}