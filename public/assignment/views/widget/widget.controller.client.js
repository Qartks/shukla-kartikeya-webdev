(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($scope) {
        console.log("Hello");
    }

    function NewWidgetController() {

    }

    function EditWidgetController() {

    }

})();