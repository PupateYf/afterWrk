AppConfig.registerModule('ace.activeDetail');

var aceActDetail = angular.module('ace.activeDetail');

aceActDetail.controller('actDetailController', ['$scope', '$http', function ($scope, $http) {
    //UI
    $scope.now = new Date().getTime();
    $scope.item;
    $scope.footerShow = $scope.now < $scope.item.datetime;
    $scope.activeId = parseInt($scope.item.imgName);
    $scope.whetherJoin;
    $scope.reportTip = !1;
    var userImg = $.cookie('userImg');
    for(var j = 0;j < $scope.item.whoIn.length; j++){
        if(userImg == $scope.item.whoIn[j]){
            $scope.whetherJoin = true;
            break
        }
        $scope.whetherJoin = false;
    }


    console.log($scope.item.whoIn);
    //加入群聊
    $scope.fnJoinChat = function(){
        //传递活动id作为唯一socket
        location.href = location.origin + '/chat.html?activeId=' + $scope.activeId;
    }
    $scope.fnJoinActive = function(){
        console.log('joinActive call');
        $scope.item.whoIn.push(userImg);
        requireApi(function(){$scope.whetherJoin=true});
    }
    $scope.fnQuitActive = function(){
        var list = $scope.item.whoIn;
        for(var i = 0;i < list.length;i++){
            if(userImg == list[i]){
                $scope.item.whoIn.splice(i,1);
                break;
            }
        }
        requireApi(function(){$scope.whetherJoin=false});
    }
    function requireApi(callback){
        var conditions = {imgName : $scope.item.imgName},
            set = {whoIn : $scope.item.whoIn},
            method = 'POST',
            url = '/work/joinActive';
        console.log(conditions);
        $http({
            method : method,
            url : url,
            data : {
                conditions : conditions,
                set : set
            }
        }).then(function(response){
            if(response.data.code ==1){
                callback();
            }
        },function(error){
            console.log(error);
        })
    };
    $scope.formatTime = function(time){
        var date = new Date(parseInt(time));
        var str = [date.getFullYear(),date.getMonth(),date.getDate()].join('-')+' '+date.getHours()+':'+ (date.getMinutes()>9 ? date.getMinutes() : '0' + date.getMinutes());
        return str;
    };
    $scope.report = function(){
        $http({
            method : 'POST',
            data : {
                reportActid : [$scope.item.account,$scope.item.imgName].join('-'),
            },
            url : '/work/reportActive'
        }).then(function(response){
            if(response.data.code == 1){
                $scope.reportTip = !0;
                setTimeout(function(){$scope.reportTip = !1;$scope.$apply()},1000);
            }
        },function(error){
            console.log(error);
        })
    }

}])
