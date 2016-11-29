module.exports = function (app, model) {

    var passport      = require('passport');
    var cookieParser = require('cookie-parser');
    var session      = require('express-session');
    var bcrypt = require("bcrypt-nodejs");
    var LocalStrategy    = require('passport-local').Strategy;

    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/logout", logout);
    app.get("/api/loggedin", loggedin);
    app.post ('/api/register', register);


    app.post("/api/user", createUser);
    app.get("/api/user", authorized,  findUser);
    app.get("/api/user/:userId", authorized, findUserById);
    app.put("/api/user/:userId", authorized, updateUser);
    app.delete("/api/user/:userId", authorized, deleteUser);


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function localStrategy(username, password, done) {
        model
            .userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }, function (err) {
                if (err) {
                    return done(err);
                }
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .userModel
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

    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model.
            userModel
            .createUser(user)
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
            }
        );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

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
        } else {
            res.send(req.user);
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