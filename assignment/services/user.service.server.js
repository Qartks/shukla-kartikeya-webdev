module.exports = function (app) {

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alicewonder@Mhatter.com"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@bob.com"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "kshukla", password: "kshukla", firstName: "Kartikeya", lastName: "Shukla", email: "Me@gmail.com"}
    ];

    app.post("/api/user", createUser);
    app.delete("/api/user/:userId", deleteUser);
    app.get("/api/user", findUser);
    // app.get("/api/user?username=username", findUserByUsername);
    // app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);

    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime();
        users.push(user);
        res.send(user);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        var index = users.indexOf(users._id === userId);
        if (index > -1) {
            users.splice(index, 1);
            res.send(200);
        }
        res.send("0");
    }

    function findUser(req, res) {
        var params = req.params;
        var query = req.query;

        if (query.username && query.password) {
            findUserByCredentials(req, res);
        } else if (query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var params = req.params;
        var query = req.query;
        for (var key in users) {
            if (users.hasOwnProperty(key)) {
                if (users[key].username === query.username) {
                    res.send(users[key]);
                    return;
                }
            }
        }
        res.send("0");
    }

    function findUserByCredentials(req, res) {
        var query = req.query;
        for (var key in users) {
            if (users.hasOwnProperty(key)) {
                if ((users[key].username === query.username) && (users[key].password === query.password)) {
                    res.send(users[key]);
                    return;
                }
            }
        }
        res.send("0");
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        for (var key in users) {
            if (users.hasOwnProperty(key)) {
                if (users[key]._id == userId) {
                    res.send(users[key]);
                    return;
                }
            }
        }
        res.send("0");
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        for (var key in users) {
            if (users.hasOwnProperty(key)) {
                if (users[key]._id === userId) {
                    users[key] = user;
                    res.send(user);
                    return;
                }
            }
        }
        res.send("0");
    }

}