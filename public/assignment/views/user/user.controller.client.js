(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            console.log(user);
            user = UserService.findUserByCredentials(user.username, user.password);
            console.log(user);
            if(user) {
                $location.url("/user/" + user._id);
            } else {
                vm.error = "Unable to login";
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = function (user) {
            user = UserService.createUser(user);
            if(user) {
                $location.url("/user/" + user._id);
            } else {
                alert("Unable to Register");
            }
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();
        
        vm.update = function (user) {
            UserService.updateUser(vm.userId, user);
        }

    }

})();