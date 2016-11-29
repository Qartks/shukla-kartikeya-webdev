module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser : createUser,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        updateUser : updateUser,
        deleteUser : deleteUser,
        findAllWebsiteForUser : findAllWebsiteForUser,
        findUserOfWebsite : findUserOfWebsite,
        findUserByFacebookId: findUserByFacebookId,
        setModel : setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function findUserOfWebsite(websiteId) {
        return UserModel.findOne({websites : websiteId});
    }

    function findAllWebsiteForUser (userId) {
        return UserModel
                .findById(userId)
                .populate("websites")
                .exec();
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }
    
    function findUserByUsername(username) {
        return UserModel.findOne({username : username});
    }
    
    function findUserByCredentials(username, password) {
        return UserModel.findOne({username : username, password: password});
    }

    function updateUser(userId, user) {
        return UserModel.update(
            {
                _id : userId
            },
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email : user.email,
                phone : user.phone
            }
            );
    }

    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }
};