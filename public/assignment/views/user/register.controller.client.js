(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;
        vm.error="";
        vm.user={};

        function register (user) {

            if (user.username && user.password) {
                if (user.password === user.verifyPassword) {
                    UserService.createUser(user)
                        .success(function (user) {
                            if(user == "0") {
                                vm.error = "Unable to Register : Duplicate User";
                            } else {
                                $location.url("/user/" + user._id);
                            }
                        })
                        .error(function (err) {
                            console.log(err);
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