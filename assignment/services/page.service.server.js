module.exports = function (app, model) {

    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        model.pageModel.findAllPagesForWebsite(websiteId)
            .then( function (pages) {
                res.send(pages);
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.websiteId;
        model.pageModel.createPage(websiteId, page)
            .then(function (pageObj) {
                res.send(pageObj);
            }, function (err) {
                res.sendStatus(400).send(err);
            })
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        model.pageModel.findPageById(pageId)
            .then(function (pageObj) {
                if (pageObj) {
                    res.send(pageObj);
                } else {
                    res.send("0");
                }
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params.pageId;
        model.pageModel.updatePage(pageId, page)
            .then(
                function () {
                    res.sendStatus(200);
                }, function (err) {
                    res.sendStatus(400).send(err);
                }
                );
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        model.pageModel.deletePage(pageId)
            .then(function (page) {
                if (page) {
                    res.sendStatus(200);
                } else {
                    res.send("0");
                }
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }

}