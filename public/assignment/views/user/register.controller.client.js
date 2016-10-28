(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;


        function register (user) {
            UserService.createUser(user)
                .success(function (user) {
                    if(user == "0") {
                        alert("Unable to Register");
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