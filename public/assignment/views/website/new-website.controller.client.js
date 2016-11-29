(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService, $scope) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.websites = [];

        vm.createWebsite = createWebsite;

        function createWebsite() {

            if (!$scope.newWebsiteform.$valid) {
                vm.error = "There are invalid fields";
                return;
            }

            WebsiteService.createWebsite(vm.userId, vm.website)
                .success(function (web) {
                    if(web) {
                        $location.url("/user/" + vm.userId + "/website");
                    }
                })
                .error(function (err) {
                    console.log(err);
                });


        }

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (err) {
                    console.log(err);
                })
        }
        init();
    }

})();