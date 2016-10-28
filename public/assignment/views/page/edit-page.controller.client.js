(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService.findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                })
                .error(function (err) {
                    console.log(err);
                });
        }

        init();

        function updatePage() {
            PageService.updatePage(vm.pageId, vm.page)
                .success(function (page) {
                    vm.page = page;
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .error(function (err) {
                    console.log(err);
                });
        }

        function deletePage() {
            PageService.deletePage(vm.pageId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .error(function (err) {
                    console.log(err);
                });
        }


    }

})();