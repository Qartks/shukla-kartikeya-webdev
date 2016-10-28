module.exports = function (app) {

    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function findAllWidgetsForPage(req, res) {
        var userId = req.params.userId;
        var result = [];
        for (var w in websites) {
            if (websites[w]._id == userId) {
                result.push(websites[w]);
            }
        }
        res.send(200);
    }

    function createWidget() {

    }

    function findWidgetById() {

    }

    function updateWidget() {

    }

    function deleteWidget() {

    }

}