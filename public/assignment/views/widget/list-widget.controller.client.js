(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        vm.checkSafeHTML = checkSafeHTML;
        vm.checkSafeYouTube = checkSafeYouTube;

        function checkSafeYouTube(url) {
            if (!url) {
                return;
            }
            var parts = url.split('/');
            id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeHTML(html) {
            return $sce.trustAsHtml(html);
        }

        function init() {
            WidgetService.findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    if (widgets == "0") {
                        vm.error = "Couldn't find Widgets";
                    } else {
                        vm.widgets = widgets;
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
        }
        init();
    }

})();