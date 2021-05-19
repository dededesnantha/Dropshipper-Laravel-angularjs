'use strict';

app.controller('UserAll', ['$scope', '$http','$log','$uibModal','notify','$timeout',
  function ($scope, $http, $log, $modal,notify,$timeout) {
  	$scope.datass = [];

    $scope.form={
    much : '10',    
    order : 'desc',
    search : '',
    field_search: 'nama'
    };

    $scope.init = function (paging = '') {
      if ( paging  == '') {
          $scope.currentPage = 1;
      }

      $scope.maxSize = 20;
    $http.post(baseurl+'admin/get_user?page='+$scope.currentPage,$scope.form,$scope.auth_config)
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
                return id;
              }
            }
          });

          modalInstance.result.then(function () {
            $http.delete(baseurl+'admin/user_delete/'+id,$scope.auth_config)
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
            });   

          }, function () {
            
          });
        };

  }]);

app.controller('UserAdd', ['$scope', '$http','$log','$uibModal','notify','$state','$location',
  function ($scope, $http, $log, $modal,notify,$state,$location) {
    $scope.form = {};

    $scope.save = function () {
      $http.post(baseurl+'admin/add_user',$scope.form,$scope.auth_config)
          .then(function (response){
            notify({ message:'Data User Berhasil Ditambah ', position:'right', duration:'10000', classes: 'alert-success' }); 
            $location.path('/app/user/user-all');
           },function (error){
            notify({ message:'Data Update Error',  position:'right', duration:'10000', classes: 'alert-danger' }); 
           });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);

app.controller('UserRubah', ['$scope', '$http','$log','$uibModal','notify','$stateParams','$state','$location',
  function ($scope, $http, $log, $modal,notify,$stateParams,$state,$location) {
  	$scope.form = {};

    console.log($stateParams.id)
    $http.get(baseurl+'admin/rubah_user/'+$stateParams.id,$scope.auth_config).then(function(data) {
      $scope.form=data.data;
        }, function(x) {
      notify({ message:'Server Error',position:'right',duration:'10000',classes: 'alert-danger'});
    });

  	$scope.save = function () {
      $http.post(baseurl+'admin/update_user/'+$stateParams.id,$scope.form,$scope.auth_config)
          .then(function (response){
            notify({ message:'Data User Berhasil Dirubah ', position:'right', duration:'10000', classes: 'alert-success' }); 
            $location.path('/app/user/user-all');
           },function (error){
            notify({ message:'Data Update Error',  position:'right', duration:'10000', classes: 'alert-danger' }); 
           });
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