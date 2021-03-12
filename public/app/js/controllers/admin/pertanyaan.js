'use strict';
app.controller('PertanyaAdd', ['$scope', '$http','$state','$location','notify',
  function ($scope, $http,$state,$location,notify) {

    $scope.form = {};

    $scope.save = function() {
        $scope.form.jawab = document.getElementById('desc_text').innerHTML
        $http.post(baseurl+'admin/add_pertanyaan',$scope.form,$scope.auth_config)
          .then(function(response) {
              notify({ message:'Berhasil Ditambah', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });
            $location.path('/app/pertanyaan/list');
          }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
          });  
    }
}]);

app.controller('PertanyaAll', ['$scope', '$http','$log','$uibModal','notify',
  function ($scope, $http, $log, $modal,notify) {
    $scope.load_sign();

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
    $http.post(baseurl+'admin/all_pertanyaan?page='+$scope.currentPage,$scope.form,$scope.auth_config)
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
            $http.delete(baseurl+'admin/pertanyaan_delete/'+id,$scope.auth_config)
            .then(function successCallback(response) {
              $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
              $scope.init();
              notify({ message:'Berhasil Menghapus Data', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });  
              $location.path('/app/pertanyaan/list');  
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

app.controller('PertanyaRubah', ['$scope', '$http','$log','$uibModal','notify','$stateParams','$state','$location',
  function ($scope, $http, $log, $modal,notify,$stateParams,$state,$location) {
    $scope.load_sign();

    $http.get(baseurl+'admin/rubah_pertanyaan/'+$stateParams.id,$scope.auth_config).then(function(data) {
      $scope.form=data.data;
      document.getElementById("desc_text").innerHTML = $scope.form.jawab;
    }, function(x) {
      notify({ message:'Server Error',position:'right',duration:'10000',classes: 'alert-danger'});
    });

    $scope.save = function() {  
      $scope.form.jawab = document.getElementById('desc_text').innerHTML
      $http.put(baseurl+'admin/pertanyaan_update/'+$stateParams.id, $scope.form,$scope.auth_config)
      .then(function successCallback(response) {
            notify({ message:'Berhasil Dirubah', position:'right',duration:'10000',classes: 'alert-success'});
            $location.path('/app/pertanyaan/list');
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
