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
        templateUrl: '../views/profile.html',
        activetab: 'profile'
    });
    $routeProvider.when('/edit-profile', {
        templateUrl: '../views/edit-profile.html',
        activetab: 'profile'
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

    $routeProvider.when('/tracking',{
        templateUrl:'../views/tracking.html',
    });
    
    $routeProvider.when('/tracking/:id',{
        templateUrl:'../views/tracking_transaksi.html',
    });

    $routeProvider.when('/home/search/:search',{
        templateUrl:'../views/search.html',
    });
    
    $routeProvider.when('/rubah/password',{
        templateUrl:'../views/change.html',
    });

    $routeProvider.when('/otp',{
        templateUrl:'../views/otp.html',
    });

    $routeProvider.when('/password_rubah',{
        templateUrl:'../views/password_rubah.html',
    });

    $routeProvider.when('/success/:id',{
        templateUrl:'../views/components/sucess.html',
    });
    
    $routeProvider.when('/404',{
        templateUrl:'../views/components/404.html',
    });

    $routeProvider.when('/history',{
        templateUrl:'../views/history.html',
    });
    
    $routeProvider.when('/register',{
        templateUrl:'../views/register.html',
    });

    $routeProvider.otherwise('/home');
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });
}
]);