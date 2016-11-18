module.exports = function (app, model) {

    var pages = [
        { "_id": 321, "name": "Post 1","title": "Post 1", "websiteId": "456" },
        { "_id": 432, "name": "Post 2","title": "Post 2", "websiteId": "456" },
        { "_id": 543, "name": "Post 3","title": "Post 3", "websiteId": "456" },
        { "_id": 545, "name": "Post 11","title": "Post 11", "websiteId": "567" },
        { "_id": 546, "name": "Post 22","title": "Post 22", "websiteId": "567" },
        { "_id": 547, "name": "Post 33","title": "Post 33", "websiteId": "567" },
        { "_id": 548, "name": "Post 44","title": "Post 44", "websiteId": "567" }
    ];

    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var pgs = [];
        for (var key in pages) {
            if (pages[key].websiteId == websiteId){
                pgs.push(pages[key]);
            }
        }
        res.send(pages);
    }

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.websiteId;
        page._id = (new Date()).getTime();
        page.websiteId = websiteId;
        pages.push(page);
        res.send(page);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for (var key in pages) {
            if (pages.hasOwnProperty(key)) {
                if (pages[key]._id == pageId) {
                    res.send(pages[key]);
                    return;
                }
            }
        }
        res.send("0");
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params.pageId;
        for (var key in pages) {
            if (pages.hasOwnProperty(key)) {
                if (pages[key]._id == pageId) {
                    pages[key] = page;
                    res.send(page);
                    return;
                }
            }
        }
        res.send("0");
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for (var key in pages) {
            if (pages.hasOwnProperty(key)) {
                if (pages[key]._id == pageId) {
                    pages.splice(key,1);
                    res.sendStatus(200);
                    return;
                }
            }
        }
        res.send("0");
    }

}