'use strict';
angular.module('app').controller('AppCtrl', ['$scope', '$http','$rootScope', '$localStorage', '$window', '$location',
    function($scope,$http,$rootScope, $localStorage, $window,$location) {

        var menufold = false; 
        var screenWidth = window.innerWidth;
        if (screenWidth < 767){
            var menufold = true; 
        }

        $scope.app = {            
            name: 'Sssssslant Admin - Angular | CRM',
            version: '4.0.1',
            type: 'crm',
            color: {
                primary: '#f17e56',
                accent: '#695f56',
                info: '#26C6DA',
                success: '#46be8a',
                warning: '#fdb45d',
                danger: '#F44336',
                secondary: '#a9a9a9',
                text: '#767676'
            },
            settings: {
                menuProfile: true,
                menuFolded: menufold,
                chatFolded: true,
                layoutBoxed: false,
                searchFocus: false,
                pagetitle: 'Slant \\ AngularJS',
            }
        }
        $scope.menuChatToggle = function(type, value) {
            if (type == "menu" && !value) {
                $scope.app.settings.chatFolded = true;
            }
            if (type == "chat" && !value) {
                $scope.app.settings.menuFolded = true;
            }
        }

        $scope.base_url = baseurl;
      //check token
      $rootScope.load_sign = function(){
        $rootScope.auth_config = {headers: {
            'Authorization': 'Bearer '+$localStorage.token
            }
        }
        $rootScope.auth_config_photo =  {
            'Authorization': 'Bearer '+$localStorage.token,
            'Content-Type': undefined
        }
        $rootScope.auth_config_multi =  {
            'Authorization': 'Bearer '+$localStorage.token
        }
        //check token ke server
        console.log($scope.auth_config)
          $http.get(baseurl+'api/session',$scope.auth_config).then(function(response){
            if(response.data.success){
                $scope.user = $localStorage.user;
              if($location.url() == '/access/signin'){
                $location.url('/app/dashboard');
              }
            }
          },function (error){
                $location.path('/access/signin');
            });  
        }     
       $scope.load_sign();


       $scope.logout = function(){        
        delete $localStorage.token;
        
        $scope.load_sign();
      }


        $scope.changeMenuHeight = function() {
            //console.log($scope.settings.menuProfile);
            if ($scope.app.settings.menuFolded == true) {
                var navHeight = angular.element("#main-content section.wrapper .content-wrapper").innerHeight() + 90;
            } else {
                var navHeight = $(window).innerHeight() - 60;
            }
            //console.log(navHeight);
            angular.element("#main-menu-wrapper").height(navHeight);
        }
        $scope.$watch('app.settings.menuFolded', function() {
            $scope.changeMenuHeight();
        });
        $scope.$on('$viewContentLoaded', function(next, current) {
            angular.element(document).ready(function() {
                $scope.changeMenuHeight();
            });
        });
        $scope.ElementInView = function(inview, event, addclass, removeclass) {
            var id = event.inViewTarget.id;
            /*console.log(event);  */
            if (inview && id != "") {
                if (addclass != "") {
                    $("#" + id).addClass(addclass);
                } else {
                    $("#" + id).removeClass(removeclass);
                }
            }
            return false;
        }
        $scope.testLines = [];
        for (var i = 20; i >= 0; i--) {
            $scope.testLines.push(i);
        };
        $scope.lineInView = function(index, inview, inviewpart, event) {
            /*console.log(inview+" "+index+" "+inviewpart+" "+event);    */
            /*console.log(event.inViewTarget.id);  */
            return false;
        }
    }
]);