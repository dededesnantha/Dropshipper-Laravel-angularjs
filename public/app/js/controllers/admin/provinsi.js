app.controller('FormXeditableCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes','notify','$uibModal',
  function($scope, $filter, $http, editableOptions, editableThemes, notify, $modal){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

    // editable table
    $scope.form = {};
    $scope.datas = {};

    $scope.form={
    much : '10',    
    order : 'asc',
    search : '',
    field_search: 'provinsi'
    };

    $scope.init = function (paging = '') {
      if ( paging  == '') {
          $scope.currentPage = 1;
      }

      $scope.maxSize = 20;
    $http.post(baseurl+'admin/all_provinsi?page='+$scope.currentPage,$scope.form,$scope.auth_config)
          .then(function(data) {
              $scope.list=data.data
              $scope.users=$scope.list.data
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
    
    $scope.saveProvinsi = function(data, id) {
      $scope.datas.provinsi = data.provinsi;
      $scope.datas.id_provinsi = id;
      $http.post(baseurl+'admin/add_provinsi',$scope.datas,$scope.auth_config)
          .then(function(datass) {
            $scope.init();
            notify({ message:'Berhasil Tamabah Data', position:'right',duration:'10000',classes: 'alert-success'});
      }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
          });
      angular.extend(data, {id: id});
    };

    // remove user
    $scope.removeUser = function(index) {
      var modalInstance = $modal.open({
            templateUrl: 'partials/Hapusmodal.html',
            controller: 'Hapus',
            resolve: {
              items: function () {
                return index;
              }
            }
          });
          modalInstance.result.then(function () {
            $http.delete(baseurl+'admin/provinsi_delete/'+index,$scope.auth_config)
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

    $scope.edit = function(id){
      console.log(id)
    }
    // add user
    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.users.length+1,
        name: '',
        status: null,
        group: null 
      };
      $scope.users.push($scope.inserted);
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