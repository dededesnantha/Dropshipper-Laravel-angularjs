'use strict';

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

    
}]);