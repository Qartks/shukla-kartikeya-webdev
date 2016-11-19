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
        return WidgetModel.create(widget)
            .then(function (widgetObj) {
                model.pageModel
                    .findPageById(pageId)
                    .then(function (pageObj) {
                        pageObj.widgets.push(widgetObj);
                        pageObj.save();
                        widgetObj._page = pageObj._id;
                        widgetObj.type = widget.type;
                        widgetObj.save();
                    }, function (err) {
                        console.log(err);
                    });
                return widgetObj;
            }, function (err) {
                console.log(err);
            });
    }

    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({ _page : pageId});
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        return WidgetModel.update(
            {
                _id : widgetId
            },
            {
                name : widget.name,
                text : widget.text,
                placeholder : widget.placeholder,
                description : widget.description,
                url : widget.url,
                width : widget.width,
                height :widget.height,
                rows : widget.height,
                size : widget.size,
                class : widget.class,
                icon : widget.icon,
                deletable : widget.deletable,
                formatted : widget.formatted
            }
        );
    }

    function deleteWidget(widgetId) {
        return WidgetModel.remove( { _id : widgetId} )
            .then(function (widgetObj) {
                model
                    .pageModel
                    .findPageOfWidget(widgetId)
                    .then(function (pageObj) {
                        var index = pageObj.widgets.indexOf(widgetId);
                        pageObj.widgets.splice(index, 1);
                        pageObj.save();
                    });
                return widgetObj;
            }, function (err) {
                console.log(err);
            })
    }

    function reorderWidget(pageId, start, end) {

    }
};