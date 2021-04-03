'use strict';

myApp.controller('login', ['$scope', '$http','SweetAlert', function($scope, $http, SweetAlert){
	$scope.load_sign();
	$scope.form = {};
	$scope.save = function () {
		$http.post(base_url+'api/login_user', {username: $scope.form.username, password: $scope.form.password})
      	.then(function(response) {
			SweetAlert.swal("Login Berhasil!", "Hay, Selamat Datang", "success")
			$scope.load_sign();
      }, function(x) {
      		SweetAlert.swal("Login Gagal!", "Username dan Password Salah", "error")
      });

	}
}]);

myApp.controller('HomeController', ['$scope', '$http','SweetAlert','$location', function($scope, $http, SweetAlert, $location){
	$scope.load_sign();
	
	// $scope.form = {};
	// $scope.save = function () {
	// 	$http.post(base_url+'api/login_user', {username: $scope.form.username, password: $scope.form.password})
 //      	.then(function(response) {
	// 		SweetAlert.swal("Good job!", "You clicked the button!", "success")
	// 		console.log(response)
	// 		$scope.load_sign();
 //          // $localStorage.user = response.data.user;
 //          // $localStorage.token = response.data.token;
 //      }, function(x) {
 //      		SweetAlert.swal("Login Gagal!", "Username dan Password Salah", "error")
 //      });

	// }
}]);

myApp.controller('ProfileController', ['$scope', '$http','SweetAlert','$location', function($scope, $http, SweetAlert, $location){
	$scope.load_sign();
	$scope.user_datass = {};
	$scope.provinsi = {};
	$scope.kabupaten = {};
	$scope.kecamatan = {};
	// get user
	$http.post(base_url+'user',$scope.user).then(function(data) {
              $scope.user_datass = data.data;
    }, function(x) {
            SweetAlert.swal("Terjadi Kesalahan!", "error")
    });

    $http.get(base_url+'provinsi').then(function(data) {
              $scope.provinsi = data.data;
    }, function(x) {
        SweetAlert.swal("Terjadi Kesalahan!", "error")
    });

    $scope.get_kabupaten = function(id){
    	$http.get(base_url+'kabupaten/'+id).then(function(data) {
              $scope.kabupaten = data.data;
	    }, function(x) {
	        SweetAlert.swal("Terjadi Kesalahan!", "error")
	    });
    }
    $scope.get_kecamatan = function(id){
    	$http.get(base_url+'kecamatan/'+id).then(function(data) {
              $scope.kecamatan = data.data;
	    }, function(x) {
	        SweetAlert.swal("Terjadi Kesalahan!", "error")
	    });
    }

    $scope.uploadedFile = function(element) {
            var reader = new FileReader();
            reader.onload = function(event) {
             $scope.$apply(function($scope) {
                $scope.files = element.files;
                 $scope.src = event.target.result  
             });
            }
            reader.readAsDataURL(element.files[0]);
          }
	// $scope.form = {};
	// $scope.save = function () {
	// 	$http.post(base_url+'api/login_user', {username: $scope.form.username, password: $scope.form.password})
 //      	.then(function(response) {
	// 		SweetAlert.swal("Good job!", "You clicked the button!", "success")
	// 		console.log(response)
	// 		$scope.load_sign();
 //          // $localStorage.user = response.data.user;
 //          // $localStorage.token = response.data.token;
 //      }, function(x) {
 //      		SweetAlert.swal("Login Gagal!", "Username dan Password Salah", "error")
 //      });

	// }
}]);


