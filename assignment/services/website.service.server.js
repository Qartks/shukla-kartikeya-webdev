module.exports = function (app) {
    var websites = [
        { "_id": 123, "name": "Facebook",    "developerId": "456", "desc" : "Facebook" },
        { "_id": 234, "name": "Tweeter",     "developerId": "456", "desc" : "Tweetster" },
        { "_id": 456, "name": "Gizmodo",     "developerId": "456", "desc" : "Gizmo" },
        { "_id": 567, "name": "Tic Tac Toe", "developerId": "123", "desc" : "Tic" },
        { "_id": 678, "name": "Checkers",    "developerId": "123", "desc" : "Check" },
        { "_id": 789, "name": "Chess",       "developerId": "234", "desc" : "Chess Site" },
        { "_id": 790, "name": "Mega Chess",  "developerId": "234", "desc" : "Mega Chess Site" },
        { "_id": 791, "name": "Meta-Chess",  "developerId": "234", "desc" : "Chessy Chess Site" }
    ];

    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var result = [];
        for (var w in websites) {
            if (websites[w].developerId == userId) {
                result.push(websites[w]);
            }
        }
        res.send(result);
    }
    
    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;
        website._id = (new Date()).getTime();
        website["developerId"] = userId;
        websites.push(website);
        res.send(websites);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        for (var key in websites) {
            if (websites.hasOwnProperty(key)) {
                if (websites[key]._id == websiteId) {
                    res.send(websites[key]);
                    return;
                }
            }
        }
        res.send("0");
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;
        for (var key in websites) {
            if (websites.hasOwnProperty(key)) {
                if (websites[key]._id == websiteId) {
                    websites[key] = website;
                    res.send(website);
                    return;
                }
            }
        }
        res.send("0");

    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for (var key in websites) {
            if (websites.hasOwnProperty(key)) {
                if (websites[key]._id == websiteId) {
                    websites.splice(key,1);
                    res.sendStatus(200);
                }
            }
        }
        res.send("0");
    }

}