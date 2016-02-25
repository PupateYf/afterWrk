/**
 * @description 用于注册angular组件
 * @author 杨逸峰
 * @version 0.0.2
 * @date 2016-01-06
 */
(function() {
    window.AppConfig = function() {
        var appModuleName = 'ace',
            appModuleVendorDependencies = ['ngAnimate','ngSanitize','mgcrea.ngStrap'],
            registerModule = function(reg) {
                angular.module(reg, []);
                angular.module(appModuleName).requires.push(reg);
                console.log(angular.module('ace').requires);
            };
        return {
            appModuleName: appModuleName,
            appModuleVendorDependencies: appModuleVendorDependencies,
            registerModule: registerModule
        };
    }();

    angular.module('ace', AppConfig.appModuleVendorDependencies);

    // @alias fastclick.js
    angular.module('ace').run(function() {
      FastClick.attach(document.body);
    });
})();
