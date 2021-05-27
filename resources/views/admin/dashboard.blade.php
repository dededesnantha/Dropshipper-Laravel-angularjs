<!DOCTYPE html>
<html lang="en" ng-app="app" class="no-js">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Admin Dropshippers</title>
    <meta name="description" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="img/favicon.png" type="image/x-icon" />
    <!-- Favicon -->
    <!-- CSS FRAMEWORK - START -->
    <link rel='stylesheet' href="{{asset('bower_components/angular-loading-bar/build/loading-bar.min.css')}}" type='text/css' media='all' />
    <!-- Angular Loader -->
    <link href="{{asset('bower_components/bootstrap/dist/css/bootstrap.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('bower_components/bootstrap/dist/css/bootstrap-theme.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('bower_components/font-awesome/css/font-awesome.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('css/material-icons.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('bower_components/animate.css/animate.min.css')}}" rel="stylesheet" type="text/css" />
    <!-- CSS FRAMEWORK - END -->
    <link rel="stylesheet" href="{{asset('css/app.style6.css')}}">
    <!-- notife -->
    <link rel="stylesheet" href="{{asset('bower_components/angular-notify/angular-notify.css')}}" />
    

    <script> 
    var baseurl = "{{ url('/')}}/" ; 
    var token = "{{ csrf_token() }}" ;
    </script>

</head>

<body ng-controller="AppCtrl" class="">
    <messageTemplate></messageTemplate>

    <div ui-view></div>
    <!-- JS FRAMEWORK - START -->
    <script src="{{asset('bower_components/jquery/dist/jquery.min.js')}}" type="text/javascript"></script>
    <!-- Angular Scripts -->
    <script src="{{asset('bower_components/angular/angular.js')}}"></script>
    <script src="{{asset('bower_components/angular-animate/angular-animate.js')}}"></script>
    <script src="{{asset('bower_components/angular-cookies/angular-cookies.js') }}"></script>
    <script src="{{asset('bower_components/angular-resource/angular-resource.js')}}"></script>
    <script src="{{asset('bower_components/angular-sanitize/angular-sanitize.js')}}"></script>
    <script src="{{asset('bower_components/angular-touch/angular-touch.js')}}"></script>
    <script src="{{asset('bower_components/angular-ui-router/release/angular-ui-router.js')}}"></script>
    <script src="{{asset('bower_components/ngstorage/ngStorage.js') }}"></script>
    <script src="{{asset('bower_components/angular-ui-utils/ui-utils.js')}}"></script>
    <script src="{{asset('bower_components/angular-bootstrap/ui-bootstrap-tpls.js') }}"></script>
    <!-- Angular ui bootstrap -->
    <script src="{{asset('bower_components/oclazyload/dist/ocLazyLoad.js')}}"></script>
    <!-- lazyload -->
    <script src="{{asset('bower_components/angular-loading-bar/build/loading-bar.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('bower_components/perfect-scrollbar/min/perfect-scrollbar.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('bower_components/angular-perfect-scrollbar/src/angular-perfect-scrollbar.js')}}" type="text/javascript"></script>
    <script src="{{asset('bower_components/angular-inview/angular-inview.js')}}" type="text/javascript"></script>
    <!-- JS FRAMEWORK - END -->
    <!-- alert -->
    <script src="{{asset('bower_components/angular-notify/angular-notify.js')}}" type="text/javascript"></script>


    

    <!-- App JS - Start -->
    <script src="{{asset('app/js/app.js')}}"></script>
    <script src="{{asset('app/js/app.config.js')}}"></script>
    <script src="{{asset('app/js/app.lazyload.js')}}"></script>
    <script src="{{asset('app/js/app.router.crm.js')}}"></script>
    <script src="{{asset('app/js/app.main.style6.js')}}"></script>
    <script src="{{asset('app/js/services/ui-load.js')}}"></script>
    <script src="{{asset('app/js/filters/moment-fromNow.js')}}"></script>
    <script src="{{asset('app/js/directives/nganimate.js')}}"></script>
    <script src="{{asset('app/js/directives/ui-jq.js')}}"></script>
    <script src="{{asset('app/js/directives/ui-module.js')}}"></script>
    <script src="{{asset('app/js/directives/ui-nav.js')}}"></script>
    <script src="{{asset('app/js/directives/ui-bootstrap.js')}}"></script>
    <script src="{{asset('app/js/directives/ui-chatwindow.js')}}"></script>
    <script src="{{asset('app/js/directives/ui-sectionbox.js')}}"></script>
    <script src="{{asset('app/js/controllers/bootstrap.js')}}"></script>
    <!-- App JS - End -->
    <script src="{{asset('bower_components/Chart.js/Chart.js')}}"></script>
    <!-- chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

</body>

</html>
