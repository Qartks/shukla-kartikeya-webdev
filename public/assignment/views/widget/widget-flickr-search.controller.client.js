(function () {
    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function FlickrImageSearchController($location, $routeParams, FlickrService, WidgetService) {
        var vm = this;

        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];

        vm.error="";

        vm.searchFlickr = searchFlickr;
        vm.selectPhoto = selectPhoto;
        vm.goBack = goBack;


        function goBack() {
            $location.url("/user/"+ vm.userId +"/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgetId);
        }

        function searchFlickr(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function (response) {
                    var data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                }, function (error) {
                    vm.error = "Something went wrong";
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var widget = {
                url: url
            };

            WidgetService
                .updateWidget(vm.widgetId, widget)
                .then(goBack,
                    function () {
                    vm.error = "Something Went Wrong !";
                });


        }
    }
})();