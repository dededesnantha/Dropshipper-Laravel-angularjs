'use strict';

app.controller('TeamAdd', ['$scope', '$http','FileUploader','$state','$location','notify',
  function ($scope, $http,FileUploader,$state,$location,notify) {

    $scope.form = {};

    $scope.save = function() {
        $http.post(baseurl+'admin/add_team',$scope.form,$scope.auth_config)
          .then(function(response) {
              notify({ message:'Berhasil Ditambah', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });
              $location.path('/app/team/list');
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

}]);

app.controller('TeamAll', ['$scope', '$http','$log','$uibModal','notify',
  function ($scope, $http, $log, $modal,notify) {
    $scope.load_sign();
    $scope.url_image = baseurl+'image/';

    $scope.init = function () {
    	$http.get(baseurl+'admin/all_team',$scope.auth_config)
          .then(function(data) {
              $scope.datass=data.data
          }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
          });
    };
    $scope.init();

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
            $http.delete(baseurl+'admin/team_delete/'+id,$scope.auth_config)
            .then(function successCallback(response) {
              $scope.init();
              notify({ message:'Berhasil Menghapus Data', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });  
              $location.path('/app/team/list'); 
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

app.controller('TeamRubah', ['$scope', '$http','$log','$uibModal','notify','$stateParams','$state','FileUploader','$location',
  function ($scope, $http, $log, $modal,notify,$stateParams,$state,FileUploader,$location) {
    $scope.load_sign();
    $scope.url = baseurl+'image/';

    $http.get(baseurl+'admin/rubah_team/'+$stateParams.id,$scope.auth_config).then(function(data) {
      $scope.form=data.data;
    }, function(x) {
      notify({ message:'Server Error',position:'right',duration:'10000',classes: 'alert-danger'});
    });


    var uploader = $scope.uploader = new FileUploader({
        url: 'upload_image.php'
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
    }; 

    $scope.save = function() {  
      $http.put(baseurl+'admin/team_update/'+$stateParams.id, $scope.form,$scope.auth_config)
      .then(function successCallback(response) {
            notify({ message:'Berhasil Dirubah', position:'right',duration:'10000',classes: 'alert-success'});
            $location.path('/app/team/list');
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
