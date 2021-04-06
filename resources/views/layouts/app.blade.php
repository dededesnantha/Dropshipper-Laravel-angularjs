<!DOCTYPE html>
<html lang="en" ng-app="myApp">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, shrink-to-fit=no">
    <meta name="description" content="Suha - Multipurpose Ecommerce Mobile HTML Template">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="theme-color" content="#100DD1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <!-- The above tags *must* come first in the head, any other head content must come *after* these tags-->
    <!-- Title-->
    <title>Multipurpose Ecommerce Mobile HTML Template</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&amp;display=swap">
    
    <!-- CSS Libraries-->
    <link rel="stylesheet" href="{{asset('css/template/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/template/animate.css') }}">
    <link rel="stylesheet" href="{{asset('css/template/owl.carousel.min.css') }}">
    <link rel="stylesheet" href="{{asset('css/template/owl.theme.min.css') }}">
    <link rel="stylesheet" href="{{asset('css/template/font-awesome.min.css') }}">
    <link rel="stylesheet" href="{{asset('css/template/lineicons.min.css') }}">
    <!-- Stylesheet-->
    <link rel="stylesheet" href="{{asset('css/template/style.css') }}">
    <link rel="stylesheet" href="{{asset('bower_components/sweetalert/sweet-alert.css')}}"></link>

    <script> 
        var base_url = "{{ url('/')}}/" ; 
        var tokens = "{{ csrf_token() }}" ;
    </script>
  </head>
<body ng-controller="AppCtrlFront">
    <div class="preloader" id="preloader">
      <div class="spinner-grow text-secondary" role="status">
        <div class="sr-only">Loading...</div>
      </div>
    </div>

    <div ng-view></div>

    <!-- JS FRAMEWORK - START -->
    <script src="{{asset('bower_components/angular/angular.min.js')}}"></script>
    <script src="{{asset('bower_components/angular-cookies/angular-cookies.js') }}"></script>
    <script src="{{asset('bower_components/angular/angular-route-min.js')}}"></script>

    <script src="{{asset('bower_components/sweetalert/sweet-alert.min.js')}}"></script>
    <script src="{{asset('bower_components/sweetalert/SweetAlert.js')}}"></script>

    <script src="{{asset('js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{asset('js/jquery.min.js') }}"></script>
    <script src="{{asset('js/waypoints.min.js') }}"></script>
    <script src="{{asset('js/jquery.easing.min.js') }}"></script>
    <script src="{{asset('js/owl.carousel.min.js') }}"></script>
    <script src="{{asset('js/jquery.counterup.min.js') }}"></script>
    <script src="{{asset('js/jquery.countdown.min.js') }}"></script>
    <script src="{{asset('js/default/jquery.passwordstrength.js') }}"></script>
    <script src="{{asset('js/default/dark-mode-switch.js') }}"></script>
    <!-- <script src="{{asset('js/default/no-internet.js') }}"></script> -->
    <script src="{{asset('js/default/active.js') }}"></script>

    <!--  -->
    <script src="{{asset('js/app.js')}}"></script>
    <script src="{{asset('js/user/main.js')}}"></script>
    <script src="{{asset('js/user/route.js')}}"></script>
    <!-- end "user" -->
    <script src="{{asset('js/controller/frontendControllers.js')}}"></script>

</body>
</html>
