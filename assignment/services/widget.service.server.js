module.exports = function (app) {

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../uploads' });


    app.post ("/api/upload", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        res.send(myFile);
    }


    var widgets = [
        { "_id": 123, "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": 234, "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": 345, "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
        { "_id": 456, "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": 567, "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": 678, "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E"},
        { "_id": 789, "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var result = [];
        for (var w in widgets) {
            if (widgets[w].pageId == pageId) {
                result.push(widgets[w]);
            }
        }
        res.send(result);
    }

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pageId;
        widget._id = (new Date()).getTime();
        widget.pageId = pageId;
        widgets.push(widget);
        res.send(widget);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var key in widgets) {
            if (widgets.hasOwnProperty(key)) {
                if (widgets[key]._id == widgetId) {
                    res.send(widgets[key]);
                    return;
                }
            }
        }
        res.send("0");
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;
        for (var key in widgets) {
            if (widgets.hasOwnProperty(key)) {
                if (widgets[key]._id == widgetId) {
                    widgets[key] = widget;
                    res.send(widget);
                    return;
                }
            }
        }
        res.send("0");
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var key in widgets) {
            if (widgets.hasOwnProperty(key)) {
                if (widgets[key]._id == widgetId) {
                    widgets.splice(key,1);
                    res.sendStatus(200);
                    return;
                }
            }
        }
        res.send("0");
    }

}