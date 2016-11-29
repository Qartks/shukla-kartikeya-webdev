(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        var vm = this;
        vm.login = login;


        function login(user) {
            if (!user) {
                vm.error = "Type Something, mate!";
                return;
            }
            if (!$scope.userForm.$valid) {
                vm.error = "There are invalid fields";
                return;
            }
            UserService.login(user.username, user.password)
                .then(
                    function(response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/"+user._id);
                    });
        }
    }

})();