(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams['uid'];

        function init() {
            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    if (user!= "0") {
                        vm.user = user;
                    }
                })
                .error(function () {
                    console.log("Error!!!");
                });
        }
        init();

        vm.update = function (user) {
            UserService.updateUser(vm.user);
        }

    }

})();