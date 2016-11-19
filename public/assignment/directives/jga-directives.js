(function () {
    angular
        .module("jgaDirectives",[])
        .directive("jgaSortable", wamSortable);
    // wam-sortable ...!
    
    function wamSortable() {
        
        function linker(scope, element, attr) {
            var start = -1;
            var end = -1;
            element.sortable({
                start: function (event, ui) {
                    start = $(ui.item).index();
                },
                stop: function (event, ui) {
                    end = $(ui.item).index();
                    scope.sortableController.sort(start, end);
                }
            });
        }
        
        function sortableController(WidgetService, $routeParams) {
            var vm = this;
            vm.sort = sort;
            var pageId = $routeParams["pid"];
            
            function sort(start, end) {
                WidgetService.sortable(start, end, pageId)
                    .success(function (obj) {

                    })
                    .error(function (err) {
                        console.log(err);
                    });
            }
        }


        return {
            scope: {},
            link: linker,
            controller: sortableController,
            controllerAs: "sortableController"
        };
    }
})();