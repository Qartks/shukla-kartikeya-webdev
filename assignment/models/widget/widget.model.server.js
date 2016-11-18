module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget : createWidget,
        findAllWidgetsForPage : findAllWidgetsForPage,
        findWidgetById : findWidgetById,
        updateWidget : updateWidget,
        deleteWidget : deleteWidget,
        reorderWidget : reorderWidget,
        setModel : setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWidget(pageId, widget) {

    }

    function findAllWidgetsForPage(pageId) {

    }

    function findWidgetById(widgetId) {

    }

    function updateWidget(widgetId, widget) {

    }

    function deleteWidget(widgetId) {

    }

    function reorderWidget(pageId, start, end) {

    }
};