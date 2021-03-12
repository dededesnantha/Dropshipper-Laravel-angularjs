'use strict';

// app.controller('MenuController', ['$scope', '$http',
//   function ($scope, $http) {

app.controller('MenuController', ['$scope','$http','notify','$uibModal','$state','$timeout','$log', function($scope,$http,notify,$modal,$state,$timeout,$log) {

  $scope.load_sign();

  $scope.group = {};
  $scope.custom = {};
  $scope.home = [];
  $scope.fitur = [];
  $scope.daftar = [];
  $scope.testimoni = [];
  $scope.bantuan = [];
  $scope.lainnya = [];
  $scope.status = {};

  $scope.home.judul = 'Home';
  $scope.home.link = '#';
  $scope.home.status_sub = 0;

  $scope.fitur.judul = 'Fitur Menu';
  $scope.fitur.link = '#';
  $scope.fitur.status_sub = 1;

  $scope.daftar.judul = 'Daftar Harga';
  $scope.daftar.link = '#';
  $scope.daftar.status_sub = 1;

  $scope.testimoni.judul = 'Testimoni';
  $scope.testimoni.link = 'testimoni';
  $scope.testimoni.status_sub = 0;

  $scope.bantuan.judul = 'Bantuan';
  $scope.bantuan.link = '#';
  $scope.bantuan.status_sub = 1;

  $scope.lainnya.judul = 'Lainnya';
  $scope.lainnya.link = '#';
  $scope.lainnya.status_sub = 1;

  $scope.status.isFirstOpen = true;

  $scope.init = function () {
      $http.get(baseurl+'admin/get_list_menu/',$scope.auth_config).then(function(data) {
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


  $scope.klik_home = function() {
        $http.post(baseurl+'admin/add_menu',{judul : $scope.home.judul,link : $scope.home.link, status_sub : $scope.home.status_sub},$scope.auth_config)
          .then(function(response) {
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

    $scope.klik_fitur = function() {
        $http.post(baseurl+'admin/add_menu',{judul : $scope.fitur.judul,link : $scope.fitur.link, status_sub : $scope.fitur.status_sub},$scope.auth_config)
          .then(function(response) {
              notify({ message:'Berhasil Ditambah', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });
            $scope.init();
          }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
          });  
    }
    $scope.klik_daftar = function() {
        $http.post(baseurl+'admin/add_menu',{judul : $scope.daftar.judul,link : $scope.daftar.link, status_sub : $scope.daftar.status_sub},$scope.auth_config)
          .then(function(response) {
              notify({ message:'Berhasil Ditambah', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });
            $scope.init();
          }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
          });  
    }
    $scope.klik_testi = function() {
        $http.post(baseurl+'admin/add_menu',{judul : $scope.testimoni.judul,link : $scope.testimoni.link, status_sub : $scope.testimoni.status_sub},$scope.auth_config)
          .then(function(response) {
              notify({ message:'Berhasil Ditambah', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });
              $scope.init();
          }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
          });  
    }

    $scope.klik_bantu = function() {
        $http.post(baseurl+'admin/add_menu',{judul : $scope.bantuan.judul,link : $scope.bantuan.link, status_sub : $scope.bantuan.status_sub},$scope.auth_config)
          .then(function(response) {
              notify({ message:'Berhasil Ditambah', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });
              $scope.init();
          }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
          });  
    }
    $scope.klik_lainnya = function() {
        $http.post(baseurl+'admin/add_menu',{judul : $scope.lainnya.judul,link : $scope.lainnya.link, status_sub : $scope.lainnya.status_sub},$scope.auth_config)
          .then(function(response) {
              notify({ message:'Berhasil Ditambah', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });
            $scope.init();
          }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
          });  
    }
    $scope.save_custom_menu = function() {
        $http.post(baseurl+'admin/add_menu_custom',$scope.custom,$scope.auth_config)
          .then(function(response) {
              notify({ message:'Berhasil Ditambah', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });
            $scope.init();
          }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
          });  
    }
    

    $scope.save_edit_sub = function (id) {
      var modalInstance = $modal.open({
        templateUrl: 'partials/menu/modal_edit_packet.html',
        controller: 'ModaleditSub',
        resolve: {
          items: function () {
            return id;
          }
        }
      });
      modalInstance.result.then(function () {
            $scope.init();
          }, function () {

      });
    };

    $scope.save_update_menu = function(id) {
        $http.post(baseurl+'admin/update_menu_custom/'+id,$scope.datass,$scope.auth_config)
          .then(function(response) {
              notify({ message:'Berhasil Ditambah', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });
               $scope.init();
          }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
          });  
    }

    $scope.moveUP = function (id) {
      $http.get(baseurl+'admin/move_up_menu/'+id,$scope.auth_config)
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
      $http.get(baseurl+'admin/move_down_menu/'+id,$scope.auth_config)
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

    $scope.hapus_menu = function () {
      var modalInstance = $modal.open({
        templateUrl: 'partials/menu/modal_hapus.html',
        controller: 'ModalHapus',
        resolve: {
          items: function () {
            return $scope.datass;
          }
        }
      });
      modalInstance.result.then(function () {
            $scope.init();
          }, function () {

      });
    };
    
    
  }]);

  app.controller('ModaleditSub', ['$scope','$uibModalInstance','items','$http','$location','notify','$uibModal', function($scope, $modalInstance, items,$http,$location,notify,$modal) { 
    $scope.items = items;
    $scope.form = {};

    $http.get(baseurl+'admin/get_sub/'+$scope.items,$scope.auth_config).then(function(data) {
                $scope.form=data.data;
                console.log($scope.form)
                if ($scope.form.status === 1) {
                  $scope.form.status = true;
                  }else{
                    $scope.form.status = false;
                  }

      }, function(x) {
            notify({ message:'Server Error', position:'right', duration:'10000', classes: 'alert-danger'});
      });

    $scope.ok = function () {
      $http.post(baseurl+'admin/update_sub/'+$scope.items,$scope.form,$scope.auth_config)
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

app.controller('ModalHapus', ['$scope','$uibModalInstance','items','$http','$location','notify','$uibModal', function($scope, $modalInstance, items,$http,$location,notify,$modal) { 
    $scope.items = items;
    $scope.form = {};

    $scope.hapus = function () {
      $http.post(baseurl+'admin/hapus_menu/',$scope.form,$scope.auth_config)
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


