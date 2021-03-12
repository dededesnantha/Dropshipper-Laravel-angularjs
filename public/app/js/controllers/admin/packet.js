'use strict';

app.controller('ListPacket', ['$scope', '$http','$log','$uibModal','notify',
  function ($scope, $http, $log, $modal,notify) {
    $scope.load_sign();

    $scope.list_produksss = {};

    //kategori packet
    $scope.init = function () {
      $http.get(baseurl+'admin/get_list_packet/',$scope.auth_config).then(function(data) {
                $scope.datass=data.data;
      }, function(x) {
                notify({ message:'Server Error', 
                        position:'right',
                        duration:'10000',
                        classes: 'alert-danger'
                      });
      });
    }
    $scope.init();

    //packet packet
    $scope.list_produk = function () {
      $http.get(baseurl+'admin/get_list_packet_produk/',$scope.auth_config).then(function(data) {
                $scope.datass_produk=data.data;
                $scope.init();
      }, function(x) {
                notify({ message:'Server Error', 
                        position:'right',
                        duration:'10000',
                        classes: 'alert-danger'
                      });
      });
    }
    $scope.list_produk();   

    $scope.form = {};
    $scope.save_packet = function () {
      
      $scope.form.list_produksss = $scope.list_produksss;
      $http.post(baseurl+'admin/add_list_packet_produk/',$scope.form,$scope.auth_config).then(function(data) {
                notify({ message:'Berhasil Ditambah', position:'right', duration:'10000', classes: 'alert-success' });
                $scope.init();
      }, function(x) {
                notify({ message:'Server Error', 
                        position:'right',
                        duration:'10000',
                        classes: 'alert-danger'
                      });
      });
    }
     

  	$scope.open = function () {
      var modalInstance = $modal.open({
        templateUrl: 'partials/modal/modal_add.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
      modalInstance.result.then(function () {
            $scope.init();
          }, function () {
            $scope.init();
      });
    };

    $scope.removeRow = function (id) {
      
      var modalInstance = $modal.open({
            templateUrl: 'partials/Hapusmodal.html',
            controller: 'Hapus',
            resolve: {
              items: function () {
                return $scope.items;
              }
            }
          });

          modalInstance.result.then(function () {
            $http.delete(baseurl+'admin/list_packet_produk/'+id,$scope.auth_config)
            .then(function successCallback(response) {
              $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
              $scope.init();
              notify({ message:'Berhasil Menghapus Data', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });  
              $scope.init();
            }, function errorCallback(response) {   
              $scope.init();
            $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');                 
                notify({ message:'Data Error', 
                        position:'right',
                        duration:'10000',
                        classes: 'alert-danger'
                }); 
              $scope.init();     
            });   

          }, function () {
            
          });
        };

    $scope.moveUP = function (id) {
      $http.get(baseurl+'admin/move_up_list/'+id,$scope.auth_config)
      .then(function successCallback(response) {
              $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
              $scope.init();
              notify({ message:'Berhasil Merubah Data', position:'right',duration:'10000',classes: 'alert-success'});  
            }, function errorCallback(response) {   
              $scope.init();
            $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');                 
                notify({ message:'Data Error', position:'right', duration:'10000', classes: 'alert-danger'
                });   
            }); 
    }

    $scope.moveDown = function (id) {
      $http.get(baseurl+'admin/move_down_list/'+id,$scope.auth_config)
      .then(function successCallback(response) {
              $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
              $scope.init();
              notify({ message:'Berhasil Merubah Data', position:'right',duration:'10000',classes: 'alert-success'});  
            }, function errorCallback(response) {   
              $scope.init();
            $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');                 
                notify({ message:'Data Error', position:'right', duration:'10000', classes: 'alert-danger'
                });   
            }); 
    }

    $scope.save_update_packet = function (id) {
      $http.post(baseurl+'admin/update_packet_list/'+id,$scope.datass,$scope.auth_config).then(function(data) {
                notify({ message:'Berhasil Ditambah', position:'right', duration:'10000', classes: 'alert-success' });
                $scope.init();
      }, function(x) {
                notify({ message:'Server Error', 
                        position:'right',
                        duration:'10000',
                        classes: 'alert-danger'
                      });
      });
    }

    $scope.kategori_packet_hpus = function () {
      var modalInstance = $modal.open({
        templateUrl: 'partials/modal/modal_hapus_packet.html',
        controller: 'ModaldeleteKactegori',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
      modalInstance.result.then(function () {
            $scope.init();
          }, function () {
            $scope.init();
      });
    };

  }]);


app.controller('ModalInstanceCtrl', ['$scope','$uibModalInstance','items','$http','$location','notify', function($scope, $modalInstance, items,$http,$location,notify) {
    $scope.items = items;
    $scope.form = {};

    $scope.ok = function () {
      $http.post(baseurl+'admin/add_list_packet',$scope.form,$scope.auth_config)
          .then(function(response) {
              $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
              notify({ message:'Berhasil Ditambah', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });
            $location.path('/app/packet/list');
            $modalInstance.dismiss('cancel');
          }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
          });
    };
    $modalInstance.close($scope.form);
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
  
  app.controller('ModaldeleteKactegori', ['$scope','$uibModalInstance','items','$http','$location','notify','$uibModal', function($scope, $modalInstance, items,$http,$location,notify,$modal) { 
    $scope.items = items;
    $scope.form = {};

    $http.get(baseurl+'admin/get_list_packet/',$scope.auth_config).then(function(data) {
                $scope.datass=data.data;
      }, function(x) {
            notify({ message:'Server Error', position:'right', duration:'10000', classes: 'alert-danger'});
      });

    $scope.hapus_kategori = function () {
      $http.post(baseurl+'admin/delete_packet_list/',$scope.form,$scope.auth_config)
            .then(function successCallback(response) {
              notify({ message:'Berhasil Menghapus Data', position:'right', duration:'10000', classes: 'alert-success' });  
            }, function errorCallback(response) {                    
                notify({ message:'Data Error',  position:'right', duration:'10000', classes: 'alert-danger' }); 
            });  
      $modalInstance.close($scope.items);
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