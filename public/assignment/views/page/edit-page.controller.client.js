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
            vm.page = PageService.findPageById(vm.pageId);
        }

        init();

        function updatePage() {
            PageService.updatePage(vm.pageId, vm.page);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function deletePage() {
            PageService.deletePage(vm.pageId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }


    }

})();