(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {

        var pageIdCount = 999;

        var pages = [
            { "_id": 321, "name": "Post 1","title": "Post 1", "websiteId": "456" },
            { "_id": 432, "name": "Post 2","title": "Post 2", "websiteId": "456" },
            { "_id": 543, "name": "Post 3","title": "Post 3", "websiteId": "456" },
            { "_id": 545, "name": "Post 11","title": "Post 11", "websiteId": "567" },
            { "_id": 546, "name": "Post 22","title": "Post 22", "websiteId": "567" },
            { "_id": 547, "name": "Post 33","title": "Post 33", "websiteId": "567" },
            { "_id": 548, "name": "Post 44","title": "Post 44", "websiteId": "567" }
        ];

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        return api;

        function createPage(websiteId, page) {
            page._id = pageIdCount++;
            page.websiteId = websiteId;
            pages.push(page);
            return page;
        }

        function findPageByWebsiteId(websiteId) {
            var pgs = [];
            for (var key in pages) {
                if (pages[key].websiteId == websiteId){
                    pgs.push(pages[key]);
                }
            }
            return pgs;
        }

        function findPageById(pageId) {
            for (var key in pages) {
                if (pages.hasOwnProperty(key)) {
                    if (pages[key]._id == pageId) {
                        return pages[key];
                    }
                }
            }
        }

        function updatePage(pageId, page) {
            for (var key in pages) {
                if (pages.hasOwnProperty(key)) {
                    if (pages[key]._id === pageId) {
                        pages[key] = page;
                    }
                }
            }
        }

        function deletePage(pageId) {
            for (var key in pages) {
                if (pages.hasOwnProperty(key)) {
                    if (pages[key]._id == pageId) {
                        pages.splice(key,1);
                    }
                }
            }
        }


    };


})();