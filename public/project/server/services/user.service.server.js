/**
 * Created by ceres on 3/16/16.
 */

module.exports = function(app, userModel, passport, LocalStrategy) {

    var bcrypt = require("bcrypt-nodejs");
    var auth = authorized;

    app.get('/api/project/user/findAllusers', auth,      findAllUsers);
    app.get('/api/project/user/:id',                 findUserById);
    app.get('/api/project/user/:username',           findUserByName);

    //app.post('/api/project/user',passport.authenticate('local'),login);
    app.get('/api/project/loggedin', loggedin);
    app.post('/api/project/logout', logout);
    app.post('/api/project/register',                   register); //create user
    app.post('/api/project/user', auth, createUser),


    app.put('/api/project/user/:id', auth,             update);
    app.put('/api/project/user/updateUserByAdmin/:id', auth,   updateUserByAdmin)
    app.delete('/api/project/user/:id',  auth,            deleteUserById);

    app.post('/api/project/user/addComment', addComment);
    app.post('/api/project/user/addMenu', addMenu);

    //passport.use(new LocalStrategy(localStrategy));
    //passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);
    //
    //function localStrategy(username, password, done) {
    //    userModel
    //        .findOne({username: username})
    //        .then(
    //            function(user) {
    //                if (user == null) {
    //                    return done(null, false);
    //                }else if(bcrypt.compareSync(password, user.password) || password == user.password) {
    //                    return done(null, user);
    //                }else {
    //                    return done(null, false);
    //                }
    //            },
    //            function(err) {
    //                if (err) { return done(err); }
    //            }
    //        );
    //}

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
        }else{
            res.json('0');
        }
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['customer'];

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
            newUser.roles = ["customer"];
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

    function addMenu(req, res){
        var menu = req.body;
        var username = menu.username;
        userModel
            .addMenu(username, menu)
            .then(function(doc){
                res.json(doc);
            },
            function(err){
                res.status(400).send(err);
            });
    }

    function addComment(req, res){
        var comment = req.body;
        var username = comment.username;
        userModel
            .addComment(username, comment)
            .then(function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                });
    }
}