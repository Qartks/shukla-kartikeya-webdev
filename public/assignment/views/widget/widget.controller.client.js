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
        vm.widget = {};
        vm.widgetToCreate = widgetToCreate;

        function widgetToCreate(type) {
            if (type === 'HEADER') {
                vm.widget.widgetType = "HEADER";
                vm.widget = WidgetService.createWidget(vm.pageId, vm.widget);
                $location.url("/user/"+ vm.userId +"/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widget._id);
            }
        }

    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];

        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;

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