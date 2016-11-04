(function () {
    angular
        .module("wamDirectives",[])
        .directive("wamSortable", wamSortable);
    // wam-sortable ...!
    
    function wamSortable() {
        return {
            restrict: 'A',
            link:function(scope, element, attrs){
                element.sortable(); // <---apply sortable here.
            }
        };
    }
})();