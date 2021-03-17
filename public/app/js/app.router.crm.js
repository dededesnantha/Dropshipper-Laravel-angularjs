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
                                return $ocLazyLoad.load('cgNotify').then(
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
                                return $ocLazyLoad.load('cgNotify').then(
                                    function() {
                                        return $ocLazyLoad.load('bower_components/font-awesome/css/font-awesome.css');
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

                    // packet
                    .state('app.packet', {
                        url: '/packet',
                        template: '<div ui-view class=""></div>',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css', 'app/js/controllers/admin/packet.js'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.packet.list', {
                        url: '/list',
                        templateUrl: 'partials/packet/packet_list.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css']);
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

                    // client
                    .state('app.client', {
                        url: '/client',
                        template: '<div ui-view class=""></div>',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css', 'app/js/controllers/admin/client.js'
                                    ]);
                                }
                            ]
                        }
                    }).state('app.client.add', {
                        url: '/add',
                        templateUrl: 'partials/client/client_add.html',
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
                    }).state('app.client.all', {
                        url: '/list',
                        templateUrl: 'partials/client/client_list.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    }).state('app.client.testimoni_rubah', {
                                url: '/testimoni_rubah/:id',
                                templateUrl: 'partials/client/testimoni_rubah.html',
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
                    }).state('app.client.add_client', {
                        url: '/add_client',
                        templateUrl: 'partials/client/client_tambah.html',
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
                    }).state('app.client.all_client', {
                        url: '/all_client',
                        templateUrl: 'partials/client/client_all.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })


                    // Menu
                    .state('app.menu', {
                        url: '/menu',
                        template: '<div ui-view class=""></div>',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css', 'app/js/controllers/admin/menu.js'
                                    ]);
                                }
                            ]
                        }
                    }).state('app.menu.list', {
                        url: '/list',
                        templateUrl: 'partials/menu/menu_list.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.sosial', {
                        url: '/sosial',
                        template: '<div ui-view class=""></div>',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css', 'app/js/controllers/admin/sosial.js'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.sosial.add', {
                        url: '/add',
                        templateUrl: 'partials/sosial_media/sosial_media_add.html',
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
                    .state('app.sosial.all', {
                        url: '/list',
                        templateUrl: 'partials/sosial_media/sosial_media_all.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.sosial.sosial_rubah', {
                                url: '/sosial_rubah/:id',
                                templateUrl: 'partials/sosial_media/sosial_rubah.html',
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
                    //  Team
                    .state('app.team', {
                        url: '/team',
                        template: '<div ui-view class=""></div>',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css', 'app/js/controllers/admin/team.js'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.team.list', {
                        url: '/list',
                        templateUrl: 'partials/team/team_all.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.team.team_add', {
                        url: '/team_add',
                        templateUrl: 'partials/team/team_add.html',
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
                    .state('app.team.team_rubah', {
                                url: '/team_rubah/:id',
                                templateUrl: 'partials/team/team-rubah.html',
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

                    // pertanyaan
                    .state('app.pertanyaan', {
                        url: '/pertanyaan',
                        template: '<div ui-view class=""></div>',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css', 'app/js/controllers/admin/pertanyaan.js'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.pertanyaan.list', {
                        url: '/list',
                        templateUrl: 'partials/pertanyaan/pertanyaan_all.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.pertanyaan.pertanyaan_add', {
                        url: '/add',
                        templateUrl: 'partials/pertanyaan/pertanyaan_add.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.pertanyaan.pertanyaan_rubah', {
                                url: '/pertanyaan_rubah/:id',
                                templateUrl: 'partials/pertanyaan/pertanyaan-rubah.html',
                                resolve: {
                                    deps: ['$ocLazyLoad',
                                        function($ocLazyLoad) {
                                            return $ocLazyLoad.load('cgNotify').then(
                                                function() {
                                                    return $ocLazyLoad.load('bower_components/font-awesome/css/font-awesome.css');
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
