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

        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;
        vm.goBack = goBack;
        
        function goBack() {
            $location.url("/user/"+ vm.userId +"/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        
        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/"+ vm.userId +"/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
        
        function updateWidget() {
            WidgetService.updateWidget(vm.widgetId, vm.widget);
            $location.url("/user/"+ vm.userId +"/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        init();
    }

})();