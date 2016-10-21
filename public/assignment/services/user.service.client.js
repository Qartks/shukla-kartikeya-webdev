(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var idCount = 555;
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alicewonder@Mhatter.com"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@bob.com"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "kshukla", password: "kshukla", firstName: "Kartikeya", lastName: "Shukla", email: "Me@gmail.com"}
        ];

        return {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            users : users
        };
        
        function createUser(user) {
            user._id = idCount++;
            users.push(user);
            return user;
        }
        
        function findUserById(userId) {
            for (var key in users) {
                if (users.hasOwnProperty(key)) {
                    if (users[key]._id == userId) {
                        return users[key];
                    }
                }
            }
        }

        function findUserByUsername(username) {
            for (var key in users) {
                if (users.hasOwnProperty(key)) {
                    if (users[key].username === username) {
                        return users[key];
                    }
                }
            }
        }

        function findUserByCredentials(username, password) {
            for (var key in users) {
                if (users.hasOwnProperty(key)) {
                    if ((users[key].username === username) && (users[key].password === password)) {
                        return users[key];
                    }
                }
            }
        }

        function updateUser(userId, user) {
            for (var key in users) {
                if (users.hasOwnProperty(key)) {
                    if (users[key]._id === userId) {
                        users[key] = user;
                    }
                }
            }
        }

        function deleteUser(userId) {
            var index = users.indexOf(users._id === userId);
            if (index > -1) {
                users.splice(index, 1);
            }
        }


    };


})();