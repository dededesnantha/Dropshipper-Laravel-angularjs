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

app.controller('AdministratorAll', ['$scope', '$http','$log','$uibModal','notify',
  function ($scope, $http, $log, $modal,notify) {
    
    $scope.load_sign();
    $scope.form = {};

    $scope.form={
    much : '10',    
    order : 'desc',
    search : '',
    field_search: 'tb_admin.nama'
    };

    $scope.init = function (paging = '', search ='') {
      if ( paging  == '') {
          $scope.currentPage = 1;
      }
      $scope.maxSize = 20;
      $scope.form.status_user = $scope.status_user
    $http.post(baseurl+'admin/all_administrator?page='+$scope.currentPage,$scope.form,$scope.auth_config)
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
            $http.delete(baseurl+'admin/admin_delete/'+id,$scope.auth_config)
            .then(function successCallback(response) {
              $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
              $scope.init();
              notify({ message:'Berhasil Menghapus Data', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });  
              $location.path('/app/setting/administrator');   
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
        $scope.hak_akses = function (id) {
          var modalInstance = $modal.open({
            templateUrl: 'partials/setting/hak_akses.html',
            controller: 'HakAses',
            resolve: {
              items: function () {
                return id;
              }
            }
          });
          modalInstance.result.then(function () {
                $scope.init();
              }, function () {
                $scope.init();
          });
        };
}]);

app.controller('AdminAdd', ['$scope', '$http','$state','$location','notify',
  function ($scope, $http,$state,$location,notify) {
    $scope.form = {};
    $scope.save = function() {
        $http.post(baseurl+'admin/admin/add',{nama: $scope.form.nama, username: $scope.form.username, password: $scope.form.password},$scope.auth_config)
          .then(function(response) {
              $('#load').addClass('glyphicon glyphicon-floppy-saved').removeClass('fa fa-circle-o-notch fa-spin');
              notify({ message:'Berhasil Ditambah', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-success'
                    });
            $location.path('/app/setting/administrator');
          }, function(x) {
              notify({ message:'Username Sudah Digunakan', 
                      position:'right',
                      duration:'10000',
                      classes: 'alert-danger'
                    });
          });  
    }
}]);

app.controller('AdminRubah', ['$scope', '$http','$log','$uibModal','notify','$stateParams','$state','$location',
  function ($scope, $http, $log, $modal,notify,$stateParams,$state,$location) {
    $scope.load_sign();
    
    $http.get(baseurl+'admin/admin_rubah/'+$stateParams.id,$scope.auth_config).then(function(data) {
      $scope.form = data.data;
    }, function(x) {
      notify({ message:'Server Error',position:'right',duration:'10000',classes: 'alert-danger'});
    });

    $scope.save = function() {              
      $http.put(baseurl+'admin/admin_update/'+$stateParams.id, $scope.form,$scope.auth_config)
      .then(function(data) {
        notify({ message:'Berhasil Dirubah', position:'right',duration:'10000',classes: 'alert-success'});
        $location.path('/app/setting/administrator');
      }, function(x) {
        notify({ message:'Server Error',position:'right',duration:'10000',classes: 'alert-danger'});
      });         
    }
}]);

app.controller('DataPenjualan', ['$scope', '$http','$log','$uibModal','notify','$stateParams','$state','$location',
  function ($scope, $http, $log, $modal,notify,$stateParams,$state,$location) {
    $scope.load_sign();
    $scope.hide_report = true;
    $scope.form = {};
    $scope.tahun = {};
    var dt = new Date();
  
    for (var i = dt.getFullYear(); i >= 2020; i--) {
      $scope.tahun[i]=i;
    }

    $scope.bulan = [
    {no : '01' , name : 'January'},
    {no : '02' , name : 'February'},
    {no : '03' , name : 'March'},
    {no : '04', name : 'April'},
    {no : '05' , name : 'May'},
    {no : '06' , name : 'June'},
    {no : '07' , name : 'July'},
    {no : '08' , name : 'August'},
    {no : '09' , name : 'September'},
    {no : '10' , name : 'October'},
    {no : '11' , name : 'November'},
    {no : '12' , name : 'December'}
  ];

  $scope.form={
    much : '10',    
    order : 'desc',
    search : '',
    field_search: 'tb_user.nama'
  };

  $scope.filter = function(paging = '') {  
    if ( paging  == '') {
      $scope.currentPage = 1;
    }
    
    $scope.maxSize = 20;
    $http.post(baseurl+'admin/penjualan/data?page='+$scope.currentPage,$scope.form,$scope.auth_config)
    .then(function(data) {
      $scope.price=data.data
      $scope.hide_report = false;
      $scope.datass=$scope.price.user.data
      $scope.totalItems = $scope.price.user.total;
    }, function(x) {
      notify({ message:'Server Error', 
        position:'right',
        duration:'10000',
        classes: 'alert-danger'
      });
    });
    $scope.itemsPerPage = $scope.form.much;
  }

    $scope.currentPage = 1;

    $scope.selectPage = function (pageNo) {
      $scope.currentPage = pageNo;
      $scope.filter(pageNo);

    };

    $scope.pageChanged = function() {
      $scope.currentPage = $scope.currentPage;
      $scope.filter($scope.currentPage);

    };

    $scope.search = function () {
      $scope.filter($scope.currentPage, $scope.search_name);
    }
}]);

app.controller('GrafikPenjualan', ['$scope', '$http','$log','$uibModal','notify','$stateParams','$state','$location',
  function ($scope, $http, $log, $modal,notify,$stateParams,$state,$location) {
  $scope.tahun = {};
  $scope.form = {};
  
  var dt = new Date();
    for (var i = dt.getFullYear(); i >= 2020; i--) {
      $scope.tahun[i]=i;
  }

  $scope.filter_grafik = function () {
     $http.post(baseurl+'admin/grafik',$scope.form,$scope.auth_config).then(function(data) {
      $scope.datass = data.data;
      $scope.datass.labels = ['Januari', 
          'Februari',
          'Maret',
          'April',
          'Mei',
          'Juni',
          'Juli',
          'Augustus',
          'September',
          'October',
          'November',
          'Desember'
          ];
      $scope.datass.dataset = [$scope.datass.dataset.Januari, 
          $scope.datass.dataset.Februari,
          $scope.datass.dataset.Maret,
          $scope.datass.dataset.April,
          $scope.datass.dataset.Mei,
          $scope.datass.dataset.Juni,
          $scope.datass.dataset.Juli,
          $scope.datass.dataset.Augustus,
          $scope.datass.dataset.September,
          $scope.datass.dataset.October,
          $scope.datass.dataset.November,
          $scope.datass.dataset.Desember
          ];

      var ctx = document.getElementById('userChart').getContext('2d');
      
      var chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels:  $scope.datass.labels,
          datasets: [
          {
            label: 'Total Transaksi',
            backgroundColor: '#59c2e6',
            data:  $scope.datass.dataset,
          },
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                callback: function(value) {if (value % 1 === 0) {return value;}}
              },
              scaleLabel: {
                display: false
              }
            }]
          },
          legend: {
            labels: {
              fontColor: '#122C4B',
              fontFamily: "'Muli', sans-serif",
              padding: 25,
              boxWidth: 25,
              fontSize: 14,
            }
          },
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 0,
              bottom: 10
            }
          }
        }
      });
    }, function(x) {
      notify({ message:'Server Error',position:'right',duration:'10000',classes: 'alert-danger'});
    });
  };

  

}]);

