AppConfig.registerModule('ace.news');

var aceNews = angular.module('ace.news');

aceNews.controller('newsController',['$scope','$http',function($scope, $http) {
	$scope.newsList = [];
	$scope.$on('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
        $scope.fnLoadNews();
    });
    $scope.fnLoadNews = function(){
    	$http({
    		method : 'POST',
    		data : {
    			conditions : {}
    		},
    		url : 'work/getNews'
    	}).then(function(response){
    		if(response.data.code == 1){
    			console.log('getNews call')
    			$scope.newsList = $scope.newsList.concat(response.data.data);
    		}
    	},function(error){
    		console.log(error);
    	})
    }
}])
