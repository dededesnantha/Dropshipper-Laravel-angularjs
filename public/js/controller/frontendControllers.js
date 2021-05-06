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
				  text: 'Anda Akan Dialihkan Kehalaman Utama',
				  timer: 3000,
				  buttons: false,
				  type: "success",
				  showCancelButton: false,
				  showConfirmButton: false,
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

myApp.controller('ModalContentCtrl', ['$scope', '$uibModalInstance', 'items', '$http','SweetAlert','$location','$route','$cookies',
	function($scope, $uibModalInstance, items, $http,SweetAlert,$location,$route,$cookies) {
	
	$scope.datass = {};
	$scope.produks = {};
	$scope.carts = {};
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
  		if ( item >= $scope.produks.stok) {
  			SweetAlert.swal("Barang Hanya Tersedia "+$scope.produks.stok,"", "warning")
  		}else{
			$scope.datass.qty = item + 1;
  		}
	}
	$scope.qty_kurang = function(item){
	    if($scope.datass.qty > 1){
	       $scope.datass.qty = item - 1;
	    }

	}

  $scope.post = function($datass, $id){
  	
  	$datass.id_produk = $id;
  	$datass.id_user = $scope.user.id_user;
  	
  	// $scope.carts.push($datass);
  	
  	// var expireDate = new Date();
  	// expireDate.setDate(expireDate.getDate() + 1);
  	// $cookies.putObject('cart', $scope.carts,  {'expires': expireDate});
  	
  	$http.post(base_url+'add_cart',$datass)
      	.then(function(response) {
      		$scope.count_cart();
      		$uibModalInstance.dismiss();
			SweetAlert.swal({
			   title: "Ye..Pesanan Berhasil ",
			   text: "Pesanan mu berhasil disimpan",
			   type: "success",
			   showCancelButton: true,
			   confirmButtonColor: "#00b894",
			   confirmButtonText: "Lihat Keranjang",
			   cancelButtonText: "Lanjut Belanja",
			   closeOnConfirm: true,
				closeOnCancel: true}, 
				function(isConfirm){ 
					if (isConfirm) {
						$location.path( "/cart" );
					} 
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



myApp.controller('ProfileController', ['$scope', '$http','SweetAlert','$location','$uibModal', function($scope, $http, SweetAlert, $location, $uibModal){
	$scope.load_sign();
	$scope.user_datass = {};
	$scope.provinsi = {};
	$scope.kabupaten = {};
	$scope.kecamatan = {};
	// get user
	$scope.get_user = function(){
		$http.post(base_url+'user',$scope.user).then(function(data) {
	              $scope.user_datass = data.data;
	              $scope.user_datass.telephone =$scope.user_datass.telephone
	              $scope.get_kabupaten($scope.user_datass.id_provinsi)
	              $scope.get_kecamatan($scope.user_datass.id_kabupaten)
	              $scope.src = base_url+'image/'+$scope.user_datass.foto_user;
	    }, function(x) {
	            SweetAlert.swal("Terjadi Kesalahan!", "error")
	    });
	}
	$scope.get_user();
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
			if (data.data){
	            $scope.user_datass.foto_user = data.data
	        }
	        $scope.user_datass.id_user = $scope.user.id_user;
	        $http.post(base_url+'update_profile',$scope.user_datass)
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

myApp.controller('ModalEditAlamat', ['$scope', '$uibModalInstance', 'items', '$http','SweetAlert','$location','$route', 
	function($scope, $uibModalInstance, items, $http,SweetAlert,$location,$route) {
	$scope.notif = {}
	$scope.notif.nama = true;
	$scope.notif.tlp = true;
	$scope.notif.prv = true;
	$scope.notif.kbt = true;
	$scope.notif.kcm = true;
	$scope.notif.address = true;

	$scope.id_user = items;
	// get alamat
	$scope.get_alamat = function() {
		$http.post(base_url+'get_alamat',$scope.id_user).then(function(data) {
			$scope.user_datass = data.data;
	              $scope.user_datass.telephone = $scope.user_datass.telephone
	              $scope.get_kabupaten($scope.user_datass.id_provinsi)
	              $scope.get_kecamatan($scope.user_datass.id_kabupaten)
	    }, function(x) {
	            SweetAlert.swal("Terjadi Kesalahan!", "error")
	    });
	}
   $scope.get_alamat();
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

    $scope.update = function() {
    	if ($scope.user_datass.nama == '') {
    		$scope.notif.nama = false;
    	}else if ($scope.user_datass.telephone == '') {
    		$scope.notif.tlp = false;
    	}else if ($scope.user_datass.id_provinsi == null) {
    		$scope.notif.prv = false;
    	}else if ($scope.user_datass.id_kabupaten == null) {
    		$scope.notif.kbt = false;
    	}else if ($scope.user_datass.id_kecamatan == null) {
    		$scope.notif.kcm = false;
    	}else if ($scope.user_datass.address == '') {
    		$scope.notif.address = false;
    	}else{
    		$scope.user_datass.id_user = items;
    		$http.put(base_url+'update_alamat',$scope.user_datass).then(function(data) {
			SweetAlert.swal({
				  title: 'Update Berhasil',
				  text: 'Alamat Pengiriman Berhasil di Rubah',
				  timer: 2000,
				  buttons: false,
				  type: "success",
				  showCancelButton: false,
				  showConfirmButton: false,
				})
			$uibModalInstance.dismiss();
		    }, function(x) {
		            SweetAlert.swal("Terjadi Kesalahan!", "error")
		    });
    	}
    }



  $scope.cancel = function(){
    $uibModalInstance.dismiss();
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
	$scope.url = "Produk Detail";
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

myApp.controller('CartController', ['$scope', '$http','SweetAlert','$location','$routeParams','$window', function($scope, $http, SweetAlert, $location, $routeParams, $window){
	$scope.load_sign();
	$scope.count_cart();
	$scope.produks = {}; 
	$scope.datass = function(){
		$http.post(base_url+'get_cart',$scope.user).then(function(data) {
				$scope.produks = data.data
	              angular.forEach($scope.produks, function (values, key) {
	               	values['gambar'] = base_url +'image/'+values['gambar'];
	               	values['notif'] = true;
	              });
	              console.log($scope.produks)
	              $scope.getTotal();
	              $scope.loading = false;
		}, function(x) {
		     SweetAlert.swal("Terjadi Kesalahan!","","error")
		});
	}
	$scope.datass();
	$scope.qty_tambah = function(item, id, size, color){
		angular.forEach($scope.produks, function (values, key) {
    		if (values.id === id && values.size === size && values.color.color === color) {
	       		if ( item >= values.stok) {
		  			values['notif'] = false;
		  		}else{
					values['qty'] = item + 1;
		  		}
	       	}
	    });
	    $scope.getTotal();
	}
	$scope.qty_kurang = function(item, id, size, color){
		$scope.notif = true;
		angular.forEach($scope.produks, function (values, key) {
	       	if (values.id === id && values.size === size && values.color.color === color) {
			    if(item > 1){
			       values['qty'] = item - 1;
			       values['notif'] = true;
			    }
	       	}
		});
		$scope.getTotal();
	}
	$scope.update_totals = function(item, id, size, color){
			if (item !== 0) {
				angular.forEach($scope.produks, function (values, key) {
			       	if (values.id === id && values.size === size && values.color.color === color) {
			       		if ( item >= values.stok) {
				  			values['notif'] = false;
				  			values['qty'] = values.stok;
				  			$scope.getTotal();
				  		}else{
				  			values['notif'] = true;
							$scope.getTotal();
				  		}
			       	}
			    });
			}else{
				angular.forEach($scope.produks, function (values, key) {
					values['qty'] = 1;
				});
			}
	}
	

	$scope.getTotal = function(){
	    $scope.produks.totals = 0;
	    angular.forEach($scope.produks, function (values, key) {
	    	if (values['harga_promo']) {
	    		$scope.produks.totals += values['harga_promo'] * values['qty'];
	    	}else{
	       		$scope.produks.totals += values['harga'] * values['qty'];
	    	}
	    });
	}

	$scope.delete = function(id, size, color) {
		$scope.datass_delete = {};
		SweetAlert.swal({
		   title: "Hapus barang?",
		   text: "Barang yang kamu pilih akan dihapus dari keranjang.",
		   type: "warning",
		   showCancelButton: true,
		   confirmButtonColor: "#DD6B55",
		   confirmButtonText: "Hapus Barang",
		   closeOnConfirm: false,
			closeOnCancel: true}, 
		function(isConfirm){ 
			if (isConfirm) {
				$scope.datass_delete.id = id;
				$scope.datass_delete.size = size;
				$scope.datass_delete.color = color;
				$http.post(base_url+'delete_cart',$scope.datass_delete)
				.then(function(respone) {
					$scope.count_cart();
			       	$scope.datass();
			   		SweetAlert.swal({
					  title: 'Barang Berhasil Dihapus',
					  text: '',
					  timer: 2000,
					  buttons: false,
					  type: "success",
					  showCancelButton: false,
					  showConfirmButton: false,
					})

				});
			}
		});
	}

	$scope.beli = function() {
		$http.post(base_url+'update_cart',$scope.produks).then(function(data) {
			$location.path( "/checkout");
		}, function(x) {
		     SweetAlert.swal("Terjadi Kesalahan!","","error")
		});
	}
}]);

myApp.controller('CheckoutController', ['$scope', '$http','SweetAlert','$location','$routeParams','$document','$uibModal','$cookies', function($scope, $http, SweetAlert, $location, $routeParams, $document, $uibModal, $cookies){
	$scope.load_sign();
	$scope.url = "Checkout";
	$scope.text_kurir = true
	$scope.showload = false
	$scope.ongkirs = '';
	$scope.cout_produk = 0;
	$scope.subtotal = 0;
	$scope.notif = {}
	$scope.notif.kurir = true;
	// get user
	$scope.get_user = function(){
		$http.post(base_url+'user',$scope.user).then(function(data) {
	              $scope.user_datass = data.data;
	              $scope.user_datass.telephone =$scope.user_datass.telephone
	              $scope.get_kabupaten($scope.user_datass.id_provinsi)
	              $scope.get_kecamatan($scope.user_datass.id_kabupaten)
	              $scope.src = base_url+'image/'+$scope.user_datass.foto_user;
	    }, function(x) {
	            SweetAlert.swal("Terjadi Kesalahan!", "error")
	    });
	}
	$scope.get_user();
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
	$scope.edit_alamat = function() {
		var modalInstance =  $uibModal.open({
	      templateUrl: "views/modal/Edit_alamat.html",
	      controller: "ModalEditAlamat",
	      size: "lg",
	      resolve: {
              items: function () {
                return $scope.user.id_user;
              }
           }
	    });
	    modalInstance.result.then(function() {
	        $scope.get_user();
	        $scope.ongkirs = '';
	        $cookies.remove('ongkirs');
	    }, function () {
            $scope.get_user();
            $scope.ongkirs = '';
            $cookies.remove('ongkirs');
        });
	};

	// get_produk
	$scope.datass = function(){
		$http.post(base_url+'get_cart').then(function(data) {
				$scope.produks = data.data
	              angular.forEach($scope.produks, function (values, key) {
	              values['gambar'] = base_url +'image/'+values['gambar'];
	               	$scope.cout_produk += values['qty'];
	              });
	              $scope.getTotal();
	              $scope.loading = false;
		}, function(x) {
		     SweetAlert.swal("Terjadi Kesalahan!","","error")
		});
	}
	$scope.datass();
	$scope.getTotal = function(){
	    $scope.totals_produk = 0;
	    angular.forEach($scope.produks, function (values, key) {
	    	if (values['harga_promo']) {
	    		$scope.totals_produk += values['harga_promo'] * values['qty'];
	    	}else{
	       		$scope.totals_produk += values['harga'] * values['qty'];
	    	}
	    });
	}
	
	$scope.showJne = false;
	$scope.kurir = {};
	
	$scope.toggleOngkirDropdown = function($event){
		$scope.text_kurir = false
		$scope.showload = true
		$http.post(base_url+'get_ongkir',$scope.user).then(function(data) {
				$scope.text_kurir = true
				$scope.showload = false
				$scope.kurir = data.data.kurir;
		}, function(x) {
		     SweetAlert.swal("Terjadi Kesalahan!","","error")
		});

		$event.stopPropagation()
		if (!$scope.showJne) {
			var closeMe = function(scope) { 
				$scope.showJne = false;
				$document.unbind('click', this);
			};
			$document.bind('click', function(event) {
				$scope.$apply(function(){
					closeMe($scope)
				})
			}); 
		$scope.showJne = true;
		} else {
			$scope.showJne = false;
			$scope.text_kurir = true
			$scope.showload = false
		} 
	}
	
	$http.post(base_url+'get_ongkir',$scope.user).then(function(data) {
		$scope.kurir = data.data.kurir;
		$scope.cookies_kurir();
		$scope.getTotal();
	}, function(x) {
	});

	$scope.cookies_kurir = function($event){
	if ($cookies.get('ongkirs') !=='') {
		angular.forEach($scope.kurir, function (values, key) {
			if (values.id_ongkir == $cookies.get('ongkirs')) {
				$scope.ongkirs = {
					id_ongkir: values['id_ongkir'],
					ongkir: values['judul'],
					harga: values['harga']
				}
			}
		});
	$scope.subtotal = $scope.totals_produk + $scope.ongkirs.harga
		}
	};
	

	$scope.get_kurir = function (e) {
		$scope.notif.kurir = true;
    	angular.forEach($scope.kurir, function (values, key) {
			if (values.id_ongkir == e) {
				$scope.ongkirs = {
					id_ongkir: values['id_ongkir'],
					ongkir: values['judul'],
					harga: values['harga']
				}
				$cookies.put('ongkirs', $scope.ongkirs.id_ongkir);
    		}
	    });
		$scope.subtotal = $scope.totals_produk + $scope.ongkirs.harga
	};
	

	$scope.pembayaran = function () {
		if ($scope.ongkirs) {
			$scope.datas = {}
			$scope.id_orders = '';
			$scope.datas.subtotal = $scope.subtotal;
			$scope.datas.ongkirs = $scope.ongkirs.id_ongkir;
			$scope.datas.id_user = $scope.user.id_user;

			for(var i=0; i< $scope.produks.length; i++){
			  $scope.id_orders += $scope.produks[i]['id_order'];
			  if(i < ($scope.produks.length-1) ){
			   $scope.id_orders += ',';
			  }
			}

			$scope.datas.id_orders = $scope.id_orders;
			$http.post(base_url+'add_transaksi',$scope.datas).then(function(data) {
			$scope.modalPembyarn(data.data)
		}, function(x) {
		     SweetAlert.swal("Terjadi Kesalahan!","","error")
		});
		}else{
			$scope.notif.kurir = false;
		}
	}

	$scope.modalPembyarn = function(data) {
		var modalInstance =  $uibModal.open({
	      templateUrl: "views/modal/pembayaran.html",
	      controller: "ModalPembayaran",
	      resolve: {
              items: function () {
                return data;
              }
           }
	    });
	    modalInstance.result.then(function() {
	        $scope.loading = true 
	    }, function () {
	    	$scope.loading = true 
        });
	};

}])

myApp.controller('ModalPembayaran', ['$scope', '$uibModalInstance', 'items', '$http','SweetAlert','$location','$route','$rootScope', 
	function($scope, $uibModalInstance, items, $http,SweetAlert,$location,$route,$rootScope) {
		$http.get(base_url+'payment/'+items).then(function(data) {
			$scope.total = data.data.total_transkasi;
			$scope.id_transaksi = items; 
		}, function(x) {
			SweetAlert.swal("Terjadi Kesalahan!", "error")
		});

	$scope.bayar = function(data){
		$uibModalInstance.close();
		$http.post(base_url+'transaction/'+data).then(function(data) {
			$scope.count_cart();
			$location.path("/payment/"+items);
		}, function(x) {
		});
	};

}])

myApp.directive('onlyNumbers', function () {
    return  {
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('keydown', function (event) {
                if(event.shiftKey){event.preventDefault(); return false;}
                if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1) {
                    return true;
                } else if (event.which >= 48 && event.which <= 57) {
                    return true;
                } else if (event.which >= 96 && event.which <= 105) {
                    return true;
                } 
                else {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }
});

myApp.controller('PaymentController', ['$scope', '$http','SweetAlert','$location', '$routeParams','$uibModal', function($scope, $http, SweetAlert, $location, $routeParams, $uibModal){
	$scope.load_sign();
	$scope.url = "Detail Pembayaran";
	$scope.datass = {};

	$http.get(base_url+'get/transaction/'+$routeParams.id).then(function(data) {
		$scope.loading = false;
		$scope.datass = data.data;
	}, function(x) {
		SweetAlert.swal("Terjadi Kesalahan!", "error")
	});

	$scope.detail = function(data){
		var modalInstance =  $uibModal.open({
	      templateUrl: "views/modal/detail_payment.html",
	      controller: "ModalDetailPembayaran",
	      size:'lg',
	      resolve: {
              items: function () {
                return data;
              }
           }
	    });
	    modalInstance.result.then(function() {
	    }, function () {
        });
	}
	// $scope.metode = function (metode) {
	// 	$scope.datass.metode = metode;
	// 	$http.put(base_url+'metode/'+$routeParams.id,$scope.datass).then(function(data) {
	// 		$location.path( "/payment/"+data);
	// 	}, function(x) {
	// 	     SweetAlert.swal("Terjadi Kesalahan!","","error")
	// 	});
	// }
}]);

myApp.controller('ModalDetailPembayaran', ['$scope', '$uibModalInstance', 'items', '$http','SweetAlert','$location','$route', 
	function($scope, $uibModalInstance, items, $http,SweetAlert,$location,$route) {
		$scope.datass = {};
		$http.get(base_url+'detail/transaksi/'+items).then(function(data) {
			$scope.datass = data.data;
			console.log($scope.datass)
		}, function(x) {
			SweetAlert.swal("Terjadi Kesalahan!", "error")
		});
}]);

myApp.controller('OrderController', ['$scope', '$http','SweetAlert','$location', '$routeParams','$uibModal', function($scope, $http, SweetAlert, $location, $routeParams, $uibModal){
	$scope.load_sign();
	$scope.url = "Konfirmasi Pembayaran";
	$scope.datass = {};
	$scope.notif = {}
	$scope.notif.tanggal = true;
	$scope.notif.bank = true;
	$scope.notif.img = true;

	$http.get(base_url+'detail/transaksi/'+$routeParams.id).then(function(data) {
		$scope.datass = data.data;
		$scope.datass.date_now = new Date();
		console.log($scope.datass)
		$scope.loading = false;
	}, function(x) {
		SweetAlert.swal("Terjadi Kesalahan!", "error")
	});

	$scope.file = [];
	$scope.src = base_url+'css/noimg.jpg';
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

	$scope.confrim = function (id) {
	$scope.update = {};
	if (!$scope.datass.bank_transfer) {
		$scope.notif.bank = false;
	}else if (!$scope.datass.date_now){
		$scope.notif.tanggal = false;
	}else if ($scope.file.length == 0){
		$scope.notif.img = false;
	}else{
		$scope.loading = true;
		$http({
			method  : 'POST',
			url     : base_url+'upload/transaksi',
			headers: { 'Content-Type': undefined},
			transformRequest: function (data) {
				var formData = new FormData();
				formData.append("file", $scope.file);
				return formData;
			}
		}).then(function(data) {
			if (data.data){
				$scope.update.image_transfer = data.data
			}
			$scope.update.tgl_konfirm = $scope.datass.date_now;
	        $scope.update.bank_transfer = $scope.datass.bank_transfer;
	        $scope.update.id_transaksi = id;
	        $http.put(base_url+'update_transaksi',$scope.update)
	        .then(function(response) {
            	$scope.loading = true;
            	$location.path("/order/"+$scope.update.id_transaksi);
			}, function(x) {
            	SweetAlert.swal("Terjadi Kesalahan!"," ", "error")        
			});
		}, function(x) {
			SweetAlert.swal("Terjadi Kesalahan!", "error")
		});
	}
	}

}]);



