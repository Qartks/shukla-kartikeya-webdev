(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        return {
            login : login,
            logout : logout,
            findUser: findUser,
            register: register,
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        function register(user) {
            return $http.post("/api/register", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function findUser() {
            return $http.get("/api/user");
        }

        function login(username, password) {
            var user = {
                username: username,
                password : password
            };

            return $http.post("/api/login", user);
        }
        
        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }
        
        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+ username;
            return $http.get(url, user);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+ username+"&password=" +password;
            return $http.get(url);
        }

        function updateUser(user) {
            var url = "/api/user/" + user._id;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }


    };


})();