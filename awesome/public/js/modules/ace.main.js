/**
 * @description angular controller of index
 * @author 杨逸峰
 * @version 0.0.1
 * @date 2016-02-06
 */
AppConfig.registerModule('ace.main');

var aceMain = angular.module('ace.main');

aceMain.controller('mainController', ['$scope', '$rootScope', function ($scope,$rootScope) {
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
}])
