'use strict';

myApp.controller('login', ['$scope', '$http','SweetAlert', function($scope, $http, SweetAlert){
	$scope.load_sign();
	$scope.form = {};
	$scope.load = true;
	$scope.text = false;
	$scope.save = function () {
		$scope.load = false;
		$scope.text = true;
		$http.post(base_url+'api/login_user', {username: $scope.form.username, password: $scope.form.password})
      	.then(function(response) {
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
		        $scope.load = true;
				$scope.text = false;
		    }, 3000);
      }, function(x) {
      		SweetAlert.swal("Login Gagal!", "Username dan Password Salah", "error")
      });

	}
}]);

myApp.controller('HomeController', ['$scope', '$http','SweetAlert','$location','$route','$uibModal','$rootScope',
	function($scope, $http, SweetAlert, $location, $route, $uibModal, $rootScope){
	$scope.load_sign();
	
	// cek redirct email 
	$http.get(base_url+'to_email').then(function(data) {
		if (data.data.id) {
              $scope.id_email = data.data.id;
              $location.path("/order/"+$scope.id_email);
        }
	}, function(x) {
	     
	});
	// suceess pembayaran 
	$http.get(base_url+'to_update_transaksi').then(function(data) {
		if (data.data.id) {
              $location.path("/success/"+data.data.id);
		}
	}, function(x) {
	     
	});
	// get slider
	$scope.slider = [];
	$http.get(base_url+'get_slider').then(function(data) {
              $scope.slider = data.data;
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

	$scope.notifikasi = function() {
		$scope.notifikasi = {};
		messaging
            .requestPermission()
            .then(function () {
                return messaging.getToken()
            })
            .then(function (tokens) {
            	$rootScope.token_firabase = tokens
            	$scope.notifikasi.tokens = $rootScope.token_firabase
            	$scope.notifikasi.id_user = $scope.user.id_user;
            	$http.put(base_url+'update_token_firabase',$scope.notifikasi)
            	.then(function(response) {
            		SweetAlert.swal({
            			title: 'Notifikasi Aktif',
            			text: 'Anda Akan Mendapatkan Notifikasi Dari Kami',
            			timer: 3000,
            			buttons: false,
            			type: "success",
            			showCancelButton: false,
            			showConfirmButton: false,
            		})
            		$('#close_notifikasi').addClass('toast');
            	}, function(x) {
            		SweetAlert.swal("Terjadi Kesalahan!", "Mohon Untuk Mengulangi Pesanan Anda", "error")
            	});
            })
	}
	$scope.abaikan = function() {
		$('#close_notifikasi').addClass('toast');
	}
	
}]);

myApp.controller('ModalContentCtrl', ['$scope', '$uibModalInstance', 'items', '$http','SweetAlert','$location','$route','$cookies',
	function($scope, $uibModalInstance, items, $http,SweetAlert,$location,$route,$cookies) {
	$scope.datass = {};
	$scope.produks = {};
	$scope.carts = {};

	$scope.notif = {};
	$scope.notif.color = true;
	$scope.notif.size = true;

	$http.get(base_url+'card_produk/'+items).then(function(data) {
              $scope.produks = data.data;
              $scope.produks.gambar = base_url+'image/'+$scope.produks.gambar;
	   }, function(x) {
	        SweetAlert.swal("Terjadi Kesalahan!", "error")
	    });

  $scope.addchart = function(){
  	if ($scope.produks.warna.length === 0 && $scope.produks.size.length === 0) {
  		$scope.datass.colors = '';
  		$scope.datass.size = '';
  		$scope.post($scope.datass, items);
  	}else if($scope.produks.warna.length > 0 && $scope.produks.size.length === 0) {
  		if (!$scope.datass.colors) {
  			$scope.notif.color = false;
  		}else{
  			$scope.datass.size = '';
  			$scope.post($scope.datass, items)
  		}
  	}else if($scope.produks.warna.length === 0 && $scope.produks.size.length > 0){
  		if (!$scope.datass.size) {
  			$scope.notif.size = false;
  		}else{
  			$scope.datass.colors = '';
  			$scope.post($scope.datass, items)
  		}
  	}else{
  		if (!$scope.datass.size && !$scope.datass.colors) {
			$scope.notif.size = false;
			$scope.notif.color = false;
  		}else if (!$scope.datass.colors) {
  			$scope.notif.color = false;
  		}else if (!$scope.datass.size) {
  			$scope.notif.size = false;
  		}else {
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

	$scope.update_totals = function(item){
			if (item !== 0) {
				if ( item >= $scope.produks.stok) {
					$scope.datass.qty = $scope.produks.stok;
					
				}else{
					$scope.datass.qty = item;
				}
			}else{
				$scope.datass.qty = 1;
			}
	}

  $scope.post = function($datass, $id){
  	if ($datass.qty == null) {
  		$datass.qty = 1
  	}
  	$datass.id_produk = $id;
  	$datass.id_user = $scope.user.id_user;
  	
  	
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
	              $scope.loading = false;
	              if ($scope.user_datass.foto_user == null || $scope.user_datass.foto_user == '') {
	              	$scope.src = base_url+'css/noimg.png';
	              }else{
	              	$scope.src = base_url+'image/'+$scope.user_datass.foto_user;
	              }
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

myApp.controller('SingleProdukController', ['$scope', '$http','SweetAlert','$location','$routeParams', function($scope, $http, SweetAlert, $location, $routeParams){
	$scope.url = "Produk Detail";
	$scope.load_sign();
	$scope.ongkir = {};
	$scope.datass = {};
	$scope.datass.qty = 1;
	$scope.list_kurirs = false;
	$scope.notif = {};
	$scope.notif.color = true;
	$scope.notif.size = true

	$(document).ready(function() {
		$('#js-example-basic-single-alamat').select2({
			placeholder: "Pilih Kota atau Kecamatan",
			allowClear: false
		});
	});

	$('#js-example-basic-single-alamat').change(function(){
    var value = $(this).val();
    $scope.get_kurir(value);
  });

	$http.get(base_url+'ongkos_kirim/all').then(function(data) {
		$scope.ongkos_kirim = data.data;
	}, function(x) {
		SweetAlert.swal("Terjadi Kesalahan!","","error")
	});
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

	$scope.get_kurir = function(id) {
		$http.post(base_url+'ongkos_kirim/kurir/'+id).then(function(data) {
			$scope.kurir = data.data;
			$scope.getTotal()
			angular.forEach($scope.kurir, function (values, key) {
				values['totals'] = values['harga'] + $scope.produks.totals;
            });
			$scope.list_kurirs = true;
		}, function(x) {
			SweetAlert.swal("Terjadi Kesalahan!","","error")
		});
	}

	$scope.qty_tambah = function(item){
  		if ( item >= $scope.produks.stok) {
  			SweetAlert.swal("Barang Hanya Tersedia "+$scope.produks.stok,"", "warning")
  		}else{
			$scope.datass.qty = item + 1;
			$scope.getTotal()
			angular.forEach($scope.kurir, function (values, key) {
				values['totals'] = values['harga'] + $scope.produks.totals;
            });
  		}
	}
	$scope.qty_kurang = function(item){
	    if($scope.datass.qty > 1){
	       $scope.datass.qty = item - 1;
	       $scope.getTotal()
			angular.forEach($scope.kurir, function (values, key) {
				values['totals'] = values['harga'] + $scope.produks.totals;
            });
	    }
	}

	$scope.update_totals = function(item){
			if (item !== 0) {
				if ( item >= $scope.produks.stok) {
					$scope.datass.qty = $scope.produks.stok;
					$scope.getTotal();
					angular.forEach($scope.kurir, function (values, key) {
						values['totals'] = values['harga'] + $scope.produks.totals;
					});
				}else{
					$scope.getTotal();
					angular.forEach($scope.kurir, function (values, key) {
						values['totals'] = values['harga'] + $scope.produks.totals;
					});
				}
			}else{
				$scope.datass.qty = 1;
				$scope.getTotal();
				angular.forEach($scope.kurir, function (values, key) {
					values['totals'] = values['harga'] + $scope.produks.totals;
				});
			}
	}
	$scope.getTotal = function(){
	    $scope.produks.totals = 0;
	    if ($scope.produks.harga_promo) {
	    	$scope.produks.totals += $scope.produks.harga_promo * $scope.datass.qty;
	    }else{
	    	$scope.produks.totals += $scope.produks.harga * $scope.datass.qty;
	    }
	}

	$scope.addchart = function(){
	if ($scope.produks.warna.length === 0 && $scope.produks.size.length === 0) {
  		$scope.datass.colors = '';
  		$scope.datass.size = '';
  		$scope.post($scope.datass, $scope.produks.id);
	}
  	else if ($scope.produks.warna.length > 0 && $scope.produks.size.length === 0) {
  		if (!$scope.datass.colors) {
  			$scope.notif.color = false
  		}else{
  			$scope.datass.size = '';
  			$scope.post($scope.datass, $scope.produks.id)
  		}
  	}else if($scope.produks.warna.length === 0 && $scope.produks.size.length > 0){
  		if (!$scope.datass.size) {
  			$scope.notif.size = false
  		}else{
  			$scope.datass.colors = '';
  			$scope.post($scope.datass, $scope.produks.id)
  		}
  	}else{
  		if (!$scope.datass.size && !$scope.datass.colors) { 
  			$scope.notif.size = false;
  			$scope.notif.color = false;
  		}else if (!$scope.datass.colors) {
  			$scope.notif.color = false;
  		}else if (!$scope.datass.size) {
  			$scope.notif.size = false;
  		}else{
  			$scope.post($scope.datass, $scope.produks.id)
  		}
  	}
  }
$scope.post = function($datass, $id){
	if ($datass.qty == null) {
  		$datass.qty = 1
  	}
  	$datass.id_produk = $id;
  	$datass.id_user = $scope.user.id_user;
  	
  	
  	$http.post(base_url+'add_cart',$datass)
      	.then(function(response) {
      		$scope.count_cart();
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
	$scope.notifikasi = {};
	
	$scope.notifikas_get = function(){
		$scope.load_sign();
		if ($scope.user.token_firabase === undefined) {
	          $scope.notifikasi.status = false; 
	        }else{$scope.notifikasi.status = true ;}
	}

	$scope.notifikas_get();

	$scope.notifikas = function(index){
		$scope.notifikasi = {};
		$scope.notifikasi.id_user = $scope.user.id_user;
		if (index == false) {
			$scope.notifikasi.status = false;
			messaging
            .requestPermission()
            .then(function () {
                return messaging.deleteToken()
            })
            $scope.notifikasi.tokens = '';
            $scope.notifikas_send($scope.notifikasi)
		}else{
			$scope.notifikasi.status = true;
			messaging
            .requestPermission()
            .then(function () {
                return messaging.getToken()
            })
            .then(function (tokens) {
				$scope.notifikasi.tokens = tokens
				$scope.notifikas_send($scope.notifikasi)
            })
		}
	}
	$scope.notifikas_send = function(index){
		$http.put(base_url+'update_token_firabase',index)
		.then(function(response) {
			SweetAlert.swal({
				title: 'Notifikasi Berhasil Di Update',
				text: 'Pembaharuan Notifikasi Berhasil',
				timer: 3000,
				buttons: false,
				type: "success",
				showCancelButton: false,
				showConfirmButton: false,
			})
		}, function(x) {
			$scope.load_sign();
			SweetAlert.swal("Terjadi Kesalahan!", "Mohon Untuk Mengulangi Pesanan Anda", "error")
		});
	}
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
	              if ($scope.produks.length > 0) {
					$scope.getTotal();
	              }
	              $scope.loading = false;
		}, function(x) {
		     SweetAlert.swal("Terjadi Kesalahan!","","error")
		});
	}
	$scope.datass();
	$scope.qty_tambah = function(item, id){
		angular.forEach($scope.produks, function (values, key) {
    		if (values.id === id) {
	       		if ( item >= values.stok) {
		  			values['notif'] = false;
		  		}else{
					values['qty'] = item + 1;
		  		}
	       	}
	    });
	    $scope.getTotal();
	}
	$scope.qty_kurang = function(item, id){
		$scope.notif = true;
		angular.forEach($scope.produks, function (values, key) {
	       	if (values.id === id) {
			    if(item > 1){
			       values['qty'] = item - 1;
			       values['notif'] = true;
			    }
	       	}
		});
		$scope.getTotal();
	}
	$scope.update_totals = function(item, id){
			if (item !== 0) {
				angular.forEach($scope.produks, function (values, key) {
			       	if (values.id === id) {
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
	    }, function () { 
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
		$scope.load_sign();
		$http.post(base_url+'transaction/'+data).then(function(data) {
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
            	$scope.load_sign();
			}, function(x) {
            	SweetAlert.swal("Terjadi Kesalahan!"," ", "error")        
			});
		}, function(x) {
			SweetAlert.swal("Terjadi Kesalahan!", "error")
		});
	}
	}

}]);

myApp.controller('TrackController', ['$scope', '$http','SweetAlert','$location', '$routeParams','$uibModal', function($scope, $http, SweetAlert, $location, $routeParams, $uibModal){
	$scope.load_sign();
	$scope.url = "Tracking";
	$scope.datass = {};
	$scope.url_img = base_url +'image/';
	$scope.id_user = $scope.user.id_user;
	$http.get(base_url+'detail/list/tracking/'+$scope.id_user).then(function(data) {
		$scope.datass = data.data;
		$scope.loading = false;
	}, function(x) {
		SweetAlert.swal("Terjadi Kesalahan!", "error")
	});

	$scope.tracking = function (id) {
		$location.path("/tracking/"+id);
	}
}]);

myApp.controller('TrackTransaksiController', ['$scope', '$http','SweetAlert','$location', '$routeParams','$uibModal', function($scope, $http, SweetAlert, $location, $routeParams, $uibModal){
	$scope.load_sign();
	$scope.url = "Tracking Transaksi";
	$http.get(base_url+'detail/list/tracking/transaksi/'+$routeParams.id).then(function(data) {
		$scope.datass = data.data;
		$scope.loading = false;
	}, function(x) {
		SweetAlert.swal("Terjadi Kesalahan!", "error")
	});
}]);

myApp.controller('SearchController', ['$scope', '$http','SweetAlert','$location', '$routeParams','$uibModal', function($scope, $http, SweetAlert, $location, $routeParams, $uibModal){
	
	$scope.search = function () {
		$location.path("/home/search/"+$scope.search.product);
	}

}]);

myApp.controller('ListSearchController', ['$scope', '$http','SweetAlert','$location', '$routeParams','$uibModal', function($scope, $http, SweetAlert, $location, $routeParams, $uibModal){
	$scope.load_sign();
	$scope.search = {};
	$scope.search.product = $routeParams.search
	$scope.filteredCustomers = [];
	$scope.currentPage = 1;
	$scope.numPerPage = 16;
	$scope.maxSize = 10;

	
	$http.get(base_url+'search/'+$routeParams.search).then(function(data) {
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
		$scope.loading = false;
	}, function(x) {
		SweetAlert.swal("Terjadi Kesalahan!", "error")
	});

}]);


myApp.controller('RessetController', ['$scope', '$http','SweetAlert','$location', '$routeParams','$uibModal','$timeout', function($scope, $http, SweetAlert, $location, $routeParams, $uibModal, $timeout){
	$scope.load_sign();
	$timeout(function() {
		$scope.loading = false;
	},2000);
	$scope.datas = {};
	$scope.notif = {};
	$scope.notif.email = true;
	$scope.load = true;
	$scope.text = false;

	$scope.send_email = function () {
		$scope.load = false;
		$scope.text = true;
		if (!$scope.datas.email) {
			$scope.notif.email = false;
			$scope.load = true;
			$scope.text = false;
		}else{
			$http.post(base_url+'change_email',$scope.datas).then(function(data) {
				$scope.kurir = data.data.kurir;
				$scope.load = true;
				$scope.text = false;
				SweetAlert.swal({
				  title: 'Kode OTP sudah Terkirim',
				  text: 'Silahkan Cek Email Untuk Mendapatkan Kode OTP',
				  timer: 3000,
				  buttons: false,
				  type: "success",
				  showCancelButton: false,
				  showConfirmButton: false,
				});
				$timeout(function() {
				  $location.path('/otp');
				},3000);
			}, function(x) {
				$scope.load = true;
				$scope.text = false;
				SweetAlert.swal({
					  title: 'Email Tidak Terdaftar',
					  text: 'Email Yang Dimasukan Tidak Terdaftar',
					  timer: 3000,
					  buttons: false,
					  type: "error",
					  showCancelButton: false,
					  showConfirmButton: false,
					});
			});
		}
	}
}]);

myApp.controller('OTPController', ['$scope', '$http','SweetAlert','$location', '$routeParams','$uibModal','$timeout', function($scope, $http, SweetAlert, $location, $routeParams, $uibModal, $timeout){
	$timeout(function() {
		$scope.loading = false;
	},2000);

	$scope.token = [];
	$scope.notif = {};
	$scope.notif.otp = true;
	$scope.load = true;
	$scope.text = false;
	$scope.submit_token = false;

    var count = 60;
    var counter = setInterval(timer, 1000);
    function timer() {
        count = count - 1;
        if (count <= 0) {
            clearInterval(counter);
            document.getElementById("resendOTP").innerHTML = '<a class="resendOTP" href="#!rubah/password">Kirim Ulang OTP</a>';
        } else {
            document.getElementById("resendOTP").innerHTML = 'tunggu ' + count + ' detik';
        }
    }

    $scope.cek_otp = function () {
    	$http.post(base_url+'cek_otp').then(function(data) {
			$scope.submit_token = false;
		}, function(x) {
			$location.path('/rubah/password');
		});
    }

     $scope.cek_otp();

    $scope.verifi_token = function () {
    	$scope.load = false;
		$scope.text = true;
    	if ($scope.token.length !== 4) {
    		$scope.notif.otp = false;
    	}else{
    		$http.post(base_url+'send_otp/'+$scope.user.id_user,$scope.token).then(function(data) {
    			$scope.kurir = data.data.kurir;
    			$scope.load = true;
    			$scope.text = false;
    			SweetAlert.swal({
    				title: 'Kode OTP Berhasil',
    				text: 'Anda akan dialihkan untuk merubah password',
    				timer: 3000,
    				buttons: false,
    				type: "success",
    				showCancelButton: false,
    				showConfirmButton: false,
    			});
    			$timeout(function() {
    				$location.path('/password_rubah');
    			},3000);
    		}, function(x) {
    			$scope.load = true;
    			$scope.text = false;
    			SweetAlert.swal({
    				title: 'Kode OTP Salah',
    				text: 'Kode OTP anda masukan salah',
    				timer: 3000,
    				buttons: false,
    				type: "error",
    				showCancelButton: false,
    				showConfirmButton: false,
    			});
    		});
    	}
    }
}]);

myApp.controller('RubahPasswordController', ['$scope', '$http','SweetAlert','$location', '$routeParams','$uibModal','$timeout', function($scope, $http, SweetAlert, $location, $routeParams, $uibModal, $timeout){
	$timeout(function() {
		$scope.loading = false;
	},2000);

	$scope.load_sign();
	$scope.url = "Rubah Password";
	$scope.submit_token = false;
	$scope.datass = {};
	$scope.load = true;
	$scope.text = false;

	$scope.cek_status = function () {
    	$http.post(base_url+'cek_status').then(function(data) {
			
		}, function(x) {
			$location.path('/rubah/password');
		});
    }
    $scope.cek_status();
	$scope.save_rubah = function () {
    	if ($scope.datass.new_password !== $scope.datass.repeat_password) {
    		SweetAlert.swal({
    			title: 'Password Tidak Sama',
    			text: 'Password yang anda masukan tidak sama',
    			timer: 3000,
    			buttons: false,
    			type: "error",
    			showCancelButton: false,
    			showConfirmButton: false,
    		});
    	}else{
    		$http.post(base_url+'send_rubah_password/'+$scope.user.id_user,$scope.datass).then(function(data) {
    			$scope.kurir = data.data.kurir;
    			$scope.load = true;
    			$scope.text = false;
    			SweetAlert.swal({
    				title: 'Update Password Berhasil',
    				text: 'Login Kembali Dengan Password Baru',
    				timer: 3000,
    				buttons: false,
    				type: "success",
    				showCancelButton: false,
    				showConfirmButton: false,
    			});
    			$timeout(function() {
    				$scope.logout();
    			},3000);
    		}, function(x) {
    			$scope.load = true;
    			$scope.text = false;
    			SweetAlert.swal({
    				title: 'Update Password Gagal',
    				text: 'Update Password terjadi kesalahan',
    				timer: 3000,
    				buttons: false,
    				type: "error",
    				showCancelButton: false,
    				showConfirmButton: false,
    			});
    		});
    	}
    }
}]);

myApp.controller('SuceessController', ['$scope', '$http','SweetAlert','$location', '$routeParams','$uibModal','$timeout', function($scope, $http, SweetAlert, $location, $routeParams, $uibModal, $timeout){
	$scope.load_sign();
}]);
