(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        vm.checkSafeHTML = checkSafeHTML;
        vm.checkSafeYouTube = checkSafeYouTube;

        function checkSafeYouTube(url) {
            var parts = url.split('/');
            id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeHTML(html) {
            return $sce.trustAsHtml(html);
        }

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();
    }

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