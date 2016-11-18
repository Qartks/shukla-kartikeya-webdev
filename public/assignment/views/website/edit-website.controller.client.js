(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $location,  WebsiteService) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;


        WebsiteService.findWebsiteById(vm.websiteId)
            .success(function (website) {
                vm.website = website;
            })
            .error(function (err) {
                console.log(err);
            });


        function updateWebsite() {
            WebsiteService.updateWebsite(vm.websiteId, vm.website)
                .success(function (website) {
                    if (website == "0") {
                        vm.error = "Can't update";
                    } else {
                        $location.url("/user/" + vm.userId + "/website");
                    }
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId, vm.websites)
                .success(function (websites) {
                    if (websites == "0") {
                        vm.error = "Couldn't delete";
                    } else {
                        $location.url("/user/" + vm.userId + "/website");
                    }
                })
                .error(function (err) {
                    console.log(err);
                })
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