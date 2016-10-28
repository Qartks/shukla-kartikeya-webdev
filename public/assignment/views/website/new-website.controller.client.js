(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.websites = [];

        vm.createWebsite = createWebsite;

        function createWebsite() {
            var web = WebsiteService.createWebsite(vm.userId, vm.website);
            if(web) {
                $location.url("/user/" + vm.userId + "/website");
            }
        }

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }

})();