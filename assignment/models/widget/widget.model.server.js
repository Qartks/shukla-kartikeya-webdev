module.exports = function () {
    var model = {};
    var index = 0;
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
        setModel : setModel,
        updateImageUrl : updateImageUrl
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function updateImageUrl(widgetId, originalname, f, text) {
        return WidgetModel.update(
            {
                _id : widgetId
            },
            {
                name : originalname,
                text : text,
                url : f
            });
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
                        widgetObj.index = index++;
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
        if (widget.type == 'HEADING') {
            return WidgetModel.update(
                {
                    _id : widgetId
                },
                {
                    name : widget.name,
                    text : widget.text,
                    size : widget.size
                }
            );
        } else if (widget.type == 'YOUTUBE') {
            return WidgetModel.update(
                {
                    _id : widgetId
                },
                {
                    name : widget.name,
                    text : widget.text,
                    url : widget.url,
                    width : widget.width
                }
            );
        } else if (widget.type == 'IMAGE') {
            return WidgetModel.update(
                {
                    _id : widgetId
                },
                {
                    name : widget.name,
                    text : widget.text,
                    url : widget.url,
                    width : widget.width
                }
            );
        } else if (widget.type == 'INPUT') {
            return WidgetModel.update(
                {
                    _id : widgetId
                },
                {
                    name : widget.name,
                    text : widget.text
                }
            );
        } else if (widget.type == 'HTML'){
            return WidgetModel.update(
                {
                    _id : widgetId
                },
                {
                    name : widget.name,
                    text : widget.text
                }
            );
        } else {

            return WidgetModel.update(
                {
                    _id : widgetId
                },
                {
                    text : widget.text,
                    placeholder : widget.placeholder,
                    rows : widget.rows,
                    formatted : widget.formatted
                }
            );
        }

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