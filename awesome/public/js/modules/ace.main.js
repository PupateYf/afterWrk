/**
 * @description angular controller of index
 * @author 杨逸峰
 * @version 0.0.1
 * @date 2016-02-06
 */
AppConfig.registerModule('ace.main');

var aceMain = angular.module('ace.main');

aceMain.controller('mainController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $rootScope.oNav = {
        homeSelected : false,
        photoSelected : false,
        messageSelected : false,
        userSelected : false
    }

    $rootScope.fnNavSelect = function (str) {
        var obj = $rootScope.oNav;
        switch (str) {
          case 'home':{
              resetNavBar();
              obj.homeSelected = true;
              break;
          }
          case 'photo':{
              resetNavBar();
              obj.photoSelected = true;
              break;
          }
          case 'message':{
              resetNavBar();
              obj.messageSelected = true;
              break;
          }
          case 'user':{
              resetNavBar();
              obj.userSelected = true;
              break;
          }
        }
    }
    function resetNavBar(){
        for(item in $rootScope.oNav){
            $rootScope.oNav[item] = false;
        }
    }
    $scope.load = function () {
      $http({
         url: '/users/checkLogin',
         method: 'POST'
      }).then(function (data) {
         console.log(data);
         var data = data.data;
         $rootScope.USERDATA = data.data;
         switch (data.code) {
           case 1: {
             console.log(data.msg);
             switch (window.location.hash) {
               case '#/index':{
                 $rootScope.oNav.homeSelected = true;
                 break;
               }
               case '#/news':{
                 $rootScope.oNav.photoSelected = true;
                 break;
               }
             }
             break;
           }
           default: {
             console.log(data.msg);
             window.location.hash = '#/loginSignUp';
             break;
           }
         }
      },function(err){
          console.log(err);
      })
    }
}])
