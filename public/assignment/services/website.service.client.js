(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var idCount = 799;
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

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
        };

        return api;

        function createWebsite(userId, website) {
            website["_id"] = idCount++;
            website["developerId"] = userId;
            websites.push(website);
            return websites;

        }

        function findWebsitesByUser(userId) {
            var web = [];
            for (var key in websites) {
                if (websites[key].developerId == userId){
                    web.push(websites[key]);
                }
            }
            return web;
        }

        function findWebsiteById(websiteId) {
            for (var key in websites) {
                if (websites.hasOwnProperty(key)) {
                    if (websites[key]._id == websiteId) {
                        return websites[key];
                    }
                }
            }
        }

        function updateWebsite(websiteId, website)  {
            for (var key in websites) {
                if (websites.hasOwnProperty(key)) {
                    if (websites[key]._id === websiteId) {
                        websites[key] = website;
                    }
                }
            }
        }

        function deleteWebsite(websiteId) {
            for (var key in websites) {
                if (websites.hasOwnProperty(key)) {
                    if (websites[key]._id == websiteId) {
                        websites.splice(key,1);
                    }
                }
            }
        }


    };


})();