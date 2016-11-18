module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage : createPage,
        findAllPagesForWebsite : findAllPagesForWebsite,
        findPageById : findPageById,
        updatePage : updatePage,
        deletePage : deletePage,
        setModel : setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createPage(websiteId, page) {

    }

    function findAllPagesForWebsite(websiteId) {

    }

    function findPageById(pageId) {

    }

    function updatePage(pageId, page) {

    }

    function deletePage(pageId) {

    }
};