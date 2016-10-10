(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($scope) {
        console.log("Hello");
    }

    function NewPageController() {

    }

    function EditPageController() {

    }

})();