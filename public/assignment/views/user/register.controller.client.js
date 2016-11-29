(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService, $scope) {
        var vm = this;
        vm.register = register;
        vm.error="";
        vm.user={};

        function register (user) {


            if (!$scope.registerForm.$valid) {
                vm.error = "There are invalid fields";
                return;
            }

            if (user.username && user.password) {
                if (user.password === user.verifyPassword) {
                    UserService
                        .register(user)
                        .then(
                            function(response) {
                                var user = response.data;
                                $rootScope.currentUser = user;
                                $location.url("/user/"+user._id);
                            });
                } else {
                    vm.error = "Make sure passwords match";
                }
            } else {
                vm.error = "Please enter values for all fields";
            }

        }
    }

})();