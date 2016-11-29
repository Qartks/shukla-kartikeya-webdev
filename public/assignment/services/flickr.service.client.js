(function () {
    angular
        .module('WebAppMaker')
        .factory('FlickrService', FlickrService);

    function FlickrService($http) {

        var key = "03bbb8ef5efbee73d28c6020c7239d33";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            searchPhotos: searchPhotos
        };

        return api;

        function searchPhotos(searchText) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchText);
            return $http.get(url);
        }

    }
})();