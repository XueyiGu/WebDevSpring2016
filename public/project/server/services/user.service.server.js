/**
 * Created by ceres on 3/16/16.
 */

module.exports = function(app, userModel, passport, LocalStrategy) {

    var bcrypt = require("bcrypt-nodejs");

    app.get('/api/assignment/user/findAllusers',ensureAuthenticated,       findAllUsers);
    app.get('/api/assignment/user/:id',                 findUserById);
    app.get('/api/assignment/user/:username',           findUserByName);

    app.post('/api/assignment/user', passport.authenticate('local'),login);
    app.get('/api/assignment/loggedin', loggedin);
    app.post('/api/assignment/logout', logout);
    app.post('/api/assignment/register',                   register); //create user
    app.post('/api/assignment/user', ensureAuthenticated, createUser),


    app.put('/api/assignment/user/:id', ensureAuthenticated,              update);
    app.put('/api/assignment/user/updateUserByAdmin/:id',ensureAuthenticated,    updateUserByAdmin)
    app.delete('/api/assignment/user/:id',ensureAuthenticated,              deleteUserById);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findOne({username: username})
            .then(
                function(user) {
                    if (user == null) {
                        return done(null, false);
                    }else if(bcrypt.compareSync(password, user.password) || password == user.password) {
                        return done(null, user);
                    }else {
                        return done(null, false);
                    }
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

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/#/login');
    }

    function login(req, res) {
        var user = req.user;
        console.log('login');
        console.log(user);
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
                        newUser.password = bcrypt.hashSync(newUser.password);
                        userModel
                            .createUser(newUser)
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
                },
                function(err){
                    res.json(err);
                }
            );

    }

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
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

    function update(req, res){
        var userId = req.params.id;
        var newUser = req.body;
        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }
        //check if password changed, if changed, make the new password hashed
        userModel
            .findUserById(userId)
            .then(function(user){
                if(user.password != newUser.password){
                    newUser.password = bcrypt.hashSync(newUser.password);
                }
                userModel.updateUser(req.params.id, newUser)
                    .then(
                        function(user){
                            return userModel.findAllUsers();
                        },
                        function(err){
                            res.status(400).send(err);
                        }
                    )
                    .then(
                        function(users){
                            res.json(users);
                        },
                        function(err){
                            res.status(400).send(err);
                        }
                    )
            });

    }

    function updateUserByAdmin(req, res){
        var username = req.params.id;
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
        var userId = req.params.id;
        console.log('Delete user: '+userId)
        userModel
            .deleteUserById(userId)
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