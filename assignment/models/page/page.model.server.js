module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage : createPage,
        findAllPagesForWebsite : findAllPagesForWebsite,
        findPageById : findPageById,
        updatePage : updatePage,
        deletePage : deletePage,
        setModel : setModel,
        findPageOfWidget : findPageOfWidget
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function findPageOfWidget(widgetId) {
        return PageModel.findOne({widgets : widgetId});
    }

    function createPage(websiteId, page) {
        return PageModel.create(page)
            .then(function (pageObj) {
                model.websiteModel
                    .findWebsiteById(websiteId)
                    .then(function (webObj) {
                        webObj.pages.push(pageObj);
                        webObj.save();
                        pageObj._website = webObj._id;
                        pageObj.save();
                    }, function (err) {
                        console.log(err);
                    });
                return pageObj;
            });
    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel.find({ _website : websiteId});
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }

    function updatePage(pageId, page) {
        return PageModel.update(
            {
                _id : pageId
            },
            {
                name : page.name,
                title : page.title,
                description : page.description
            }
        );
    }

    function deletePage(pageId) {
        return PageModel.remove( { _id : pageId } )
            .then( function (pageObj) {
                model
                    .websiteModel
                    .findWebsiteOfPage(pageId)
                    .then(function (webObj) {
                        var index = webObj.pages.indexOf(pageId);
                        webObj.pages.splice(index, 1);
                        webObj.save();
                    });
                return pageObj;
            }, function (err) {
                console.log(err);
            });
    }
};