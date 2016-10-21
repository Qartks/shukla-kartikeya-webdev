(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgetCounter = 1500;

        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO", "new": false},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "new": false},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/", "new": false},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "new": false},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "new": false},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E", "new": false },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "new": false}
        ];

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            blankWidget: blankWidget
        };

        return api;

        function blankWidget() {
            return { "_id": {}, "widgetType": {}, "pageId": {}, "size": {}, "text": {}, "new": false};
        }

        function createWidget(pageId, widget)  {
            widget._id = widgetCounter++;
            widget.pageId = pageId;
            widgets.push(widget);
            console.log(widgets);
            return widget;
        }

        function findWidgetsByPageId(pageId) {
            var wdgs = [];
            for (var key in widgets) {
                if (widgets[key].pageId == pageId){
                    wdgs.push(widgets[key]);
                }
            }
            return wdgs;
        }

        function findWidgetById(widgetId) {
            for (var key in widgets) {
                if (widgets.hasOwnProperty(key)) {
                    if (widgets[key]._id == widgetId) {
                        return widgets[key];
                    }
                }
            }
        }

        function updateWidget(widgetId, widget) {
            for (var key in widgets) {
                if (widgets.hasOwnProperty(key)) {
                    if (widgets[key]._id === widgetId) {
                        widgets[key] = widget;
                    }
                }
            }
        }

        function deleteWidget(widgetId) {
            for (var key in widgets) {
                if (widgets.hasOwnProperty(key)) {
                    if (widgets[key]._id == widgetId) {
                        widgets.splice(key,1);
                    }
                }
            }
        }

    };


})();