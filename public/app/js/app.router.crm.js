'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG',
            function($stateProvider, $urlRouterProvider, JQ_CONFIG) {

                $urlRouterProvider
                    .otherwise('/app/dashboard');
                $stateProvider

                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'partials/app.html'
                    })

                    .state('app.crm-dashboard', {
                        url: '/dashboard',
                        templateUrl: 'partials/crm-dashboard.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('chart.js').then(
                                        function() {
                                            return $ocLazyLoad.load('app/js/controllers/crm-dashboard.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    
                    .state('app.crm-dashboard.pembayaran', {
                        url: '/{fold}',
                        templateUrl: 'partials/transaksi/transaksi-list.html'
                    })

                    .state('app.mail', {
                        abstract: true,
                        url: '/mail',
                        //template: '<div ui-view class=""></div>',
                        templateUrl: 'partials/mail.html',
                        // use resolve to load other dependences
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css', 'js/controllers/mail.js',
                                        'js/services/mail-service.js',
                                        JQ_CONFIG.moment
                                    ]);
                                }
                            ]
                        }
                    })

                    // kategori
                    .state('app.kategori', {
                        url: '/kategori',
                        template: '<div ui-view class=""></div>',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css', 'app/js/controllers/admin/kategori.js'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.kategori.kategori_semua', {
                        url: '/kategori_semua',
                        templateUrl: 'partials/kategori/kategori-all.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ui.grid').then(
                                        function() {
                                            return $ocLazyLoad.load('bower_components/font-awesome/css/font-awesome.css');
                                        }
                                    );
                                }
                            ]
                        }

                    })
                    .state('app.kategori.kategori_add', {
                        url: '/tambah',
                        templateUrl: 'partials/kategori/kategori-tambah.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('angularFileUpload','cgNotify').then(
                                        function() {
                                            return $ocLazyLoad.load('app/js/controllers/file-upload.js','bower_components/font-awesome/css/font-awesome.css');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.kategori.kategori_rubah', {
                                url: '/kategori_rubah/:id',
                                templateUrl: 'partials/kategori/kategori-rubah.html',
                                resolve: {
                                    deps: ['$ocLazyLoad',
                                        function($ocLazyLoad) {
                                            return $ocLazyLoad.load('angularFileUpload','cgNotify').then(
                                                function() {
                                                    return $ocLazyLoad.load('app/js/controllers/file-upload.js','bower_components/font-awesome/css/font-awesome.css');
                                                }
                                            );
                                        }
                                    ]
                                }
                            })

                    // Product
                    .state('app.produk', {
                        url: '/produk',
                        template: '<div ui-view class=""></div>',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css', 'app/js/controllers/admin/produk.js'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.produk.produk_semua', {
                        url: '/produk_semua',
                        templateUrl: 'partials/produk/produk-all.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.produk.produk_add', {
                        url: '/produk_add',
                        templateUrl: 'partials/produk/produk-tambah.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load('angularFileUpload','cgNotify').then(
                                    function() {
                                        return $ocLazyLoad.load('colorpicker.module');
                                    }
                                    );
                            }
                            ]
                        }
                    })
                    .state('app.produk.produk_rubah', {
                        url: '/produk_rubah/:id',
                        templateUrl: 'partials/produk/produk-rubah.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load('angularFileUpload','cgNotify').then(
                                    function() {
                                        return $ocLazyLoad.load('colorpicker.module');
                                    }
                                    );
                            }
                            ]
                        }
                    })
                    .state('app.produk.gambar_rubah', {
                        url: '/produk_gambar/:id',
                        templateUrl: 'partials/produk/produk-gambar.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load('angularFileUpload','cgNotify').then(
                                    function() {
                                        return $ocLazyLoad.load('bower_components/font-awesome/css/font-awesome.css');
                                    }
                                    );
                            }
                            ]
                        }
                    })

                    // Provinsi
                    .state('app.provinsi', {
                        url: '/provinsi',
                        template: '<div ui-view class=""></div>',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css', 'app/js/controllers/admin/provinsi.js'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.provinsi.all', {
                        url: '/provinsi-all',
                        templateUrl: 'partials/provinsi/provinsi-all.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('xeditable','cgNotify').then(
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.provinsi.kabupaten', {
                        url: '/kabupaten/:id',
                        templateUrl: 'partials/provinsi/kabupaten-all.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('xeditable','cgNotify').then(
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.provinsi.kecamatan', {
                        url: '/kecamatan/:id',
                        templateUrl: 'partials/provinsi/kecamatan-all.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('xeditable','cgNotify').then(
                                    );
                                }
                            ]
                        }
                    })

                    // ongkir
                    .state('app.ongkir', {
                        url: '/ongkir',
                        template: '<div ui-view class=""></div>',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css', 'app/js/controllers/admin/ongkir.js'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.ongkir.list', {
                        url: '/ongkir-all',
                        templateUrl: 'partials/ongkir/ongkir-all.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('xeditable','cgNotify').then(
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.ongkir.ongkir_all', {
                        url: '/kurir/:id',
                        templateUrl: 'partials/ongkir/ongkir-add-list.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('xeditable','cgNotify').then(
                                    );
                                }
                            ]
                        }
                    })

                    // User 
                    .state('app.user', {
                        url: '/user',
                        template: '<div ui-view class=""></div>',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css', 'app/js/controllers/admin/user.js'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.user.list', {
                        url: '/user-all',
                        templateUrl: 'partials/user/user-all.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('cgNotify').then(
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.user.user_add', {
                        url: '/user_add',
                        templateUrl: 'partials/user/user_add.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('xeditable','cgNotify').then(
                                    );
                                }
                            ]
                        }
                    }).state('app.user.user_update', {
                        url: '/user_rubah/:id',
                        templateUrl: 'partials/user/user_rubah.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('cgNotify').then(
                                    );
                                }
                            ]
                        }
                    })

                    // slider
                    .state('app.slider', {
                        url: '/slider',
                        template: '<div ui-view class=""></div>',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css', 'app/js/controllers/admin/slider.js'
                                    ]);
                                }
                            ]
                        }

                    })
                    .state('app.slider.list', {
                        url: '/list',
                        templateUrl: 'partials/slider/slider_list.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.slider.add', {
                        url: '/add',
                        templateUrl: 'partials/slider/slider_add.html',
                        resolve: {
                                    deps: ['$ocLazyLoad',
                                        function($ocLazyLoad) {
                                            return $ocLazyLoad.load('angularFileUpload','cgNotify').then(
                                                function() {
                                                    return $ocLazyLoad.load('app/js/controllers/file-upload.js','bower_components/font-awesome/css/font-awesome.css');
                                                }
                                            );
                                        }
                                    ]
                                }
                    })
                    // setting
                    .state('app.setting', {
                        url: '/setting',
                        template: '<div ui-view class=""></div>',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css', 'app/js/controllers/admin/setting.js'
                                    ]);
                                }
                            ]
                        }
                    }).state('app.setting.home', {
                        url: '/front_home',
                        templateUrl: 'partials/setting/Home.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    }).state('app.setting.profile', {
                        url: '/profile_website',
                        templateUrl: 'partials/setting/profile_website.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('angularFileUpload','cgNotify').then(
                                        function() {
                                            return $ocLazyLoad.load('bower_components/font-awesome/css/font-awesome.css');
                                            }
                                        );
                                    }
                            ]
                        }
                    }).state('app.setting.administrator', {
                        url: '/administrator',
                        templateUrl: 'partials/setting/administrator.html',
                        resolve: {
                            deps: ['uiLoad',
                            function(uiLoad) {
                                return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css']);
                            }
                            ]
                        }
                    }).state('app.setting.admin_add', {
                        url: '/administrator_add',
                        templateUrl: 'partials/setting/administrator_add.html',
                        resolve: {
                            deps: ['uiLoad',
                            function(uiLoad) {
                                return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css']);
                            }
                            ]
                        }
                    }).state('app.setting.admin_rubah', {
                        url: '/admin_rubah/:id',
                        templateUrl: 'partials/setting/admin_rubah.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    }).state('app.setting.data_penjualan', {
                        url: '/data_penjualan',
                        templateUrl: 'partials/setting/data_penjualan.html',
                        resolve: {
                            deps: ['uiLoad',
                            function(uiLoad) {
                                return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css']);
                            }
                            ]
                        }
                    }).state('app.setting.demografi_penjualan', {
                        url: '/demografi_penjualan',
                        templateUrl: 'partials/setting/grafik.html',
                        resolve: {
                            deps: ['uiLoad',
                            function(uiLoad) {
                                return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css']);
                            }
                            ]
                        }
                    })   
                    .state('access', {
                        abstract: true,
                        url: '/access',
                        template: '<div ui-view class=""></div>'
                    }).state('access.signin', {
                        url: '/signin',
                        templateUrl: 'partials/ui-login.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['app/js/controllers/login.js',
                                        'bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('access.register', {
                        url: '/register',
                        templateUrl: 'partials/ui-register.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['app/js/controllers/register.js',
                                        'bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                
            }
        ]
    );
