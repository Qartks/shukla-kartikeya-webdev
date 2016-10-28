(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.wdgt = {};

        vm.widgetToCreate = widgetToCreate;
        vm.updateWidget = updateWidget;
        vm.goBack = goBack;
        
        function goBack() {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/"+ vm.userId +"/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/new");

        }

        function updateWidget() {
            WidgetService.updateWidget(vm.widgetId, vm.widget);
            $location.url("/user/"+ vm.userId +"/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function widgetToCreate(type) {
            vm.wdgt.widgetType = type;
            vm.wdgt.new = true;
            vm.widget = WidgetService.createWidget(vm.pageId, vm.wdgt);
            $location.url("/user/"+ vm.userId +"/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/create/" + vm.widget._id);
        }

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }

        init();

    }
})();