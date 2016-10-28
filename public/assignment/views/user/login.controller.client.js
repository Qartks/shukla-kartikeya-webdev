(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            if (!user) {
                vm.error = "Type Something, mate!";
                return;
            }
           UserService.findUserByCredentials(user.username, user.password)
                .success(function (user) {
                    if(user === "0") {
                        vm.error = "Unable to login";
                    } else {
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
            
        }
    }

})();