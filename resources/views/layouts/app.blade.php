<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" ng-app="Apps">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap">
    <link rel="stylesheet" id="css-main" href=" {{ asset('css/oneui.min.css') }}">

    <script> 
        var base_url = "{{ url('/')}}/" ;    
    </script>

</head>
<body>
    <div id="app" ng-controller="Appctrl as main">
        <main class="py-4">
            @yield('content')
        </main>
    </div>
    <!-- Load Javascript Libraries (AngularJS, JQuery, Bootstrap) -->
     <script src="{{asset('js/oneui.core.min.js')}}"></script>
    <script src="{{asset('js/oneui.app.min.js')}}"></script>
    <script src="{{asset('js/pages/be_ui_animations.min.js')}}"></script>
    <script
    src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.8/angular.min.js"></script>
    <script
    src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.8/angular-animate.min.js"></script>
    <script
    src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.8/angular-route.min.js"></script>
    <!-- AngularJS Application Scripts -->
    <script src="{{ asset('js/dashboard/app.js') }}"></script>
    <!-- app -->
    <script src="{{ asset('js/dashboard/app/login.js') }}"></script>
</body>
</html>
