'use strict';

app.controller('KategoriAll', ['$scope', '$http','$log','$uibModal','notify',
  function ($scope, $http, $log, $modal,notify) {
    $scope.load_sign();
    $scope.url_link = baseurl+'category/';

    $scope.form = {};

    $scope.form={
    much : '10',    
    order : 'desc',
    search : ''
    };


    $scope.init = function (paging = '') {
      
      if ( paging  == '') {
          $scope.currentPage = 1;
      }
      $scope.maxSize = 20;
    $http.post(baseurl+'admin/all_kategori?page='+$scope.currentPage,$scope.form,$scope.auth_config)
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
              $scope.init($scope.currentPage, $scope.form.search);
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
            $http.delete(baseurl+'admin/kategori/'+id,$scope.auth_config)
            .then(function successCallback(response) {
              $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
              $scope.init();
              notify({ message:'Berhasil Menghapus Data', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });  
              $location.path('/app/kategori/kategori_semua');   
            }, function errorCallback(response) {   
              $scope.init();
            $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');                 
                notify({ message:'Data Error', 
                        position:'right',
                        duration:'10000',
                        classes: 'alert-danger'
                }); 
              $location.path('/app/kategori/kategori_semua');       
            });   

          }, function () {
            
          });
        };

}]);

app.controller('KategoriAdd', ['$scope', '$http','FileUploader','$state','$location','notify',
  function ($scope, $http,FileUploader,$state,$location,notify) {

    $scope.form = {};

    $scope.save = function() {
        $scope.form.deskripsi = document.getElementById('desc_text').innerHTML
        
        $http.post(baseurl+'admin/add_kategori',$scope.form,$scope.auth_config)
          .then(function(response) {
              $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
              notify({ message:'Berhasil Ditambah', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });
            $location.path('/app/kategori/kategori_semua');
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
        $scope.form.gambar = fileItem.file.name;
    };


    $scope.remove = function(index){  
        console.log($scope.auth_config)
        $http.post(baseurl+'admin/remove_image/'+index,$scope.auth_config)
          .then(function(response) {
              $localStorage.user = response.data.user;
              $localStorage.token = response.data.token;
              $scope.authError_msg = "Login Berhasil";
              $scope.load_sign();
          }, function(x) {
            $scope.authError_msg = x.data.message;
          });    
      console.log(index)
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

app.controller('KategoriEdit', ['$scope','$http','$location','$stateParams','notify','$state','FileUploader', function($scope,$http,$location,$stateParams,notify,$state,FileUploader) {    
    $scope.load_sign();
    $http.get(baseurl+'admin/get_kategori/'+$stateParams.id,$scope.auth_config).then(function(data) {
              $scope.form=data.data;
              document.getElementById("desc_text").innerHTML = $scope.form.deskripsi;
              
              console.log($scope.form.status)
    }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
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
        $scope.form.gambar = fileItem.file.name;
    }; 

    $scope.save = function() {  
      $('#load').removeClass('glyphicon glyphicon-floppy-saved').addClass('fa fa-circle-o-notch fa-spin');  
      $scope.form.deskripsi = document.getElementById('desc_text').innerHTML                 
      $http.put(baseurl+'admin/kategori_update/'+$stateParams.id, $scope.form,$scope.auth_config)
      .then(function successCallback(response) {
            notify({ message:'Berhasil Ditambah', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });
            $location.path('/app/kategori/kategori_semua');
      }, function errorCallback(response) {                    
        notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
      });          
    }   
}]);
