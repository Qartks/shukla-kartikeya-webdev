module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var WebsiteSchema = require('./website.schema.server')();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        createWebsiteForUser : createWebsiteForUser,
        findAllWebsitesForUser : findAllWebsitesForUser,
        findWebsiteById : findWebsiteById,
        updateWebsite : updateWebsite,
        deleteWebsite : deleteWebsite,
        setModel : setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWebsiteForUser(userId, website) {
        return WebsiteModel.create(website)
            .then(function (websiteObj) {
                model.userModel
                    .findUserById(userId)
                    .then( function (userObj) {
                        userObj.websites.push(websiteObj);
                        userObj.save();
                        websiteObj._user = userObj._id;
                        websiteObj.save();
                    }, function (err) {
                        console.log(err);
                    })
                return websiteObj;
            });
    }

    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find({ _user : userId});
        // return model.userModel.findAllWebsiteForUser(userId);
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findOne({ _id : websiteId});
    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel.update(
            {
                _id : websiteId
            },
            {
                name : website.name,
                description : website.description
            }
        );
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel.remove( { _id : websiteId } )
            .then( function (websiteObj) {
                model
                    .userModel
                    .findUserOfWebsite(websiteId)
                    .then(function (userObj) {
                        var index = userObj.websites.indexOf(websiteId);
                        userObj.websites.splice(index, 1);
                        userObj.save();
                    });
                return websiteObj;
            }, function (err) {
                console.log(err);
            });
    }
};