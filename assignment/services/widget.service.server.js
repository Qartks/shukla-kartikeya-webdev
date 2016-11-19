module.exports = function (app, model) {

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId = req.body.widgetId;
        var text = req.body.text;
        var imageFile = req.file;

        var originalname  = imageFile.originalname; // file name on user's computer
        var filename      = imageFile.filename;     // new file name in upload folder
        var path          = imageFile.path;         // full path of uploaded file

        var f = '/assignment/uploads/' + filename;
        model.widgetModel.updateImageUrl(widgetId, originalname, f, text)
            .then( function (status) {
                res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }

    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put( "/api/page/:pageId/widget?", updateWidgetsSortable);
    
    function updateWidgetsSortable(req, res) {
        var start = req.query.initial;
        var end = req.query.final;
        var pageId = req.params.pageId;
        model.widgetModel.reorderWidget(pageId, start, end)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(400).send(err);
            });

    }
    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        model.widgetModel.findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.send(widgets);
            }, function (err) {
                res.sendStatus(400).send(err);
            })
    }

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pageId;
        model.widgetModel.createWidget(pageId, widget)
            .then(function (widget) {
                res.send(widget);
            }, function (err) {
                res.sendStatus(400).send(err);
            })
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        model.widgetModel.findWidgetById(widgetId)
            .then( function (widget) {
                if (widget) {
                    res.send(widget);
                } else {
                    res.send("0");
                }
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;
        model.widgetModel.updateWidget(widgetId, widget)
            .then( function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        model.widgetModel.deleteWidget(widgetId)
            .then(function (widget) {
                if (widget) {
                    res.sendStatus(200);
                } else {
                    res.send("0");
                }
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }

}