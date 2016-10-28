(function () {
    angular
        .module("WebAppMaker")
        .config(Config);
    
    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl : "views/user/login.view.client.html",
                controller : "LoginController",
                controllerAs : "LoginCtrl"
            })
            .when("/", {
                redirectTo : "/login"
            })
            .when("/register", {
                templateUrl : "views/user/register.view.client.html",
                controller : "RegisterController",
                controllerAs : "RegisterCtrl"
            })
            .when("/user/:uid", {
                templateUrl : "views/user/profile.view.client.html",
                controller : "ProfileController",
                controllerAs : "ProfileCtrl"
            })
            .when("/user/:uid/website", {
                templateUrl : "views/website/website-list.view.client.html",
                controller : "WebsiteListController",
                controllerAs : "WebListCtrl"
            })
            .when("/user/:uid/website/new", {
                templateUrl : "views/website/website-new.view.client.html",
                controller : "NewWebsiteController",
                controllerAs : "NewWebsiteCtrl"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl : "views/website/website-edit.view.client.html",
                controller : "EditWebsiteController",
                controllerAs : "EditWebsiteCtrl"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl : "views/page/page-list.view.client.html",
                controller : "PageListController",
                controllerAs : "PageListCtrl"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl : "views/page/page-new.view.client.html",
                controller : "NewPageController",
                controllerAs : "NewPageCtrl"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl : "views/page/list-page-edit.view.client.html",
                controller : "EditPageController",
                controllerAs : "EditPageCtrl"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl : "views/widget/widget-list.view.client.html",
                controller : "WidgetListController",
                controllerAs : "WidgetListCtrl"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl : "views/widget/widget-chooser.view.client.html",
                controller : "NewWidgetController",
                controllerAs : "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/create/:wgid", {
                templateUrl : "views/widget/widget-new.view.client.html",
                controller : "NewWidgetController",
                controllerAs : "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl : "views/widget/widget-edit.view.client.html",
                controller : "EditWidgetController",
                controllerAs : "model"
            })
            .otherwise({
                redirectTo : "/login"
            });



    }
})();
