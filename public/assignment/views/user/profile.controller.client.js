(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $rootScope, $location, UserService) {
        var vm = this;
        vm.userId = $rootScope.currentUser._id;
        vm.update = update;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        
        function logout() {
            UserService
                .logout()
                .then(
                function(response) {
                    $rootScope.currentUser = null;
                    $location.url("/");
                });

        }

        function init() {
            UserService
                // .findUserById(vm.userId)
                .findUser()
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
                        // vm.user = user;
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
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
        }

    }

})();