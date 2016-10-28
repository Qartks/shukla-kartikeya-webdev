(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.update = update;
        vm.deleteUser = deleteUser;

        function init() {
            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    if(user == "0") {
                        alert("Unable to Find");
                    } else {
                        vm.user = user;
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
        }
        init();

        function update (user) {
            UserService.updateUser(user)
                .success(function (user) {
                    if(user == "0") {
                        alert("Unable to Find");
                    } else {
                        vm.user = user;
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
        }

        function deleteUser() {
            UserService.deleteUser(vm.userId)
                .success(function (user) {
                    if(user == "0") {
                        alert("Unable to Delete");
                    } else {
                        $location.url("/login");
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
        }

    }

})();