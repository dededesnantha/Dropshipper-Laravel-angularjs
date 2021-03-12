'use strict';
app.controller('ClientAdd', ['$scope', '$http','FileUploader','$state','$location','notify','$filter',
  function ($scope, $http,FileUploader,$state,$location,notify,$filter) {
  	$scope.url_image = baseurl+'image/';
  	$scope.today = function() {
	    $scope.dt = new Date();
	};
  	$scope.today();

	  $scope.disabled = function(date, mode) {
	    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	  };

	  $scope.toggleMin = function() {
	    $scope.minDate = $scope.minDate ? null : new Date();
	  };
	  $scope.toggleMin();

	$scope.dtpick = {
	        opened: false,
	        opened2: false
	      }

	  $scope.open = function($event,type) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.dtpick[type] = true;
	  };

	  $scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	  };

	  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  $scope.format = $scope.formats[0];

	  var tomorrow = new Date();
	  tomorrow.setDate(tomorrow.getDate() + 1);
	  var afterTomorrow = new Date();
	  afterTomorrow.setDate(tomorrow.getDate() + 2);
	  $scope.events =
	    [
	      {
	        date: tomorrow,
	        status: 'full'
	      },
	      {
	        date: afterTomorrow,
	        status: 'partially'
	      }
	    ];

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

    $scope.form = {};
    $scope.save = function() {
    	$scope.form.date = $filter('date')($scope.form.date, "yyyy-MM-dd");
       	$scope.form.deskripsi = document.getElementById('desc_text').innerHTML
        $http.post(baseurl+'admin/add_client',$scope.form,$scope.auth_config)
          .then(function(response) {
              notify({ message:'Berhasil Ditambah', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });
            $location.path('/app/client/list');
          }, function(x) {
              notify({ message:'Server Error', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
          });  
    }

}]);

app.controller('TestimoniAll', ['$scope', '$http','$log','$uibModal','notify',
  function ($scope, $http, $log, $modal,notify) {
    $scope.load_sign();
    $scope.url_image = baseurl+'image/';

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

    $http.post(baseurl+'admin/all_testi?page='+$scope.currentPage,$scope.form,$scope.auth_config)
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
            $http.delete(baseurl+'admin/testi_delete/'+id,$scope.auth_config)
            .then(function successCallback(response) {
              $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
              $scope.init();
              notify({ message:'Berhasil Menghapus Data', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });  
              $location.path('/app/client/list');   
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

app.controller('ClientRubah', ['$scope', '$http','$log','$uibModal','notify','$stateParams','$state','FileUploader','$location','$filter',
  function ($scope, $http, $log, $modal,notify,$stateParams,$state,FileUploader,$location,$filter) {
    $scope.load_sign();

    $http.get(baseurl+'admin/rubah_testimoni/'+$stateParams.id,$scope.auth_config).then(function(data) {
      $scope.form=data.data;
      $scope.form.date =  new Date($scope.form.date);

      document.getElementById("desc_text").innerHTML = $scope.form.deskripsi;
    }, function(x) {
      notify({ message:'Server Error',position:'right',duration:'10000',classes: 'alert-danger'});
    });

    $scope.today = function() {
	    $scope.dt = new Date();
	};
  	$scope.today();

	  $scope.disabled = function(date, mode) {
	    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	  };

	  $scope.toggleMin = function() {
	    $scope.minDate = $scope.minDate ? null : new Date();
	  };
	  $scope.toggleMin();

	$scope.dtpick = {
	        opened: false,
	        opened2: false
	      }

	  $scope.open = function($event,type) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.dtpick[type] = true;
	  };

	  $scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	  };

	  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  $scope.format = $scope.formats[0];

	  var tomorrow = new Date();
	  tomorrow.setDate(tomorrow.getDate() + 1);
	  var afterTomorrow = new Date();
	  afterTomorrow.setDate(tomorrow.getDate() + 2);
	  $scope.events =
	    [
	      {
	        date: tomorrow,
	        status: 'full'
	      },
	      {
	        date: afterTomorrow,
	        status: 'partially'
	      }
	    ];


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

    $scope.save = function() {  
      $('#load').removeClass('glyphicon glyphicon-floppy-saved').addClass('fa fa-circle-o-notch fa-spin');  
      $scope.form.deskripsi = document.getElementById('desc_text').innerHTML              
      $scope.form.date = $filter('date')($scope.form.date, "yyyy-MM-dd");

      $http.put(baseurl+'admin/testi_update/'+$stateParams.id, $scope.form,$scope.auth_config)
      .then(function successCallback(response) {
            notify({ message:'Berhasil Dirubah', position:'right',duration:'10000',classes: 'alert-success'});
            $location.path('/app/client/list');
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

app.controller('FileUploadClient', ['$scope', '$http','FileUploader','$state','$location','notify',
  function ($scope, $http,FileUploader,$state,$location,notify) {

    $scope.form = {};
    
    var uploader = $scope.uploader = new FileUploader({
        url: 'upload_slider.php'
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
          $http.post(baseurl+'admin/client_add',$scope.form,$scope.auth_config)
            .then(function(response) {
              notify({ message:'Gambar berhasil diupload', position:'right', duration:'10000',classes: 'alert-success'});
              // $location.path('/app/slider/list');
            }, function(x) {
                notify({ message:'Server Error', position:'right', duration:'10000', classes: 'alert-danger' });
            });  

          
        }
    };
}]);

app.controller('ClientAll', ['$scope', '$http','$log','$uibModal','notify',
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
    $http.post(baseurl+'admin/client_semua?page='+$scope.currentPage,$scope.form,$scope.auth_config)
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
            $http.delete(baseurl+'admin/client_delete/'+id,$scope.auth_config)
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
            templateUrl: 'partials/client/client_modal_rubah.html',
            controller: 'RubahClient',
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

app.controller('RubahClient', ['$scope', '$uibModalInstance', 'items','$http','notify', function($scope, $modalInstance, items, $http,notify) {
    $scope.items = items;
    $scope.form = {};
    
    $http.get(baseurl+'admin/get_client_id/'+$scope.items,$scope.auth_config).then(function(data) {
            $scope.form = data.data
      }, function(x) {

    });

    $scope.save = function() {
      $http.put(baseurl+'admin/update_client_id/'+$scope.items, $scope.form,$scope.auth_config)
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


