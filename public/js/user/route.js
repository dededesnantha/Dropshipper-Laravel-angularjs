/**
* mainRoutes Module;
*
* Description
*/
myApp.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
    $routeProvider.when('/login',{
        templateUrl:'../views/login.html'
    });
    $routeProvider.when('/home',{
        templateUrl:'../views/home.html'
    });
    $routeProvider.when('/logout',{
        controller:'logout'
    });
    // profile
    $routeProvider.when('/profile', {
        templateUrl: '../views/profile.html'
    });
    $routeProvider.when('/edit-profile', {
        templateUrl: '../views/edit-profile.html'
    });
    // single kategori
    $routeProvider.when('/kategori/:slug', {
        templateUrl: '../views/list_kategori.html',
    })
    // single produk
    $routeProvider.when('/produk/:slug', {
        templateUrl: '../views/single_produk.html',
    })
 
    // $routeProvider.when('/dashboard',{
    //     templateUrl:'templates/dashboard.html',
    //     controller:'../controller/frontendController'
    // });
 
    // $routeProvider.when('/logout',{
    //     templateUrl:'templates/logout.html',
    //     controller:'frontendController'
    // });
 
    $routeProvider.otherwise('/home');
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });
}
]);
