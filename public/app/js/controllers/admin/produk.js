'use strict';

app.controller('ProdukAll', ['$scope', '$http','$log','$uibModal','notify',
  function ($scope, $http, $log, $modal,notify) {
    $scope.load_sign();
    $scope.url_image = baseurl+'image/';

    $scope.form = {};

    $scope.form={
    much : '10',    
    order : 'desc',
    search : '',
    field_search: 'tb_produk.nama_produk'
    };

    $scope.init = function (paging = '') {
      if ( paging  == '') {
          $scope.currentPage = 1;
      }

      $scope.maxSize = 20;
    $http.post(baseurl+'admin/all_produk?page='+$scope.currentPage,$scope.form,$scope.auth_config)
          .then(function(data) {
              $scope.list=data.data
              $scope.datass=$scope.list.data
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
            $http.delete(baseurl+'admin/produk_delete/'+id,$scope.auth_config)
            .then(function successCallback(response) {
              $scope.init();
              notify({ message:'Berhasil Menghapus Data', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });   
              $scope.init();  
            }, function errorCallback(response) {   
              if (response.data.status == 'error') {
                $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');                 
                notify({ message:'Data Tidak Boleh Dihapus Dikarenakan Data Produk Masih Ada Transaksi', 
                  position:'right',
                  duration:'10000',
                  classes: 'alert-warning'
                });  
              }else{
                $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');                 
                notify({ message:'Data Error', 
                  position:'right',
                  duration:'10000',
                  classes: 'alert-danger'
                });       
              }
              $scope.init();
            });   

          }, function () {
            
          });
        };

    // revisi
    $scope.revisi = function (id) {
      var modalInstance = $modal.open({
        templateUrl: 'partials/produk/modal_revisi.html',
        controller: 'Modalrevisi',
        resolve: {
          items: function () {
            return id;
          }
        }
      });
      modalInstance.result.then(function () {
          $scope.init();
          }, function () {
            $scope.init();
      });
    };

    // Notififkasi
    $scope.notif = function (id) {
      var modalInstance = $modal.open({
        templateUrl: 'partials/produk/modal_notif.html',
        controller: 'Modalnotif',
        resolve: {
          items: function () {
            return id;
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

app.controller('Modalrevisi', ['$scope','$uibModalInstance','items','$http','$location','notify','$uibModal', function($scope, $modalInstance, items,$http,$location,notify,$modal) { 
    $scope.items = items;
    $scope.form ={};
    // get revisi
    $http.get(baseurl+'admin/get_revisi/'+items,$scope.auth_config).then(function(data) {
              $scope.form = data.data
      }, function(x) {
    });

    $scope.save = function () {
      $http.post(baseurl+'admin/update_revisi/'+items,$scope.form,$scope.auth_config)
          .then(function (response){
            notify({ message:'Update Berhasil Ditambah', position:'right', duration:'10000', classes: 'alert-success' }); 
           },function (error){
            notify({ message:'Data Error',  position:'right', duration:'10000', classes: 'alert-danger' }); 
           });
      $modalInstance.close($scope.items);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);

app.controller('Modalnotif', ['$scope','$uibModalInstance','items','$http','$location','notify','$uibModal', function($scope, $modalInstance, items,$http,$location,notify,$modal) { 
    $scope.items = items;
    $scope.form ={};
    // get revisi
    // $http.get(baseurl+'admin/get_revisi/'+items,$scope.auth_config).then(function(data) {
    //           $scope.form = data.data
    //   }, function(x) {
    // });

    $scope.save = function () {
      $http.post(baseurl+'admin/notifikasi/'+items,$scope.form,$scope.auth_config)
          .then(function (response){
            notify({ message:'Kirim Notififkasi Berhasil Dikirim', position:'right', duration:'10000', classes: 'alert-success' }); 
           },function (error){
            notify({ message:'Data Error',  position:'right', duration:'10000', classes: 'alert-danger' }); 
           });
      $modalInstance.close($scope.items);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);

app.controller('ProdukAdd', ['$scope', '$http','FileUploader','$state','$location','notify','$uibModal',
  function ($scope, $http,FileUploader,$state,$location,notify,$modal) {

    // get kategori
    $http.get(baseurl+'admin/get_kategori',$scope.auth_config).then(function(data) {
            $scope.kategori = data.data
    }, function(x) {
    });

    // get color
    $scope.colors = function() {
        $http.get(baseurl+'admin/get_color',$scope.auth_config).then(function(data) {
                $scope.color = data.data
        }, function(x) {
        });
    }

    // get color
    $scope.sizes = function() {
        $http.get(baseurl+'admin/get_size',$scope.auth_config).then(function(data) {
                $scope.size = data.data
        }, function(x) {

        });
    }
  $scope.colors();
  $scope.sizes();
    $scope.form = {};

     $scope.change=function($event, money){
      form.harga = qwerty;
    };

    $scope.save = function() {
        $scope.form.deskripsi = document.getElementById('desc_text').innerHTML
        $http.post(baseurl+'admin/add_produk',$scope.form,$scope.auth_config)
          .then(function(response) {
              $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
              notify({ message:'Berhasil Ditambah', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });
            $location.path('/app/produk/produk_semua');
          }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
          });  
    }
    
    $scope.form.status = "1";

    // modal color
    $scope.add_color = function () {
      var modalInstance = $modal.open({
        templateUrl: 'partials/produk/modal_color.html',
        controller: 'Modalcolor',
        resolve: {
          items: function () {
            return $scope.form.id;
          }
        }
      });
      modalInstance.result.then(function () {
          $scope.colors();
          }, function () {
            $scope.colors();
      });
    };
    // remove color
    $scope.remove_color = function (id) {
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
        $http.delete(baseurl+'admin/color_delete/'+id,$scope.auth_config)
        .then(function successCallback(response) {
          $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
          notify({ message:'Berhasil Menghapus Data', 
            position:'right',
            duration:'10000',
            classes: 'alert-success'
          });  
          $scope.colors();
        }, function errorCallback(response) {   
          $scope.colors();
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

    // modal size
    $scope.add_size = function () {
      var modalInstance = $modal.open({
        templateUrl: 'partials/produk/modal_size.html',
        controller: 'Modalsize',
        resolve: {
          items: function () {
            return $scope.form.id;
          }
        }
      });
      modalInstance.result.then(function () {
          $scope.sizes();
          }, function () {
          $scope.sizes();
      });
    };

    // remove size
    $scope.remove_size = function (id) {
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
        $http.delete(baseurl+'admin/size_delete/'+id,$scope.auth_config)
        .then(function successCallback(response) {
          $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
          notify({ message:'Berhasil Menghapus Data', 
            position:'right',
            duration:'10000',
            classes: 'alert-success'
          });  
         $scope.sizes();
        }, function errorCallback(response) {   
          $scope.sizes();
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


}]);

app.controller('Modalcolor', ['$scope','$uibModalInstance','items','$http','$location','notify','$uibModal', function($scope, $modalInstance, items,$http,$location,notify,$modal) { 
    $scope.items = items;
    $scope.hexPicker = {};
    $scope.hexPicker = { color: '' };
    $scope.rgbPicker = { color: '' };
    $scope.rgbaPicker = { color: '' };
        $scope.nonInput = { color: '' };
        $scope.resetColor = function () {
            $scope.hexPicker = { color: '#ff0000' };
        };
    $scope.save = function () {
      $http.post(baseurl+'admin/add_color',$scope.hexPicker,$scope.auth_config)
          .then(function (response){
            if (response.data === "data_same") {
                notify({ message:'Data Sudah Ada',  position:'right', duration:'10000', classes: 'alert-danger' });
            }else{
              notify({ message:'Color Berhasil Ditambah', position:'right', duration:'10000', classes: 'alert-success' }); 
            }
           },function (error){
            notify({ message:'Data Error',  position:'right', duration:'10000', classes: 'alert-danger' }); 
           });
      $modalInstance.close($scope.items);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);

app.controller('Modalsize', ['$scope','$uibModalInstance','items','$http','$location','notify','$uibModal', function($scope, $modalInstance, items,$http,$location,notify,$modal) { 
    $scope.items = items;
    $scope.form = {};

    $scope.save = function () {
      $http.post(baseurl+'admin/add_size',$scope.form,$scope.auth_config)
          .then(function (response){
            if (response.data === "data_same") {
                notify({ message:'Data Sudah Ada',  position:'right', duration:'10000', classes: 'alert-danger' });
            }else{
                notify({ message:'Size Berhasil Ditambah', position:'right', duration:'10000', classes: 'alert-success' }); 
            }
           },function (error){
            notify({ message:'Data Error',  position:'right', duration:'10000', classes: 'alert-danger' }); 
           });
      $modalInstance.close($scope.items);
    };
    $scope.cancel = function (){
      $modalInstance.dismiss('cancel');
    };
}]);

app.controller('ProdukRubah', ['$scope', '$http','$log','$uibModal','notify','$stateParams','$state','FileUploader','$location',
  function ($scope, $http, $log, $modal,notify,$stateParams,$state,FileUploader,$location) {
    $scope.load_sign();
    // get kategori
    $http.get(baseurl+'admin/get_kategori',$scope.auth_config).then(function(data) {
            $scope.kategori = data.data
    }, function(x) {
    });


    $http.get(baseurl+'admin/rubah_produk/'+$stateParams.id,$scope.auth_config).then(function(data) {
      $scope.form=data.data;
      document.getElementById("desc_text").innerHTML = $scope.form.deskripsi;
    }, function(x) {
      notify({ message:'Server Error',position:'right',duration:'10000',classes: 'alert-danger'});
    });


    // get color
    $scope.colors = function() {
        $http.get(baseurl+'admin/get_color',$scope.auth_config).then(function(data) {
                $scope.color = data.data
        }, function(x) {
        });
    }

    // get color
    $scope.sizes = function() {
        $http.get(baseurl+'admin/get_size',$scope.auth_config).then(function(data) {
                $scope.size = data.data
        }, function(x) {

        });
    }
  $scope.colors();
  $scope.sizes();

    $scope.save = function() {  
      $('#load').removeClass('glyphicon glyphicon-floppy-saved').addClass('fa fa-circle-o-notch fa-spin');  
      $scope.form.deskripsi = document.getElementById('desc_text').innerHTML                 
      $http.put(baseurl+'admin/produk_update/'+$stateParams.id, $scope.form,$scope.auth_config)
      .then(function successCallback(response) {
            notify({ message:'Berhasil Dirubah', position:'right',duration:'10000',classes: 'alert-success'});
            $location.path('/app/produk/produk_semua');
      }, function errorCallback(response) {                    
        notify({ message:'Server Error',position:'right',duration:'10000',classes: 'alert-danger'});
      });          
    }


    // modal color
    $scope.add_color = function () {
      var modalInstance = $modal.open({
        templateUrl: 'partials/produk/modal_color.html',
        controller: 'Modalcolor',
        resolve: {
          items: function () {
            return $scope.form.id;
          }
        }
      });
      modalInstance.result.then(function () {
          $scope.colors();
          }, function () {
            $scope.colors();
      });
    };
    // remove color
    $scope.remove_color = function (id) {
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
        $http.delete(baseurl+'admin/color_delete/'+id,$scope.auth_config)
        .then(function successCallback(response) {
          $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
          notify({ message:'Berhasil Menghapus Data', 
            position:'right',
            duration:'10000',
            classes: 'alert-success'
          });  
          $scope.colors();
        }, function errorCallback(response) {   
          $scope.colors();
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

    // modal size
    $scope.add_size = function () {
      var modalInstance = $modal.open({
        templateUrl: 'partials/produk/modal_size.html',
        controller: 'Modalsize',
        resolve: {
          items: function () {
            return $scope.form.id;
          }
        }
      });
      modalInstance.result.then(function () {
          $scope.sizes();
          }, function () {
          $scope.sizes();
      });
    };

    // remove size
    $scope.remove_size = function (id) {
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
        $http.delete(baseurl+'admin/size_delete/'+id,$scope.auth_config)
        .then(function successCallback(response) {
          $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
          notify({ message:'Berhasil Menghapus Data', 
            position:'right',
            duration:'10000',
            classes: 'alert-success'
          });  
         $scope.sizes();
        }, function errorCallback(response) {   
          $scope.sizes();
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



app.controller('FileUploadCtrl', ['$scope', 'FileUploader','$stateParams','notify','$http','$uibModal', function($scope, FileUploader,$stateParams,notify,$http,$modal) {
    $scope.url = baseurl+'image/'
    $scope.form = {};

    $scope.form={
    much : '10',    
    order : 'desc',
    };

    $scope.init = function (paging = '') {
      if ( paging  == '') {
          $scope.currentPage = 1;
      }
      $scope.maxSize = 20;
    $http.post(baseurl+'admin/all_produk_gambar/'+$stateParams.id+'?page='+$scope.currentPage,$scope.form,$scope.auth_config)
          .then(function(data) {
              $scope.list=data.data
              $scope.image=$scope.list.data
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

    var uploader = $scope.uploader = new FileUploader({
        url: baseurl+'admin/do/upload_gambar/'+$stateParams.id,
        headers: {
          'X-CSRF-TOKEN': token
        }
    });

    // FILTERS

    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
        notify({ message:'Server Error',position:'right',duration:'10000',classes: 'alert-danger'});
        $scope.init();
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
        notify({ message:'Berhasil Upload Gambar', position:'right',duration:'10000',classes: 'alert-success'});
        $scope.init();
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

        $scope.chacked_gambar = function(gambar) {
          $scope.gambar = {
            gambar : gambar,
          };
          $http.put(baseurl+'admin/update_gambar_produk/'+$stateParams.id,$scope.gambar,$scope.auth_config)
          .then(function(data) {
              notify({ message:'Berhasil Update Gambar', position:'right',duration:'10000',classes: 'alert-success'});
             $scope.init();
          }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
          });
        }

      $scope.hapus_gambar = function (id) {
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
        $http.delete(baseurl+'admin/delete_gambar/'+id,$scope.auth_config)
        .then(function successCallback(response) {
          $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
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
}]);
