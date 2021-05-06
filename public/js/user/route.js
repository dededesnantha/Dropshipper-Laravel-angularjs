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
        templateUrl:'../views/home.html',
        activetab: 'home'
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
    //list kategori
    $routeProvider.when('/kategori-all', {
        templateUrl: '../views/list_kategori_all.html',
    })
    // list produk top
    $routeProvider.when('/produk/top', {
        templateUrl: '../views/list_produk_top.html',
    })
    //list produk all
    $routeProvider.when('/produk-all', {
        templateUrl: '../views/list_produk_all.html',
    })
    // single produk
    $routeProvider.when('/produk/:slug', {
        templateUrl: '../views/single_produk.html',
    })
    // setting
    $routeProvider.when('/setting', {
        templateUrl: '../views/setting.html',
        activetab: 'setting'
    })
    //cart
    $routeProvider.when('/cart',{
        templateUrl:'../views/cart.html',
        activetab: 'cart'
    });
    
    $routeProvider.when('/checkout',{
        templateUrl:'../views/checkout.html',
        activetab: 'cart'
    });

    $routeProvider.when('/checkout',{
        templateUrl:'../views/checkout.html',
        activetab: 'cart'
    });

    $routeProvider.when('/payment/:id',{
        templateUrl:'../views/payment.html',
        activetab: 'cart'
    });

    $routeProvider.when('/order/:id',{
        templateUrl:'../views/order_payment.html',
        activetab: 'cart'
    });
    
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
