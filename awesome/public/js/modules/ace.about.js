AppConfig.registerModule('ace.about');

var aceAbout = angular.module('ace.about');
// userImg    : {type : String},
// userName   : {type : String},
// birthday   : {type : Number},
// inersting  : {type : String},
// location   : {type : String},
// description: {type : String},
// gender     : {type : Number},
aceAbout.controller('aboutController',['$scope','$http','$rootScope', function($scope, $http, $rootScope) {
	$scope.aboutContent;
  $scope.bannerBG = {};
  $scope.bannerChange = !1;
  $scope.logoutShow = !1;
  $scope.edit = !1;

	//about UI data
	$scope.aboutEditGender;
	$scope.setEditGender = function(n){
			$scope.aboutEditGender = n;
	}
	$scope.aboutEditUserName ;
	$scope.aboutEditBirthday;
	$scope.aboutUIBirthday;
	$scope.aboutEditDescription;

	$scope.loading = false;



	$scope.$on('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
        console.log('$rootScope.USERDATA',$rootScope.USERDATA)
        $scope.aboutContent = $rootScope.USERDATA;
        $scope.formatData($scope.aboutContent);
        setTimeout(function(){
            $scope.bannerChange = !0;
            $scope.$apply();
        },300);

        // $scope.fnLoadAbout();
  });
  $scope.formatData = function(obj){
			$scope.aboutEditUserName = obj.userName;
			$scope.aboutEditGender = obj.gender;
      switch (obj.gender) {
          case 0: {
              $scope.aboutContent.gender = '未知';
              break;}
          case 1: {
              $scope.aboutContent.gender = '男';
              break;}
          case 2: {
              $scope.aboutContent.gender = '女';
              break;}
      }
      if(!!obj.birthday){
          var time = new Date(obj.birthday);
          $scope.aboutContent.birthday = $scope.aboutEditBirthday = [time.getFullYear(),time.getMonth()+1>10 ? (time.getMonth()+1) : '0' + (time.getMonth()+1),time.getDate()>10 ? time.getDate() : '0' + time.getDate()].join(' / ');
      } else {
          $scope.aboutContent.birthday = $scope.aboutUIBirthday ='未知';
      }
      if(obj.description){}
      else {$scope.aboutContent.description = $scope.aboutEditDescription = '无'}
      $scope.bannerBG = {
          'background' : "url('upload/user/"+obj.userImg+"')"
      }
  }
  $scope.showLogout = function(){
      $scope.logoutShow ? $scope.logoutShow = !1 : $scope.logoutShow = !0;
  }

  $scope.editMode = function(){
      $scope.edit = !0;
  }

  $scope.saveContent = {
      userName : '',
      birthday : '',
      description : '',
      gender : 0
  }

  $scope.save = function() {
			$scope.loading = true;
			$http({
					method : 'POST',
					url : '/users/updateUserDetail',
					data : {
							conditions : {
									account : $.cookie('account')
							},
							set : {
									userName : $scope.aboutEditUserName,
									gender : $scope.aboutEditGender,
									birthday : new Date($scope.aboutEditBirthday).getTime(),
									description : $scope.aboutEditDescription
							}
					}
			}).then(function(response){
					console.log('updateUserDetail',response);
					$scope.loading = false;
					$scope.edit = false;
			},function(error){
					console.log(error);
			})
  }
}])

aceAbout.directive('aboutDateChange', function(){
  return {
    link : function (s, ele, attrs) {
        ele.bind('change', function (e) {
          //get user pick date
          console.log('DateChange');
          // Date日期转毫秒数
          // time转毫秒数
          // 获得时区 －480
          var time = new Date(s.aboutEditBirthday);// Date日期
          var tmp = [time.getFullYear(),time.getMonth()+1>10 ? (time.getMonth()+1) : '0' + (time.getMonth()+1),time.getDate()>10 ? time.getDate() : '0' + time.getDate()].join(' / ');
          s.aboutUIBirthday = tmp;
          s.$apply();
        })
    }
  }
})
