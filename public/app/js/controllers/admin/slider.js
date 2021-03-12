'use strict';

app.controller('FileUploadSlidersss', ['$scope', '$http','FileUploader','$state','$location','notify',
  function ($scope, $http,FileUploader,$state,$location,notify) {

  	$scope.form = {};

  	var uploader = $scope.uploader = new FileUploader({
        url: 'upload_slider.php'
        // url:baseurl+'upload/slider'
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
        $scope.form.gambar = [fileItem.file.name];
      
        if (response.error) {
        	notify({ message:response.error, position:'right', duration:'10000',classes: 'alert-danger'});
        }else{
        	$http.post(baseurl+'admin/slider_add',$scope.form,$scope.auth_config)
	          .then(function(response) {
	            notify({ message:'Gambar berhasil diupload', position:'right', duration:'10000',classes: 'alert-success'});
	            $location.path('/app/slider/list');
	          }, function(x) {
	              notify({ message:'Server Error', 
	                      position:'right',
	                      duration:'10000',
	                      classes: 'alert-danger'
	                    });
	          });  

        	
        }
    };

}]);

app.controller('sliderAll', ['$scope', '$http','$log','$uibModal','notify',
  function ($scope, $http, $log, $modal,notify) {
    $scope.load_sign();
    $scope.url_slider = baseurl+'gallery/';

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
    $http.post(baseurl+'admin/all_slider?page='+$scope.currentPage,$scope.form,$scope.auth_config)
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
            $http.delete(baseurl+'admin/slider_delete/'+id,$scope.auth_config)
            .then(function successCallback(response) {
              $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
              $scope.init();
              notify({ message:'Berhasil Menghapus Data',  position:'right', duration:'10000', classes: 'alert-success' });  
              $location.path('/app/slider/list');   
            }, function errorCallback(response) {   
              $scope.init();
            $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');                 
                notify({ message:'Data Error', position:'right', duration:'10000', classes: 'alert-danger'});       
            });   

          }, function () {
            
          });
        };

     $scope.modal_rubah = function (id) {
     	var modalInstance = $modal.open({
            templateUrl: 'partials/slider/modal_rubah.html',
            controller: 'Rubahslider',
            resolve: {
              items: function () {
                return id;
              }
            }
          });

     	modalInstance.result.then(function () {
         	$scope.init();
          }, function () {
          
          });
     }

     $scope.moveUP = function (id) {
      $http.get(baseurl+'admin/move_up_slider/'+id,$scope.auth_config)
      .then(function successCallback(response) {
              $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
              $scope.init();
              notify({ message:'Berhasil Merubah Data', position:'right',duration:'10000',classes: 'alert-success'});  
            }, function errorCallback(response) {   
              $scope.init();
            $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');                 
                notify({ message:'Data Error', position:'right', duration:'10000', classes: 'alert-danger'
                });   
            }); 
    }

    $scope.moveDown = function (id) {
      $http.get(baseurl+'admin/move_down_slider/'+id,$scope.auth_config)
      .then(function successCallback(response) {
              $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
              $scope.init();
              notify({ message:'Berhasil Merubah Data', position:'right',duration:'10000',classes: 'alert-success'});  
            }, function errorCallback(response) {   
              $scope.init();
            $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');                 
                notify({ message:'Data Error', position:'right', duration:'10000', classes: 'alert-danger'
                });   
            }); 
    }
    

}]);


app.controller('Rubahslider', ['$scope', '$uibModalInstance', 'items','$http','notify', function($scope, $modalInstance, items, $http,notify) {
    $scope.items = items;
    $scope.form = {};
    
    $http.get(baseurl+'admin/get_slider/'+$scope.items,$scope.auth_config).then(function(data) {
            $scope.form = data.data
    	}, function(x) {

    });

    $scope.save = function() {
    	$http.put(baseurl+'admin/update_slider/'+$scope.items, $scope.form,$scope.auth_config)
		      .then(function successCallback(response) {
		            notify({ message:'Berhasil Dirubah', position:'right',duration:'10000',classes: 'alert-success'});
		    		$modalInstance.close($scope.items);
		      }, function errorCallback(response) {                    
		        notify({ message:'Server Error',position:'right',duration:'10000',classes: 'alert-danger'});
		      });    
    }
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