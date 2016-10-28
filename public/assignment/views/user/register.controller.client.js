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
                    if(user) {
                        $location.url("/user/" + user._id);
                    } else {
                        alert("Unable to Register");
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
        }
    }

})();