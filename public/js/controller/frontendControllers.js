'use strict';

myApp.controller('login', ['$scope', '$http','SweetAlert', function($scope, $http, SweetAlert){
	$scope.load_sign();
	$scope.form = {};
	$scope.save = function () {
		$http.post(base_url+'api/login_user', {username: $scope.form.username, password: $scope.form.password})
      	.then(function(response) {
			// SweetAlert.swal("Login Berhasil!", "Hay, Selamat Datang", "success")
			SweetAlert.swal({
				  title: 'Login Berhasil',
				  text: '',
				  timer:100,
				  type: "success",
				  showCancelButton: false,
				  showConfirmButton: false
				})
			setTimeout(function () {
		       $scope.load_sign();
		    }, 3000);
      }, function(x) {
      		SweetAlert.swal("Login Gagal!", "Username dan Password Salah", "error")
      });

	}
}]);

myApp.controller('HomeController', ['$scope', '$http','SweetAlert','$location','$route','$uibModal', 
	function($scope, $http, SweetAlert, $location, $route, $uibModal){
	$scope.load_sign();
	
	// $scope.loading = false;
	// get slider
	$scope.slider = [];
	$http.get(base_url+'get_slider').then(function(data) {
              $scope.slider = data.data;
              angular.forEach($scope.slider, function (values, key) {
               	values['image'] = base_url +'gallery/'+values['image'];
              });
	}, function(x) {
	     SweetAlert.swal("Terjadi Kesalahan!", "error")
	});

	$http.get(base_url+'get_kategori').then(function(data) {
              $scope.kategori = data.data;
              angular.forEach($scope.kategori, function (values, key) {
               	values['gambar'] = base_url +'image/'+values['gambar'];
              });
	}, function(x) {
	     SweetAlert.swal("Terjadi Kesalahan!", "error")
	});

	$http.get(base_url+'get_top_produk').then(function(data) {
              $scope.produk = data.data;
              angular.forEach($scope.produk, function (values, key) {
               	values['gambar'] = base_url +'image/'+values['gambar'];
              });
	}, function(x) {
	     SweetAlert.swal("Terjadi Kesalahan!","", "error")
	});

	$http.get(base_url+'get_produk').then(function(data) {
              $scope.produkAll = data.data;
              angular.forEach($scope.produkAll, function (values, key) {
               	values['gambar'] = base_url +'image/'+values['gambar'];
              });
              $scope.loading = false;
	}, function(x) {
	     SweetAlert.swal("Terjadi Kesalahan!","", "error")
	});

	$scope.add = function(id) {
		var modalInstance =  $uibModal.open({
	      templateUrl: "views/modal/modalContent.html",
	      controller: "ModalContentCtrl",
	      resolve: {
              items: function () {
                return id;
              }
           }
	    });
	    modalInstance.result.then(function() {
	        
	    }, function () {
            
        });
	    
	  };

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


myApp.controller('ModalContentCtrl', ['$scope', '$uibModalInstance', 'items', '$http','SweetAlert','$location','$route', 
	function($scope, $uibModalInstance, items, $http,SweetAlert,$location,$route) {
	
	$scope.datass = {};
	$http.get(base_url+'card_produk/'+items).then(function(data) {
              $scope.produks = data.data;
              $scope.produks.gambar = base_url+'image/'+$scope.produks.gambar;
	   }, function(x) {
	        SweetAlert.swal("Terjadi Kesalahan!", "error")
	    });

  $scope.addchart = function(){
  	if ($scope.produks.warna.length > 0 && $scope.produks.size.length === 0) {
  		if (!$scope.datass.colors) {
  			SweetAlert.swal("Anda Belum Memilih Warna","", "error")
  		}else{
  			$scope.post($scope.datass, items)
  		}
  	}else if($scope.produks.warna.length === 0 && $scope.produks.size.length > 0){
  		if (!$scope.datass.size) {
  			SweetAlert.swal("Anda Belum Memilih Size","", "error")
  		}else{
  			$scope.post($scope.datass, items)
  		}
  	}else{
  		if (!$scope.datass.size || !$scope.datass.colors) {
  			SweetAlert.swal("Anda Belum Memilih Size Atau Warna","", "error")
  		}else{
  			$scope.post($scope.datass, items)
  		}
  	}
  }

  	$scope.qty_tambah = function(item){
    	$scope.datass.qty = item + 1;
	}
	$scope.qty_kurang = function(item){
	    if($scope.datass.qty > 1){
	       $scope.datass.qty = item - 1;
	    }

	}

  $scope.post = function($datass, $id){
  	$datass.id_produk = $id;
  	$datass.id_user = $scope.user.id_user;
  	$http.post(base_url+'add_cart',$datass)
      	.then(function(response) {
      		$uibModalInstance.dismiss();
			SweetAlert.swal({
			   title: "Ye..Pesanan Berhasil ",
			   text: "Pesanan mu berhasil disimpan",
			   type: "success",
			   showCancelButton: true,
			   confirmButtonColor: "#00b894",
			   confirmButtonText: "Lanjut Pembayaran",
			   cancelButtonText: "Lanjut Belanja",
			   closeOnConfirm: false}, 
			function(){ 
				console.log('keranjang')
			});
			$scope.load_sign();
    }, function(x) {
      		SweetAlert.swal("Terjadi Kesalahan!", "Mohon Untuk Mengulangi Pesanan Anda", "error")
    });
  }
   
  $scope.cancel = function(){
    $uibModalInstance.dismiss();
  } 
  
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
              $scope.user_datass.telephone = parseInt($scope.user_datass.telephone)
              $scope.get_kabupaten($scope.user_datass.id_provinsi)
              $scope.get_kecamatan($scope.user_datass.id_kabupaten)
              $scope.src = base_url+'image/'+$scope.user_datass.foto_user;
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

    $scope.file = [];
    $scope.uploadedFile = function(element) {
            var reader = new FileReader();
            reader.onload = function(event) {
             $scope.$apply(function($scope) {
                $scope.file = element.files[0];
        		$scope.src = event.target.result  
             });
            }
            reader.readAsDataURL(element.files[0]);

    }

	$scope.save = function () {
		$http({
		method  : 'POST',
		url     : base_url+'upload/gambar',
		headers: { 'Content-Type': undefined},
		transformRequest: function (data) {
		var formData = new FormData();
			formData.append("file", $scope.file);
			return formData;
			}
		}).then(function(data) {
		console.log(data);
			if (data.data){
	            $scope.user_datass.foto_user = data.data
	        }
	        $http.post(base_url+'update_profile/'+$scope.user.id_user,$scope.user_datass)
	        .then(function(response) {
            	SweetAlert.swal("Update Berhasil!", "Hay, Data Kamu Sudah di Update", "success")
            	$scope.load_sign();
			}, function(x) {
            	SweetAlert.swal("Terjadi Kesalahan!"," ", "error")        
			});
		}, function(x) {
	        SweetAlert.swal("Terjadi Kesalahan!", "error")
	    });
	}
}]);

// myApp.controller('SliderController', ['$scope', '$http','SweetAlert','$location', function($scope, $http, SweetAlert, $location){
// 	// get slider
// 	$scope.slider = [];
// 	$http.get(base_url+'get_slider').then(function(data) {
//               $scope.slider = data.data;
//               angular.forEach($scope.slider, function (values, key) {
//                	values['image'] = base_url +'gallery/'+values['image'];
//               });
// 	}, function(x) {
// 	     SweetAlert.swal("Terjadi Kesalahan!", "error")
// 	});

// }])

myApp.directive("owlCarousel", function() {
	return {
		restrict: 'E',
		transclude: false,
		link: function (scope) {
			scope.initCarousel = function(element) {
			  // provide any default options you want
				var defaultOptions = {
				};
				var customOptions = scope.$eval($(element).attr('data-options'));
				// combine the two options objects
				for(var key in customOptions) {
					defaultOptions[key] = customOptions[key];
				}
				// init carousel
				$(element).owlCarousel(defaultOptions);
			};
		}
	};
})
myApp.directive('owlCarouselItem', [function() {
	return {
		restrict: 'A',
		transclude: false,
		link: function(scope, element) {
		  // wait for the last item in the ng-repeat then call init
			if(scope.$last) {
				scope.initCarousel(element.parent());
			}
		}
	};
}]);

// myApp.controller('KategoriController', ['$scope', '$http','SweetAlert','$location', function($scope, $http, SweetAlert, $location){
// 	$http.get(base_url+'get_kategori').then(function(data) {
//               $scope.kategori = data.data;
//               angular.forEach($scope.kategori, function (values, key) {
//                	values['gambar'] = base_url +'image/'+values['gambar'];
//               });
// 	}, function(x) {
// 	     SweetAlert.swal("Terjadi Kesalahan!", "error")
// 	});
// }]);

myApp.controller('ListKategoriController', ['$scope', '$http','SweetAlert','$location', '$routeParams', function($scope, $http, SweetAlert, $location, $routeParams){
	$scope.filteredCustomers = [];
	$scope.currentPage = 1;
	$scope.numPerPage = 16;
	$scope.maxSize = 10;

	$scope.init = function() {
		$http.get(base_url+'get_kategori_produk/'+$routeParams.slug).then(function(data) {
	              $scope.kategori = data.data.kategori;
	              $scope.kategori.gambar = base_url +'image/'+$scope.kategori.gambar;
	              $scope.produks = data.data.produk;
	              angular.forEach($scope.produks, function (values, key) {
	               	values['gambar'] = base_url +'image/'+values['gambar'];
	              });

	              $scope.$watch('currentPage + numPerPage', updateFilteredItems);

				  function updateFilteredItems() {
				    var begin = (($scope.currentPage - 1) * $scope.numPerPage),
				      end = begin + $scope.numPerPage;

				    $scope.filteredCustomers = $scope.produks.slice(begin, end);
				    $scope.loading = false;
				  }
		}, function(x) {
		     SweetAlert.swal("Terjadi Kesalahan!","","error")
		});
	}
	$scope.init();

}]);

// myApp.controller('ProdukController', ['$scope', '$http','SweetAlert','$location', function($scope, $http, SweetAlert, $location){
// 	$http.get(base_url+'get_top_produk').then(function(data) {
//               $scope.produk = data.data;
//               angular.forEach($scope.produk, function (values, key) {
//                	values['gambar'] = base_url +'image/'+values['gambar'];
//               });
// 	}, function(x) {
// 	     SweetAlert.swal("Terjadi Kesalahan!","", "error")
// 	});
// }]);

// myApp.controller('ProdukAllController', ['$scope', '$http','SweetAlert','$location', function($scope, $http, SweetAlert, $location){
// 	$http.get(base_url+'get_produk').then(function(data) {
//               $scope.produkAll = data.data;
//               angular.forEach($scope.produkAll, function (values, key) {
//                	values['gambar'] = base_url +'image/'+values['gambar'];
//               });
// 	}, function(x) {
// 	     SweetAlert.swal("Terjadi Kesalahan!","", "error")
// 	});
// }]);

myApp.controller('SingleProdukController', ['$scope', '$http','SweetAlert','$location','$routeParams', function($scope, $http, SweetAlert, $location, $routeParams){
	$scope.load_sign();
	$http.get(base_url+'produk/'+$routeParams.slug).then(function(data) {
              $scope.produks = data.data.produk;
              angular.forEach($scope.produks.gambar, function (values, key) {
               	values['gambar'] = base_url +'image/'+values['gambar'];
              });
              document.getElementById("desc_text").innerHTML = $scope.produks.deskripsi;
              $scope.loading = false;
	}, function(x) {
	     SweetAlert.swal("Terjadi Kesalahan!","","error")
	});
}]);

myApp.controller('ListProdukTopController', ['$scope', '$http','SweetAlert','$location','$routeParams','$uibModal', function($scope, $http, SweetAlert, $location, $routeParams, $uibModal){
	$scope.filteredCustomers = [];
	$scope.currentPage = 1;
	$scope.numPerPage = 16;
	$scope.maxSize = 10;
	$http.get(base_url+'produk_top').then(function(data) {
              $scope.produks = data.data;
              
              angular.forEach($scope.produks, function (values, key) {
               	values['gambar'] = base_url +'image/'+values['gambar'];
              });
              $scope.$watch('currentPage + numPerPage', updateFilteredItems);

				  function updateFilteredItems() {
				    var begin = (($scope.currentPage - 1) * $scope.numPerPage),
				      end = begin + $scope.numPerPage;

				    $scope.filteredCustomers = $scope.produks.slice(begin, end);
				    $scope.loading = false;
				  }
	}, function(x) {
	     SweetAlert.swal("Terjadi Kesalahan!","","error")
	});

	$scope.add = function(id) {
		var modalInstance =  $uibModal.open({
	      templateUrl: "views/modal/modalContent.html",
	      controller: "ModalContentCtrl",
	      resolve: {
              items: function () {
                return id;
              }
           }
	    });
	    modalInstance.result.then(function() {
	        
	    }, function () {
            
        });
	    
	  };
}]);

myApp.controller('ListProdukController', ['$scope', '$http','SweetAlert','$location','$routeParams', function($scope, $http, SweetAlert, $location, $routeParams){
	$scope.filteredCustomers = [];
	$scope.currentPage = 1;
	$scope.numPerPage = 16;
	$scope.maxSize = 10;
	$http.get(base_url+'produk_all').then(function(data) {
              $scope.produks = data.data;
              
              angular.forEach($scope.produks, function (values, key) {
               	values['gambar'] = base_url +'image/'+values['gambar'];
              });
              $scope.$watch('currentPage + numPerPage', updateFilteredItems);

				  function updateFilteredItems() {
				    var begin = (($scope.currentPage - 1) * $scope.numPerPage),
				      end = begin + $scope.numPerPage;

				    $scope.filteredCustomers = $scope.produks.slice(begin, end);
				    $scope.loading = false;
				  }
	}, function(x) {
	     SweetAlert.swal("Terjadi Kesalahan!","","error")
	});
}]);

myApp.controller('ListKategoriAllController', ['$scope', '$http','SweetAlert','$location','$routeParams', function($scope, $http, SweetAlert, $location, $routeParams){
	$scope.filteredCustomers = [];
	$scope.currentPage = 1;
	$scope.numPerPage = 16;
	$scope.maxSize = 10;
	$http.get(base_url+'kategori_all').then(function(data) {
              $scope.kategori = data.data;
              
              angular.forEach($scope.kategori, function (values, key) {
               	values['gambar'] = base_url +'image/'+values['gambar'];
              });
              $scope.$watch('currentPage + numPerPage', updateFilteredItems);

				  function updateFilteredItems() {
				    var begin = (($scope.currentPage - 1) * $scope.numPerPage),
				      end = begin + $scope.numPerPage;

				    $scope.filteredCustomers = $scope.kategori.slice(begin, end);
				    $scope.loading = false;
				  }
	}, function(x) {
	     SweetAlert.swal("Terjadi Kesalahan!","","error")
	});
}]);

myApp.controller('SettingController', ['$scope', '$http','SweetAlert','$location','$routeParams','$window', function($scope, $http, SweetAlert, $location, $routeParams, $window){
	$scope.load_sign();

}]);





