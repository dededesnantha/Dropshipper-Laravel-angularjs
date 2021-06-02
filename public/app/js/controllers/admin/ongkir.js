'use strict';

app.controller('OngkirAll', ['$scope', '$http','$log','$uibModal','notify',
  function ($scope, $http, $log, $modal,notify) {

  	$scope.form={
    much : '10',    
    order : 'asc',
    search : '',
    field_search: 'judul'
    };

    $scope.init = function (paging = '') {
      if ( paging  == '') {
          $scope.currentPage = 1;
      }

      $scope.maxSize = 20;
    $http.post(baseurl+'admin/all_kurir?page='+$scope.currentPage,$scope.form,$scope.auth_config)
          .then(function(data) {
              $scope.list=data.data
              $scope.kurir=$scope.list.data
              $scope.totalItems = $scope.list.total;
          }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
          });

          $scope.itemsPerPage = $scope.form.much;
        };

    $scope.init();
    $scope.currentPage = 1;

    $scope.selectPage = function (pageNo) {
      $scope.currentPage = pageNo;
      $scope.init(pageNo);
    };
    $scope.pageChanged = function() {
      $scope.currentPage = $scope.currentPage;
      $scope.init($scope.currentPage);

    };
    $scope.search = function () {
      $scope.init($scope.currentPage, $scope.search_name);
    }


  	// Add Kurir
    $scope.add_kurir = function () {
      var modalInstance = $modal.open({
        templateUrl: 'partials/ongkir/modal_add_kurir.html',
        controller: 'AddKurir',
        resolve: {
          items: function () {
          }
        }
      });
      modalInstance.result.then(function () {
          $scope.init();
          }, function () {
          $scope.init();
      });
    };

    // update kurir
    $scope.ruabh_kurir = function (id) {
    	var modalInstance = $modal.open({
        templateUrl: 'partials/ongkir/modal_add_kurir.html',
        controller: 'UpdateKurir',
        resolve: {
          items: function () {
          	return id
          }
        }
      });
      modalInstance.result.then(function () {
          $scope.init();
          }, function () {
            $scope.init();
      });
    };

    // hapusongkir
    $scope.hapus = function(id_kurir) {
      $scope.datass = {}
      var modalInstance = $modal.open({
            templateUrl: 'partials/Hapusmodal.html',
            controller: 'Hapus',
            resolve: {
              items: function () {
                return id_kurir;
              }
            }
          });
          modalInstance.result.then(function () {
            $http.delete(baseurl+'admin/delete_kurir/'+id_kurir,$scope.auth_config)
            .then(function successCallback(response) {
              notify({ message:'Berhasil Menghapus Data', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });   
              $scope.init();
            }, function errorCallback(response) {   
              $scope.init();             
                notify({ message:'Data Error', 
                        position:'right',
                        duration:'10000',
                        classes: 'alert-danger'
                });       
            });   

          }, function () {
            
          });
    };

}]);

app.controller('AddKurir', ['$scope','$uibModalInstance','items','$http','$location','notify','$uibModal', function($scope, $modalInstance, items,$http,$location,notify,$modal) { 
    $scope.form ={};

    $scope.save = function () {
      $http.post(baseurl+'admin/add_kurir',$scope.form,$scope.auth_config)
          .then(function (response){
            notify({ message:'Berhasil Ditambah Kurir ', position:'right', duration:'10000', classes: 'alert-success' }); 
            $modalInstance.close($scope.items);
           },function (error){
            notify({ message:'Data Error',  position:'right', duration:'10000', classes: 'alert-danger' }); 
           });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);

app.controller('UpdateKurir', ['$scope','$uibModalInstance','items','$http','$location','notify','$uibModal', function($scope, $modalInstance, items,$http,$location,notify,$modal) { 

	$scope.form = {};
	$scope.reload_kabupaten = false;
	//get kurir
    $http.get(baseurl+'admin/get_kurir/'+items,$scope.auth_config).then(function(datas) {
            $scope.form = datas.data;
    }, function(x) {
    });

    $scope.save = function () {
      $http.post(baseurl+'admin/update_kurir/'+items,$scope.form,$scope.auth_config)
          .then(function (response){
            notify({ message:'Berhasil Dirubah Kurir ', position:'right', duration:'10000', classes: 'alert-success' }); 
           },function (error){
            notify({ message:'Data Error',  position:'right', duration:'10000', classes: 'alert-danger' }); 
           });
      $modalInstance.close($scope.items);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);


app.controller('AddOngkir', ['$scope', '$http','$log','$uibModal','notify','$timeout','$stateParams',
  function ($scope, $http, $log, $modal,notify,$timeout,$stateParams) {
  	$scope.prov = [];
  	$scope.kab = [];
    $scope.kac = [];
    $http.get(baseurl+'admin/get_kurir/'+$stateParams.id,$scope.auth_config).then(function(datas) {
              $scope.kurir = datas.data;
      }, function(x) {
    });

    $http.get(baseurl+'admin/get_provinsi',$scope.auth_config).then(function(datas) {
              $scope.prov = datas.data;
              $scope.$watch('prov', function(newValue, oldValue) {
            $('#countriesList_kab').trigger('chosen:updated');
              $timeout(function() {
              }, 0, false);
            }, true);

            $timeout(function() {
              $('#countriesList_kab').chosen();
            }, 0, false);

      }, function(x) {
    });

    $scope.get_provinsi = function(id_provinsi) {
        $http.get(baseurl+'admin/get_kabupaten_list/'+id_provinsi,$scope.auth_config).then(function(datas) {
            
            $scope.kab = datas.data;
            $scope.$watch('kab', function(newValue, oldValue) {
            $('#countriesList').trigger('chosen:updated');
              $timeout(function() {
              }, 0, false);
            }, true);

            $timeout(function() {
              $('#countriesList').chosen();
            }, 0, false);
      }, function(x) {

	    });
    };

    $scope.get_kecamatan = function(id_kabupaten) {
      $http.get(baseurl+'admin/get_kecamatan_list/'+id_kabupaten,$scope.auth_config).then(function(datas) {
            
            $scope.kac = datas.data;
            $scope.$watch('kac', function(newValue, oldValue) {
            $('#countriesList_kec').trigger('chosen:updated');
              $timeout(function() {
              }, 0, false);
            }, true);

            $timeout(function() {
              $('#countriesList_kec').chosen();
            }, 0, false);
      }, function(x) {
      });

      $scope.ongkir = [];
      $http.get(baseurl+'admin/get_kecamatan/'+$stateParams.id+'/'+id_kabupaten,$scope.auth_config).then(function(datas) {
        $scope.ongkir = datas.data
        console.log($scope.ongkir)
        $scope.$watch('ongkir', function(newValue, oldValue) {
              $timeout(function() {
              }, 0, false);
            }, true);

      }, function(x) {
      });
    };

    $scope.addongkir = function(id_kecamatan, id_kabupaten) {
      $scope.datass = {};
      $scope.datass.id_kurir = $stateParams.id;
      $scope.datass.id_kecamatan = id_kecamatan;
       var modalInstance = $modal.open({
        templateUrl: 'partials/ongkir/modal_add_ongkir.html',
        controller: 'AddongkirModal',
        resolve: {
          items: function () {
            return $scope.datass
          }
        }
      });
      modalInstance.result.then(function () {
          $scope.get_kecamatan(id_kabupaten);
          }, function () {
            $scope.get_kecamatan(id_kabupaten);
      });
    }
    
    $scope.saveOngkir = function(data, id_ongkir, id_kabupaten) {
      
      $http.post(baseurl+'admin/update_ongkir/'+id_ongkir,data,$scope.auth_config)
          .then(function(datass) {
            $scope.get_kecamatan(id_kabupaten);
            notify({ message:'Berhasil Dirubah', position:'right',duration:'10000',classes: 'alert-success'});
      }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
            $scope.get_kecamatan(id_kabupaten);
          });
      angular.extend(data, {id: id_ongkir});
    };
    
    $scope.removeOngkir = function(id_ongkir, id_kabupaten) {
      $scope.datass = {}
      var modalInstance = $modal.open({
            templateUrl: 'partials/Hapusmodal.html',
            controller: 'Hapus',
            resolve: {
              items: function () {
                return id_ongkir;
              }
            }
          });
          modalInstance.result.then(function () {
            $http.delete(baseurl+'admin/delete_ongkir/'+id_ongkir,$scope.auth_config)
            .then(function successCallback(response) {
              notify({ message:'Berhasil Menghapus Data', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });   
              $scope.get_kecamatan(id_kabupaten);
            }, function errorCallback(response) {   
              $scope.get_kecamatan(id_kabupaten);               
                notify({ message:'Data Error', 
                        position:'right',
                        duration:'10000',
                        classes: 'alert-danger'
                });       
            });   

          }, function () {
            
          });
    };
    
}]);

app.controller('AddongkirModal', ['$scope','$uibModalInstance','items','$http','$location','notify','$uibModal', function($scope, $modalInstance, items,$http,$location,notify,$modal) { 
    $scope.form ={};
    $scope.form.id_kecamatan = items.id_kecamatan;
    $scope.form.id_kurir = items.id_kurir;
    $scope.save = function () {
      $http.post(baseurl+'admin/add_ongkir',$scope.form,$scope.auth_config)
          .then(function (response){
            notify({ message:'Berhasil Ditambah Ongkir ', position:'right', duration:'10000', classes: 'alert-success' }); 
           },function (error){
            notify({ message:'Data Sudah Tersedia',  position:'right', duration:'10000', classes: 'alert-warning' }); 
           });
      $modalInstance.close($scope.form.id_kecamatan);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);

app.controller('Hapus', ['$scope', '$uibModalInstance', 'items', function($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);


