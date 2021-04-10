'use strict';
myApp.controller('AppCtrlFront', ['$scope', '$http', '$location', '$rootScope','$window','$route',
    function($scope,$http,$location,$rootScope,$window, $route) {
      $rootScope.loading = true;

      //check token
      $rootScope.load_sign = function(){
          $http.get(base_url+'api/session_user').then(function(response){
            if (response.status == 200) {
                $rootScope.user = response.data
                $scope.image_user = base_url+'image/'+$rootScope.user.foto_user
                if ($location.path() == '/login') {
                    $location.path('/home'); 
                }
            }else{
                $location.path('/login');
            }
          },function (error){
                $location.path('/login');
          });  
          $rootScope.$route = $route;
      }     

       $scope.load_sign();
       $scope.route = $location.path();

       $scope.logout = function(){     
         $http.post(base_url+'api/logout', $scope.user)
          .then(function(response) {
        $scope.load_sign();
            // $localStorage.user = response.data.user;
            // $localStorage.token = response.data.token;
        }, function(x) {
            SweetAlert.swal("Log Out error!", "error")
        });
      }

      $scope.suhaNavbarToggler = function(){
        $('#sidenavWrapper').addClass('nav-active');
        $('.sidenav-black-overlay').addClass('active');
      }

      $scope.suhaNavbarTogglerhide = function(){
        $('#sidenavWrapper').removeClass('nav-active');
        $('.sidenav-black-overlay').removeClass('active');
      }

      $scope.Back = function () {
        $window.history.back();
      }
    }
]);

