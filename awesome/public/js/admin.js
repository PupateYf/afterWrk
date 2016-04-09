var admin = angular.module('admin',['ngRoute']);

admin.config(['$routeProvider',function($routeProvider) {
	$routeProvider
    //首页
	.when('/index', {
			templateUrl : 'js/adminModules/manageActive.html',
			controller : 'manageActiveCtr'
	})
	.when('/login', {
			templateUrl : 'js/adminModules/login.html',
			controller 	: 'loginCtr'
	})
	.when('/manageActive', {
			templateUrl : 'js/adminModules/manageActive.html',
			controller : 'manageActiveCtr'
	})
	.when('/manageUser', {
			templateUrl : 'js/adminModules/manageUser.html',
			controller : 'manageUserCtr'
	})
	.when('/manageSuggest', {
			templateUrl : 'js/adminModules/manageSuggest.html',
			controller : 'manageSuggestCtr'
	})
	.when('/sendNews',{
			templateUrl : 'js/adminModules/sendNews.html',
			controller  : 'sendNewsCtr'
	})
	.when('/manageReport', {
			templateUrl : 'js/adminModules/manageReport.html',
			controller : 'manageReportCtr'
	})
	.otherwise({
        redirectTo: '/'
    });
}]);

//主控制
admin.controller('mainCtr',['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
	$scope.login = false;
	var account = $.cookie('admin');
	var password = $.cookie('adminPsd');
	// var account = 'admin';
	// var password = 'admin';
	var conditions = {
		admin : account,
		adminPsd : password
	}
	$scope.checkLogin = function(){
		if(!account || !password) location.hash = "#/login";
		$http({
			url : '/admin/login',
			method : 'POST',
			data : {conditions : conditions},
		}).then(function(response){
			if(response.data.code == 1){
				$rootScope.login = true;
			} else {
				$rootScope.login = false;
				location.hash = "#/login"
			}
		},function(err){
			console.log(err)
		})
	}
}])
//登陆控制
admin.controller('loginCtr',['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
	$scope.postContent = {
		account : '',
		password : ''
	}
	$scope.fnLogin = function(){
		$http({
			method : 'POST',
			data : {conditions : $scope.postContent},
			url : '/admin/login'
		}).then(function(response){
			if(response.data.code == 1){
				$rootScope.login = true;
				alert('登陆成功');
				location.hash = "#/manageActive"
			} else {
				alert('登陆失败');
				$rootScope.login = false;
				location.hash = "#/login"
			}
		},function(err){
			console.log(err)
		})
	}
}])
admin.controller('sendNewsCtr',['$scope', '$http', function($scope, $http){
	$scope.Cont2Send = {
		content : '',
		title : ''
	};
	$scope.sendNews = function(){
		$http({
			method : 'POST',
			data : $scope.Cont2Send,
			url : '/admin/sendNews'
		}).then(function(response){
			if(response.data.code == 1){
				alert('发布成功')
			}
		},function(error){
			console.log(error)
		})
	}

}])
//活动管理
admin.controller('manageActiveCtr',['$scope', '$http',function($scope, $http){
		$scope.activeList=[];
    $scope.skipNum = 0;
		$scope.$on('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
        $scope.fnLoadActive(0)
    });
		$scope.fnLoadActive = function (skipNum, callback) {
        var data = {
                conditions : {},
                fields : null,
                options : {
                      skip : skipNum,
                      limit : 10
                }
        }
        var method = 'POST';
        var url = '/work/loadActive';
        $http({
            url : url,
            method : method,
            data : data
        }).then(function(response){
            switch (response.data.code) {
                case 1:{
                    //请求成功，处理数据以供展示
										console.log('admin active',response);
                    console.log('ok');
                    $scope.loading = !1;
  									$scope.activeList = $scope.activeList.concat(response.data.data);
  									$scope.skipNum += 10;
                    if(typeof callback == 'function') callback();
                    console.log('activeList', $scope.activeList);
                    break;
                }
                default:{
                    console.log('loadActive error');
                }
            }
        }, function(error){
            console.log(error);
        })
    }
    $scope.remove = function(item, index){
			console.log('index',index);
			if (confirm("是否删除活动")){
		    	var data = {
		    			conditions : {
								'_id' : item['_id']
							}
		    	}
		    	var method = 'POST';
		    	var url = '/admin/removeActive';
		    	$http({
		    		url : url,
		    		method : method,
		    		data : data
		    	}).then(function(response){
							console.log('removeActive return',response);
							if(response.data.code == 1){
									$scope.activeList.splice(index,1);
									alert('删除成功')
							}
		    	},function(error){
							console.log(error);
		    	})
			}else {

			}
    }
		$scope.getMore = function(skipNum){
        $scope.loading = !0;
        $scope.fnLoadActive(skipNum);
    }
}])
admin.controller('manageUserCtr', ['$scope', '$http', function ($scope, $http) {
		$scope.userList = [];
		$scope.skipNum = 0;
		$scope.$on('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
        $scope.fnLoadUser(0)
    });
		$scope.fnLoadUser = function (skipNum, callback) {
        var data = {
                conditions : {},
                fields : null,
                options : {
                      skip : skipNum,
                      limit : 10
                }
        }
        var method = 'POST';
        var url = '/users/loadUser';
        $http({
            url : url,
            method : method,
            data : data
        }).then(function(response){
            switch (response.data.code) {
                case 1:{
                    //请求成功，处理数据以供展示
										console.log('admin user',response);
                    console.log('ok');
                    $scope.loading = !1;
  									$scope.userList = $scope.userList.concat(response.data.data);
  									$scope.skipNum += 10;
                    if(typeof callback == 'function') callback();
                    console.log('userlist', $scope.userList);
                    break;
                }
                default:{
                    console.log('loadActive error');
                }
            }
        }, function(error){
            console.log(error);
        })
    }
    $scope.remove = function(item, index){
			console.log('index',index);
			if (confirm("是否删除用户")){
		    	var data = {
		    			conditions : {
								'_id' : item['_id']
							},
							account : item.account
		    	}
		    	var method = 'POST';
		    	var url = '/users/removeUser';
		    	$http({
		    		url : url,
		    		method : method,
		    		data : data
		    	}).then(function(response){
							console.log('removeUser return',response);
							if(response.data.code == 1){
									$scope.userList.splice(index,1);
									alert('删除成功')
							}
		    	},function(error){
							console.log(error);
		    	})
			}else {

			}
    }
		$scope.getMore = function(skipNum){
        $scope.loading = !0;
        $scope.fnLoadUser(skipNum);
    }
}])
admin.controller('manageSuggestCtr', ['$scope', '$http', function($scope, $http) {
		$scope.suggestList = [];
		$scope.skipNum = 0;
		$scope.$on('$viewContentLoaded', function(){
		//Here your view content is fully loaded !!
				$scope.fnLoadSuggest(0)
		});
		$scope.fnLoadSuggest = function (skipNum, callback) {
				var data = {
								conditions : {},
								fields : null,
								options : {
											skip : skipNum,
											limit : 10
								}
				}
				var method = 'POST';
				var url = '/admin/loadSuggest';
				$http({
						url : url,
						method : method,
						data : data
				}).then(function(response){
						switch (response.data.code) {
								case 1:{
										//请求成功，处理数据以供展示
										console.log('admin suggest',response);
										console.log('ok');
										$scope.loading = !1;
										$scope.suggestList = $scope.suggestList.concat(response.data.data);
										$scope.skipNum += 10;
										if(typeof callback == 'function') callback();
										console.log('suggestList', $scope.suggestList);
										break;
								}
								default:{
										console.log('loadSuggest error');
								}
						}
				}, function(error){
						console.log(error);
				})
		}
		$scope.remove = function(item, index){
			console.log('index',index);
			if (confirm("是否删除反馈信息")){
					var data = {
							conditions : {
								'_id' : item['_id']
							}
					}
					var method = 'POST';
					var url = '/admin/removeSuggest';
					$http({
						url : url,
						method : method,
						data : data
					}).then(function(response){
							console.log('removeSuggest return',response);
							if(response.data.code == 1){
									$scope.userList.splice(index,1);
									alert('删除成功')
							}
					},function(error){
							console.log(error);
					})
			}else {

			}
		}
		$scope.getMore = function(skipNum){
				$scope.loading = !0;
				$scope.fnLoadSuggest(skipNum);
		}
}])
admin.controller('manageReportCtr', ['$scope', '$http', function($scope, $http){
	$scope.reportList = [];
	$scope.skipNum = 0;
	$scope.$on('$viewContentLoaded', function(){
	//Here your view content is fully loaded !!
			$scope.fnLoadReport(0)
	});
	$scope.fnLoadReport = function (skipNum, callback) {
			var data = {
							conditions : {},
							fields : null,
							options : {
										skip : skipNum,
										limit : 10
							}
			}
			var method = 'POST';
			var url = '/admin/loadReport';
			$http({
					url : url,
					method : method,
					data : data
			}).then(function(response){
					switch (response.data.code) {
							case 1:{
									//请求成功，处理数据以供展示
									console.log('admin report',response);
									console.log('ok');
									$scope.loading = !1;
									$scope.reportList = $scope.reportList.concat(response.data.data);
									$scope.skipNum += 10;
									if(typeof callback == 'function') callback();
									console.log('reportList', $scope.reportList);
									break;
							}
							default:{
									console.log('loadReport error');
							}
					}
			}, function(error){
					console.log(error);
			})
	}
	$scope.remove = function(item, index){
		console.log('index',index);
		var tem, tempAccount, tempImgName;
		tem = item.reportActid.split('-');
		tempAccount = tem[0];
		tempImgName = tem[1];
		if (confirm("是否删除活动")){
				var data = {
						conditions2 : {
							'_id' : item['_id'],
						},
						conditions : {
							account : tempAccount,
							imgName : tempImgName
						}
				}
				var method = 'POST';
				var url = '/admin/removeReport';
				$http({
					url : url,
					method : method,
					data : data
				}).then(function(response){
						console.log('removeReport return',response);
						if(response.data.code == 1){
								$scope.reportList.splice(index,1);
								alert('删除成功')
						}
				},function(error){
						console.log(error);
				})
		}else {

		}
	}
	$scope.getMore = function(skipNum){
			$scope.loading = !0;
			$scope.fnLoadReport(skipNum);
	}
}])
