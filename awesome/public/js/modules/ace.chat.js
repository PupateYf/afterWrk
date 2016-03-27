AppConfig.registerModule('ace.chat');

var aceActDetail = angular.module('ace.chat');

aceActDetail.controller('aceChatController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {
    //UI
    $scope.item;
    $scope.activeId;
    $rootScope.chatId;
    var userImg = $.cookie('userImg');
    var userName = $.cookie('userName');
    //聊天的内容
    $scope.chatContent = [];//{userid : 13580353945,userName : 'name',userImg : '13580353945.png',msg:'message',kind:'user'};
    						//{fromId : 13580353945,msg:'sever message',kind:'sever'}
    //socket
    var socket;
    $scope.$socket;
    //发送的内容
    $scope.content2Send;

    $scope.$on('startChat',function(e){
    	console.log('startChat catch');
    	fnChatConnect();
    })

    var from = $scope.from = $.cookie('account');
  	function fnInitSocket (){
	  	console.log('init');
  		socket = io.connect(location.host + '/' + $scope.activeId);
		//通知系统账户上线
		$scope.$socket = socket;
		socket.emit('online', {user : from});
		socket.on('online', function(data){
		    if(data.fromId === from) return;
		    else {
		        $scope.chatContent.push(data);
		        $scope.$apply();
		    }
		});
		//监听即时信息
		socket.on('userMsg', function (data) {
			console.log(data);
		    $scope.chatContent.push(data);
		    $scope.$apply();
  		});
    }
    function fnChatConnect(){
        var method = 'GET';
        var url = 'work/chat?activeId='+$scope.activeId;
        // $rootScope.chatId = $scope.activeId
        fnInitSocket();
        $http({
        	method : method,
        	url : url
        }).then(function(response){
        	//成功则调用socket初始化
            console.log(response);
        	if(response.data.code === 1);
        	else return;
        },function(error){
        	console.log(error);
        })
    }

    $scope.sendChat = function () {
    	var msgData = {
    		userid : from,
    		userImg : userImg,
    		userName : userName,
    		msg : $scope.content2Send,
    		kind : 1 //1 means user
    	}
        socket.emit('userMsg',msgData);
        $scope.content2Send = '';
    }
    
}])
