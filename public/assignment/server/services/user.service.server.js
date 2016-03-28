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
        user = userModel.createUser(user);
        res.json(user);
    }

    function findAllUsers(req, res)
    {
        var users = userModel.findAllUsers();
        res.json(users);
    }

    function findUserById(req, res)
    {
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function findUserByName(req, res) {
        var username = req.params.username;
        var user = userModel.findUserByName(username);
        res.json(user);
    }

    function login(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username != null && password != null)
        {
            var credentials = {
                username: username,
                password: password};
            var user = userModel.findUserByCredentials(credentials);
            res.json(user);
        }
    }

    function update(req, res){
        var userId = req.params.id;
        var newUser = req.body;
        newUser = userModel.updateUser(userId, newUser);
        res.json(newUser);
    }

    function updateUserByAdmin(req, res){
        var username = req.params.username;
        var user = req.body;
        user = userModel.updateUserByAdmin(username, user);
        res.json(user);
    }

    function deleteUserById(req, res)
    {
        var index = req.params.id;
        var users = userModel.deleteUserById(index);
        res.json(users);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
}