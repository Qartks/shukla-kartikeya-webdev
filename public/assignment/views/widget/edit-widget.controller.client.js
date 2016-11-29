(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.fileUpload = true;


        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;
        vm.goBack = goBack;
        vm.uploadFile = uploadFile;
        vm.goSearchFlickr = goSearchFlickr;

        function goSearchFlickr() {
            $location.url("/user/"+ vm.userId +"/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgetId+ "/search");
        }

        function uploadFile() {
            vm.fileUpload = !vm.fileUpload;
        }

        function goBack() {
            $location.url("/user/"+ vm.userId +"/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function init() {
            WidgetService.findWidgetById(vm.widgetId)
                .success(function (widget) {
                    if (widget == "0") {
                        vm.error = "Couldn't find";
                    } else {
                        vm.widget = widget;
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
        }
        
        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId)
                .success(function (status) {
                    if (status == "0") {
                        vm.error = "Couldn't delete";
                    } else {
                        $location.url("/user/"+ vm.userId +"/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
        }
        
        function updateWidget() {
            WidgetService.updateWidget(vm.widgetId, vm.widget)
                .success(function (w) {
                    if (w == "0") {
                        vm.error = "Couldn't update";
                    } else {
                        $location.url("/user/"+ vm.userId +"/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
        }

        init();
    }

})();