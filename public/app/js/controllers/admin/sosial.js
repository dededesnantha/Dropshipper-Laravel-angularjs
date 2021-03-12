'use strict';

app.controller('SosialMediaAdd', ['$scope', '$http','FileUploader','$state','$location','notify',
  function ($scope, $http,FileUploader,$state,$location,notify) {
  	$scope.form = {};
  	$scope.url = baseurl+'media/icon/'
  	var uploader = $scope.uploader = new FileUploader({
        url: 'upload_image_icon.php'
    });

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
        if (response.error) {
        	notify({ message:response.error, position:'right', duration:'10000',classes: 'alert-danger'});
        }else{
        	notify({ message:'Gambar berhasil diupload', position:'right', duration:'10000',classes: 'alert-success'});
        }
    };

    $scope.save = function() {
        $http.post(baseurl+'admin/add_sosial',$scope.form,$scope.auth_config)
          .then(function(response) {
              notify({ message:'Berhasil Ditambah', position:'right', duration:'10000',classes: 'alert-success' });
            $location.path('/app/sosial/list');
          }, function(x) {
              notify({ message:'Server Error',  position:'right', duration:'10000', classes: 'alert-danger' });
          });  
    }    

}]);


app.controller('SosialMediaAll', ['$scope', '$http','$log','$uibModal','notify',
  function ($scope, $http, $log, $modal,notify) {
    $scope.load_sign();
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
    $http.post(baseurl+'admin/all_sosialmedia?page='+$scope.currentPage,$scope.form,$scope.auth_config)
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
          $scope.itemsPerPage = 10;

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
            $http.delete(baseurl+'admin/sosial_delete/'+id,$scope.auth_config)
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

app.controller('SosialEdit', ['$scope', '$http','$log','$uibModal','notify','$stateParams','$state','FileUploader','$location',
  function ($scope, $http, $log, $modal,notify,$stateParams,$state,FileUploader,$location) {
    $scope.load_sign();
    $scope.url = baseurl+'media/icon/';

    $http.get(baseurl+'admin/sosial_produk/'+$stateParams.id,$scope.auth_config).then(function(data) {
      $scope.form=data.data;
    }, function(x) {
      notify({ message:'Server Error',position:'right',duration:'10000',classes: 'alert-danger'});
    });


    var uploader = $scope.uploader = new FileUploader({
        url: 'upload_image_icon.php'
    });

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
        if (response.error) {
        	notify({ message:response.error, position:'right', duration:'10000',classes: 'alert-danger'});
        }else{
        	notify({ message:'Gambar berhasil diupload', position:'right', duration:'10000',classes: 'alert-success'});
        }
    }; 

    $scope.save = function() {  
      $http.put(baseurl+'admin/sosial_update/'+$stateParams.id, $scope.form,$scope.auth_config)
      .then(function successCallback(response) {
            notify({ message:'Berhasil Dirubah', position:'right',duration:'10000',classes: 'alert-success'});
            $location.path('/app/sosial/list');
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
