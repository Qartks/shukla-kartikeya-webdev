(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService, $scope) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.error="";
        this.createPage = createPage;

        function createPage() {

            if (!$scope.newpageform.$valid) {
                vm.error = "There are invalid fields";
                return;
            }

            PageService.createPage(vm.websiteId, vm.page)
                .success(function (page) {
                    if (page == "0") {
                        vm.error = "Can't Create Page";
                    } else {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
        }
    }

})();