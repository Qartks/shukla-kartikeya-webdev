module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
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

                WidgetModel
                    .find({ _page : pageId})
                    .count(function (err, count) {
                        model.pageModel
                            .findPageById(pageId)
                            .then(function (pageObj) {
                                pageObj.widgets.push(widgetObj);
                                pageObj.save();
                                widgetObj._page = pageObj._id;
                                widgetObj.type = widget.type;
                                widgetObj.index = count;
                                widgetObj.save();
                            }, function (err) {
                                console.log(err);
                            });
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

        return WidgetModel
            .findOne({_id: widgetId},
                function (err, widget) {
                    var index = widget.index;
                    var pageId = widget._page;

                    model
                        .pageModel
                        .findPageOfWidget(widgetId)
                        .then(function (pageObj) {
                            var index = pageObj.widgets.indexOf(widgetId);
                            pageObj.widgets.splice(index, 1);
                            pageObj.save();
                        });

                    WidgetModel
                        .find({_page: pageId},
                            function (err, widgets) {
                                widgets.forEach(function (widget) {
                                    if (widget.index > index) {
                                        widget.index--;
                                        widget.save(function() {});
                                    } else if (widget.index === index) {
                                        widget.remove();
                                    }
                                })
                            });
                });
    }

    function reorderWidget(pageId, start, end) {
        start = parseInt(start);
        end = parseInt(end);

        return WidgetModel
            .find({_page: pageId},
                function (err, widgets) {
                    widgets.forEach(function (widget) {
                        if (start > end) {
                            if (widget.index >= end && widget.index < start) {
                                widget.index++;
                            } else if (widget.index === start) {
                                widget.index = end;
                            }
                            widget.save(function () {});
                        } else {
                            if (widget.index <= end && widget.index > start) {
                                widget.index--;
                            } else if (widget.index === start) {
                                widget.index = end;
                            }
                            widget.save(function () {});
                        }
                    });
                });
    }
};