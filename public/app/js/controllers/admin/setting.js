'use strict';

app.controller('ListHome', ['$scope', '$http','$log','$uibModal','notify',
  function ($scope, $http, $log, $modal,notify) {
    $scope.load_sign();

    $scope.list_produksss = {};
    $scope.status = [];
    $scope.status.isFirstOpen = true;
    $scope.status.isFirstOpens = true;
    $scope.group = [];
    // get Produk
    $http.get(baseurl+'admin/get_produk',$scope.auth_config).then(function(data) {
            $scope.fitur = data.data
    }, function(x) {
    });

    $scope.init = function () {
      $http.get(baseurl+'admin/get_list_page/',$scope.auth_config).then(function(data) {
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

    $scope.klik_menu = function(key) {
        $http.post(baseurl+'admin/add_page',{judul : key},$scope.auth_config)
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

    $scope.klik_fitur = function (id) {
      $http.post(baseurl+'admin/add_fitur',{id_produk : id},$scope.auth_config)
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
    
    $scope.hapus = function (id) {
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
            $http.delete(baseurl+'admin/fitur_menu_delete/'+id,$scope.auth_config)
            .then(function successCallback(response) {
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
            });   

          }, function () {
            
          });
        };
    $scope.save_update_page = function (id) {
      $http.put(baseurl+'admin/update_packet_page/'+id,$scope.datass,$scope.auth_config).then(function(data) {
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
    
    
    $scope.page_hpus = function () {
      var modalInstance = $modal.open({
        templateUrl: 'partials/setting/modal_hapus_page.html',
        controller: 'Modaldelete',
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

  app.controller('Modaldelete', ['$scope','$uibModalInstance','items','$http','$location','notify','$uibModal', function($scope, $modalInstance, items,$http,$location,notify,$modal) { 
    $scope.items = items;
    $scope.form = {};

    $http.get(baseurl+'admin/get_list_page/',$scope.auth_config).then(function(data) {
                $scope.datass=data.data;
      }, function(x) {
            notify({ message:'Server Error', position:'right', duration:'10000', classes: 'alert-danger'});
      });

    $scope.hapus = function () {
      $http.post(baseurl+'admin/delete_home_setting/',$scope.form,$scope.auth_config)
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

app.controller('ProfileAdd', ['$scope', '$http','FileUploader','$state','$location','notify','$uibModal',
  function ($scope, $http,FileUploader,$state,$location,notify,$modal) {

    $scope.url_icon = baseurl+'icon/';

    $scope.form = {};

    $http.get(baseurl+'admin/get_profile',$scope.auth_config).then(function(data) {
              $scope.form=data.data;
              if ($scope.form.status_popup_pertanyaan === 1) {
                  $scope.form.status_popup_pertanyaan = true;
                  }else{
                    $scope.form.status_popup_pertanyaan = false;
                  }
              document.getElementById("deskripsi").innerHTML = $scope.form.deskripsi;
    }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
    });

    $scope.save = function() {
        $scope.form.deskripsi = document.getElementById('deskripsi').innerHTML
        $http.post(baseurl+'admin/profile_update/'+$scope.form.id,$scope.form,$scope.auth_config)
          .then(function(response) {
              notify({ message:'Berhasil Ditambah', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });
          }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
          });  
    }

    var uploader_logo = $scope.uploader_logo = new FileUploader({
        url: 'upload_profile.php'
    });
    $scope.url = baseurl+'image/'
    // FILTERS
    uploader_logo.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    // CALLBACKS
    uploader_logo.onCompleteItem = function(fileItem, response, status, headers) {
        if (response.error) {
          notify({ message:response.error, position:'right', duration:'10000',classes: 'alert-danger'});
        }else{
          notify({ message:'Gambar berhasil diupload', position:'right', duration:'10000',classes: 'alert-success'});
          $scope.form.logo = fileItem.file.name;
        }
    };


    var uploader_profile = $scope.uploader_profile = new FileUploader({
        url: 'upload_profile.php'
    });
    $scope.url = baseurl+'image/'
    // FILTERS
    uploader_profile.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    // CALLBACKS
    uploader_profile.onCompleteItem = function(fileItem, response, status, headers) {
        if (response.error) {
          notify({ message:response.error, position:'right', duration:'10000',classes: 'alert-danger'});
        }else{
         notify({ message:'Gambar berhasil diupload', position:'right', duration:'10000',classes: 'alert-success'});
          $scope.form.image_profile = fileItem.file.name;
        }
    };

    $scope.pop_up1 = function () {
      var modalInstance = $modal.open({
        templateUrl: 'partials/setting/modal_syrat.html',
        controller: 'Modalsyrat',
        resolve: {
          items: function () {
            return $scope.form.id;
          }
        }
      });
      modalInstance.result.then(function () {
          }, function () {
      });
    };

    $scope.pop_up2 = function () {
      var modalInstance = $modal.open({
        templateUrl: 'partials/setting/Kebijakan_Privasi.html',
        controller: 'Modalkebijakan',
        resolve: {
          items: function () {
            return $scope.form.id;
          }
        }
      });
      modalInstance.result.then(function () {
          }, function () {
      });
    };

    $scope.pop_up3 = function () {
      var modalInstance = $modal.open({
        templateUrl: 'partials/setting/Tentng_Kami.html',
        controller: 'Modalkami',
        resolve: {
          items: function () {
            return $scope.form.id;
          }
        }
      });
      modalInstance.result.then(function () {
          }, function () {
      });
    };

    

}]);

  app.controller('Modalsyrat', ['$scope','$uibModalInstance','items','$http','$location','notify','$uibModal', function($scope, $modalInstance, items,$http,$location,notify,$modal) { 
    $scope.items = items;
    $scope.form = {};

    $http.get(baseurl+'admin/profile_get_text/'+$scope.items,$scope.auth_config).then(function(data) {
                $scope.datass=data.data;
                document.getElementById("syarat_ketentuan").innerHTML = $scope.datass.syarat_ketentuan;
      }, function(x) {
            notify({ message:'Server Error', position:'right', duration:'10000', classes: 'alert-danger'});
      });

    $scope.save = function () {
    $scope.form.syarat_ketentuan = document.getElementById('syarat_ketentuan').innerHTML
      $http.post(baseurl+'admin/profile_update_text/'+$scope.items,$scope.form,$scope.auth_config)
            .then(function successCallback(response) {
              notify({ message:'Data Berhasil Diupdate', position:'right', duration:'10000', classes: 'alert-success' });  
            }, function errorCallback(response) {                    
                notify({ message:'Data Error',  position:'right', duration:'10000', classes: 'alert-danger' }); 
            });  
      $modalInstance.close($scope.items);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    
  }]);

    app.controller('Modalkebijakan', ['$scope','$uibModalInstance','items','$http','$location','notify','$uibModal', function($scope, $modalInstance, items,$http,$location,notify,$modal) { 
    $scope.items = items;
    $scope.form = {};

    $http.get(baseurl+'admin/profile_get_text/'+$scope.items,$scope.auth_config).then(function(data) {
                $scope.datass=data.data;
                document.getElementById("kebijakan_privasi").innerHTML = $scope.datass.kebijakan_privasi;
      }, function(x) {
            notify({ message:'Server Error', position:'right', duration:'10000', classes: 'alert-danger'});
      });

    $scope.save = function () {
    $scope.form.kebijakan_privasi = document.getElementById('kebijakan_privasi').innerHTML
      $http.post(baseurl+'admin/profile_update_text/'+$scope.items,$scope.form,$scope.auth_config)
            .then(function successCallback(response) {
              notify({ message:'Data Berhasil Diupdate', position:'right', duration:'10000', classes: 'alert-success' });  
            }, function errorCallback(response) {                    
                notify({ message:'Data Error',  position:'right', duration:'10000', classes: 'alert-danger' }); 
            });  
      $modalInstance.close($scope.items);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    
  }]);

      app.controller('Modalkami', ['$scope','$uibModalInstance','items','$http','$location','notify','$uibModal', function($scope, $modalInstance, items,$http,$location,notify,$modal) { 
    $scope.items = items;
    $scope.form = {};

    $http.get(baseurl+'admin/profile_get_text/'+$scope.items,$scope.auth_config).then(function(data) {
                $scope.datass=data.data;
                document.getElementById("tentang_kami").innerHTML = $scope.datass.tentang_kami;
      }, function(x) {
            notify({ message:'Server Error', position:'right', duration:'10000', classes: 'alert-danger'});
      });

    $scope.save = function () {
    $scope.form.tentang_kami = document.getElementById('tentang_kami').innerHTML
      $http.post(baseurl+'admin/profile_update_text/'+$scope.items,$scope.form,$scope.auth_config)
            .then(function successCallback(response) {
              notify({ message:'Data Berhasil Diupdate', position:'right', duration:'10000', classes: 'alert-success' });  
            }, function errorCallback(response) {                    
                notify({ message:'Data Error',  position:'right', duration:'10000', classes: 'alert-danger' }); 
            });  
      $modalInstance.close($scope.items);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    
  }]);