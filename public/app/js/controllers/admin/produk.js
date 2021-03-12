'use strict';

app.controller('ProdukAll', ['$scope', '$http','$log','$uibModal','notify',
  function ($scope, $http, $log, $modal,notify) {
    $scope.load_sign();
    $scope.url_image = baseurl+'image/';
    $scope.url_icon = baseurl+'media/icon/';


    $scope.init = function (paging = '', search ='') {
      $scope.form = {};
      if ( paging  == '') {
          $scope.currentPage = 1;
      }
      if (search == '') {
          $scope.form.serach = ''; 
      }else{
          $scope.form.serach = search;
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
        };
        
        $scope.init();

          $scope.currentPage = 1;
          $scope.itemsPerPage = 5;

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
              $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
              $scope.init();
              notify({ message:'Berhasil Menghapus Data', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });  
              $location.path('/app/produk/produk_semua');   
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

app.controller('ProdukAdd', ['$scope', '$http','FileUploader','$state','$location','notify','$uibModal',
  function ($scope, $http,FileUploader,$state,$location,notify,$modal) {

    // get kategori
    $http.get(baseurl+'admin/get_kategori',$scope.auth_config).then(function(data) {
            $scope.kategori = data.data
    }, function(x) {
    });

    $scope.form = {};

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

    var uploader = $scope.uploader = new FileUploader({
        url: 'upload_image.php'
    });

    
    $scope.form.status = "1";
    $scope.url = baseurl+'image/'
    // FILTERS
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    // CALLBACKS
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        $scope.form.image = fileItem.file.name;
    };

    // icon
    var uploader_icon = $scope.uploader_icon = new FileUploader({
        url: 'upload_image_icon.php'
    });
    $scope.url_icon = baseurl+'media/icon/'
    // FILTERS
    uploader_icon.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    // CALLBACKS
    uploader_icon.onCompleteItem = function(fileItem, response, status, headers) {
        if (response.error) {
          notify({ message:response.error, position:'right', duration:'10000',classes: 'alert-danger'});
        }else{
          $scope.form.icon = fileItem.file.name;
          notify({ message:'Gambar berhasil diupload', position:'right', duration:'10000',classes: 'alert-success'});
        }
    };

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
          }, function () {
      });
    };

}]);


app.controller('Modalcolor', ['$scope','$uibModalInstance','items','$http','$location','notify','$uibModal', function($scope, $modalInstance, items,$http,$location,notify,$modal) { 
    $scope.items = items;
    $scope.form = {};

    $scope.hexPicker = { color: '' };
        $scope.rgbPicker = { color: '' };
        $scope.rgbaPicker = { color: '' };
        $scope.nonInput = { color: '' };
        $scope.resetColor = function () {
            $scope.hexPicker = { color: '#ff0000' };
        };
        $scope.resetRBGColor = function () {
            $scope.rgbPicker = { color: 'rgb(255,0,0)' };
        };
        $scope.resetRBGAColor = function () {
            $scope.rgbaPicker = { color: 'rgba(255,0,0, 0.25)' };
        };
        $scope.resetNonInputColor = function () {
            $scope.nonInput = { color: '#ffffff' };
        };
        

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


    var uploader = $scope.uploader = new FileUploader({
        url: 'upload_image.php'
    });

    
    $scope.url = baseurl+'image/'
    // FILTERS
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    // CALLBACKS
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        $scope.form.image = fileItem.file.name;
    }; 

    // icon
    var uploader_icon = $scope.uploader_icon = new FileUploader({
        url: 'upload_image_icon.php'
    });
    $scope.url_icon = baseurl+'media/icon/'
    // FILTERS
    uploader_icon.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });
    // CALLBACKS
    uploader_icon.onCompleteItem = function(fileItem, response, status, headers) {
        if (response.error) {
          notify({ message:response.error, position:'right', duration:'10000',classes: 'alert-danger'});
        }else{
          $scope.form.icon = fileItem.file.name;
          notify({ message:'Gambar berhasil diupload', position:'right', duration:'10000',classes: 'alert-success'});
        }
    };

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

