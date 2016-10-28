(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];


        function init() {
            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    if (pages == "0") {
                        vm.error = "Can't Find Page";
                    } else {
                        vm.pages = pages;
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
        }
        init();
    }

})();