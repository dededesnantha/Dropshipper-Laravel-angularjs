'use strict';

/* Controllers */
  // signin controller
app.controller('LoginFormController', ['$scope', '$http','$localStorage', '$state','notify', function($scope, $http, $localStorage, $state,notify) {
    $scope.user = {};
    $scope.login = function() {
      // Try to login
      $scope.authError = false;
      $http.post(baseurl+'api/login', {username: $scope.user.name, password: $scope.user.password})
      .then(function(response) {
          $localStorage.user = response.data.user;
          $localStorage.token = response.data.token;

          notify({ message:'Login Berhasil dan Selamat Datang '+' '+$localStorage.user, 
                      position:'center',
                      duration:'10000',
                      classes: 'alert-success'
                    }); 

          $scope.load_sign();
      }, function(x) {
        notify({ message:x.data.message, 
                      position:'center',
                      duration:'10000',
                      classes: 'alert-danger'
                    }); 
      });
    };
  }])
;