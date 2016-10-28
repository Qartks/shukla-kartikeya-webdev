module.exports = function (app) {


    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    function findAllPagesForWebsite(req, res) {

    }

    function createPage() {

    }

    function findPageById() {

    }

    function updatePage() {

    }

    function deletePage() {

    }

}