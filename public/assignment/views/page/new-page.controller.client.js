(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        this.createPage = createPage;

        function createPage() {
            var tmp = PageService.createPage(vm.websiteId, vm.page);
            if (tmp) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        }

    }

})();