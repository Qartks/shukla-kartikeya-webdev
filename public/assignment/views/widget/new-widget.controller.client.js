(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.newWidget = true;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.wdgt = {};

        vm.widgetToCreate = widgetToCreate;
        vm.updateWidget = updateWidget;
        vm.goBack = goBack;

        vm.goSearchFlickr = goSearchFlickr;

        function goSearchFlickr() {
            $location.url("/user/"+ vm.userId +"/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgetId+ "/search");
        }
        
        function goBack() {
            WidgetService.deleteWidget(vm.widgetId)
                .success(function (status) {
                    if (status == "0") {
                        vm.error = "Couldn't delete";
                    } else {
                        $location.url("/user/"+ vm.userId +"/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/new");
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

        function widgetToCreate(type) {
            vm.wdgt.type = type;
            WidgetService.createWidget(vm.pageId, vm.wdgt)
                .success(function (w) {
                    if (w == "0") {
                        vm.error = "Couldn't create";
                    } else {
                        vm.widget = w;
                        $location.url("/user/"+ vm.userId +"/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/create/" + vm.widget._id);
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
        }

        function init() {
            if (typeof vm.widgetId === 'undefined') {
                return;
            }
            vm.widget = WidgetService.findWidgetById(vm.widgetId)
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

        init();

    }
})();