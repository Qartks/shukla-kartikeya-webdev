module.exports = function (app, model) {

    app.post("/api/user", createUser);
    app.delete("/api/user/:userId", deleteUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);

    function createUser(req, res) {
        var user = req.body;
        model
            .userModel
            .createUser(user)
            .then(
                function (newUser) {
                    res.send(newUser);
                },
                function (error) {
                    console.log(error);
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        model.userModel.deleteUser(userId)
            .then(function (user) {
                if (user) {
                    res.sendStatus(200);
                } else {
                    res.send("0");
                }
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }

    function findUser(req, res) {
        var query = req.query;

        if (query.username && query.password) {
            findUserByCredentials(req, res);
        } else if (query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var query = req.query;
        var username = query.username;

        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        res.send(user);
                    } else {
                        res.send("0");
                    }
                }, function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var query = req.query;
        var username = query.username;
        var password = query.password;

        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (user) {
                        res.send(user);
                    } else {
                        res.send("0");
                    }
                }, function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        model
            .userModel
            .findUserById(userId)
            .then(
                function (user) {
                    if (user) {
                        res.send(user);
                    } else {
                        res.send("0");
                    }
                }, function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        model
            .userModel
            .updateUser(userId, user)
            .then(
                function () {
                    res.sendStatus(200);
                }, function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

}