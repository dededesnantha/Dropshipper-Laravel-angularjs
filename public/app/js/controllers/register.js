'use strict';

// signup controller
app.controller('RegisterFormController', ['$scope', '$http', '$state','notify','$location', function($scope, $http, $state,notify,$location) {
    $scope.user = {};
    $scope.authError = true;
    
    $scope.authError_msg = '';
    $scope.register = function() {
      // Try to create
      $http.post(baseurl+'api/register', {name: $scope.user.name, email: $scope.user.email, password: $scope.user.password})
      .then(function(response) {
        // $scope.authError_msg = "Akun Berhasil di Daftar, Kembali ke Login";
        notify({ message:'Berhasil di Daftarkan, Login Kembali', 
                      position:'center',
                      duration:'10000',
                      classes: 'alert-success'
                    }); 
        $location.path('/access/signin');
      }, function(x) {
        
        notify({ message:'Email atau User sudah digunakan', 
                      position:'center',
                      duration:'10000',
                      classes: 'alert-danger'
                    }); 
      });
    };
  }])
 ;