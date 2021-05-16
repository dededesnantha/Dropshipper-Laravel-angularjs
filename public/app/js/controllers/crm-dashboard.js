
'use strict';

    app.controller('Dashboard', ['$scope', '$http','$log','$uibModal','notify','$rootScope','$location',
    function ($scope, $http, $log, $modal,notify,$rootScope,$location) {
        $scope.load_sign();

        $scope.folds = [
        {name: 'Pembayaran', filter:'', icon:'fa-money', badge:'warning', count: ''},
        {name: 'Pesanan Diproses', filter:'order', icon:'fa-shopping-cart', badge: '', count: ''},
        {name: 'Pesanan Dikirim', filter:'dikirim', icon:'fa-truck', badge: '', count: ''},
        {name: 'Pesanan Diterima', filter:'diterima', icon:'fa-check-square-o', badge:'success', count: ''}
        ];

        if($location.url() == '/app/dashboard'){
          $location.url('/app/dashboard/');
        }

        $scope.count_transaksis = {};
        $rootScope.count_transaksi = function () {
            $http.get(baseurl+'admin/count_transaksi',$scope.auth_config).then(function(data) {
              $scope.count_transaksis = data.data
              angular.forEach($scope.folds, function (values, key) {
                if (values['name'] == 'Pembayaran') {
                    values['count'] = String($scope.count_transaksis.pembayaran);
                }else if (values['name'] == 'Pesanan Diproses') {
                    values['count'] = String($scope.count_transaksis.order);
                }else if(values['name'] == 'Pesanan Dikirim'){
                  values['count'] = String($scope.count_transaksis.dikirim);
                }else if(values['name'] == 'Pesanan Diterima'){
                  values['count'] = String($scope.count_transaksis.diterima);
                }
              });
          }, function(x) {
          });
        }
        $rootScope.count_transaksi();
    }]);

    app.controller('TransaksiCtrl', ['$scope', '$http','$log','$uibModal','notify','$stateParams',
    function ($scope, $http, $log, $modal,notify, $stateParams) {
        $scope.form = {};
        $scope.fold = $stateParams.fold;
        if ($scope.fold == '') {
            $scope.fold = 'pembayaran'   
        }

        $scope.form={
          much : '10',    
          order : 'desc',
          search : '',
          field_search: 'tb_user.nama'
        };

        $scope.init = function (paging = '') {
          if ( paging  == '') {
            $scope.currentPage = 1;
          }
            $scope.maxSize = 20;
            $http.post(baseurl+'admin/'+$scope.fold+'?page='+$scope.currentPage,$scope.form,$scope.auth_config)
            .then(function(data) {
              $scope.list=data.data
              $scope.datass=$scope.list.data
              $scope.totalItems = $scope.list.total;
              $scope.count_transaksi();
            }, function(x) {
              notify({ message:'Server Error', 
                position:'right',
                duration:'10000',
                classes: 'alert-danger'
              });
            });

            $scope.itemsPerPage = $scope.form.much;
        }

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

        $scope.show = function (id) {
          var modalInstance = $modal.open({
            templateUrl: 'partials/modal/modal_transaksi.html',
            controller: 'ModalTransaksi',
            windowClass: 'app-modal-window',
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
        }
    }]);

app.controller('ModalTransaksi', ['$scope','$uibModalInstance','items','$http','$location','notify','$uibModal', function($scope, $modalInstance, items,$http,$location,notify,$modal) { 
   $scope.form ={};
    // // get revisi
    $http.get(baseurl+'admin/get_transaksi/'+items,$scope.auth_config).then(function(data) {
              $scope.form = data.data;
              $scope.form.data_transaksi.image_transfer = baseurl +'transaksi/'+$scope.form.data_transaksi.image_transfer;
              angular.forEach($scope.form.data_transaksi_detail, function (values, key) {
                values['gambar'] = baseurl +'image/'+values['gambar'];
              });
      }, function(x) {
    });

    $scope.update_status = function () {
      $scope.datass = {};
      $scope.datass.status_transaksi = $scope.form.data_transaksi.status_transaksi
      $http.post(baseurl+'admin/update_transaksi/'+items,$scope.datass,$scope.auth_config).then(function(data) {
        notify({ message:'Update Berhasil', position:'right', duration:'10000', classes: 'alert-success' }); 
      }, function(x) {
        notify({ message:'Update Gagal', position:'right', duration:'10000', classes: 'alert-danger' }); 
      });

      $modalInstance.close($scope.items);
    }
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);