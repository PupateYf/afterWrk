AppConfig.registerModule('ace.createActive');
var aceCreateActive = angular.module('ace.createActive');
aceCreateActive.controller('activeController', ['$scope', 'FileUploader', function($scope, FileUploader) {

  var uploader = $scope.uploader = new FileUploader({
      url: '/upload'
  });

  var rawActiveData = $scope.rawActiveData = {
      imgName: "",
      kind: "",//number
      topic: "",//str
      date: "",
      time: "",// 用于与date一起生成时间戳
      locationXY: "",//地点经纬度
      gender: "",//number
      count: "",
      profile: "",
      contacts: {
          name: "",
          phone: "",
      },
      cost: {
          fee: "",
          useWay: ""
      }
  }
  var activeUIData = $scope.activeUIData = {
      imgName: "",
      kind: "",//number
      topic: "",//str
      date: "",
      time: "",// 用于与date一起生成时间戳
      location: "",
      gender: "",//number
      count: "",
      profile: "",
      contacts: {
          name: "",
          phone: "",
      },
      cost: {
          fee: "",
          useWay: ""
      }
  }
  var finalActiveData = $scope.finalActiveData = {
      imgName: "",
      kind: "",//number ［“聚餐”, "运动", "聚会", "学习"］
      topic: "",//str
      date: "",
      time: "",// 用于与date一起生成时间戳
      location: "",
      gender: "",//number
      count: "",
      profile: "",
      contacts: {
          name: "",
          phone: "",
      },
      cost: {
          fee: "",
          useWay: ""
      }
  }
  $scope.formatImgName = function () {
    return new Date().getTime();
  }
  $scope.active_selectKind = function (type) {
      $scope.rawActiveData.kind = type;
      $scope.activeUIData.kind = type;
  }
  $scope.active_selectGender = function (type) {
      $scope.rawActiveData.gender = type;
      $scope.activeUIData.gender = type;
  }
  $scope.isOk = 0;
  $scope.fnSubimt = function () {
    // 图片上传

    // 数据提交

    // 通过共同变量isOk=2时 代表返回成功；
  }


































  uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
  uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      console.info('onWhenAddingFileFailed', item, filter, options);
  };
  uploader.onAfterAddingFile = function(fileItem) {
      if(uploader.queue.length > 1){
        uploader.queue.shift(0);
      }

      console.info('onAfterAddingFile', fileItem);
      console.log(uploader.queue[0].file.name);
      $scope.finalActiveData.imgName = $scope.formatImgName();
      console.log($scope.finalActiveData.imgName);
      uploader.queue[0].file.name = $scope.finalActiveData.imgName;
      console.log(uploader.queue[0].file.name);
  };
  uploader.onAfterAddingAll = function(addedFileItems) {
      console.info('onAfterAddingAll', addedFileItems);
  };
  uploader.onBeforeUploadItem = function(item) {
      console.info('onBeforeUploadItem', item);
  };
  uploader.onProgressItem = function(fileItem, progress) {
      console.info('onProgressItem', fileItem, progress);
  };
  uploader.onProgressAll = function(progress) {
      console.info('onProgressAll', progress);
  };
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
      console.info('onSuccessItem', fileItem, response, status, headers);
  };
  uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
  };
  uploader.onCancelItem = function(fileItem, response, status, headers) {
      console.info('onCancelItem', fileItem, response, status, headers);
  };
  uploader.onCompleteItem = function(fileItem, response, status, headers) {
      console.info('onCompleteItem', fileItem, response, status, headers);
  };
  uploader.onCompleteAll = function() {
      console.info('onCompleteAll');
  };
  console.info('uploader', uploader);
}]);

aceCreateActive.directive('ngPicupload', ['$window', function($window) {
  var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngPicupload);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var clientWidth = document.documentElement.clientWidth;
                    var holderHeight = document.getElementById('add-img').offsetHeight;
                    //
                    var proportion = this.height / holderHeight;
                    var targetWidth = this.width / proportion;
                    //
                    var startX = (clientWidth - targetWidth) / 2 * proportion;
                    var ctxRawWidth = clientWidth * proportion;
                    var ctxRawHeight = this.height;
                    //
                    canvas.attr({ width: ctxRawWidth, height: ctxRawHeight });
                    var ctx2D = canvas[0].getContext('2d');
                    ctx2D.fillStyle = '#fff';
                    ctx2D.fillRect(0, 0, ctxRawWidth, ctxRawHeight);
                    ctx2D.drawImage(this, startX, 0, this.width, this.height);

                    $(canvas[0]).css({
                        width : clientWidth,
                        height : holderHeight
                    })
                }
            }
        };
}]);
aceCreateActive.directive('ngDateChange', function(){
  return {
    link : function (s, ele, attrs) {
        ele.bind('change', function (e) {
          //get user pick date
          console.log('DateChange');
          // Date日期转毫秒数
          // time转毫秒数
          // 获得时区 －480
          var date = new Date(s.rawActiveData.date);// Date日期
          var tmpDate = date.toString().split(' ');//["Sat", "Mar", "05", "2016", "15:15:47", "GMT+0800", "(CST)"]
          var tmp = [tmpDate[3], tmpDate[1], tmpDate[2]];
          s.activeUIData.date = tmp.join(' ');
          s.$apply();
        })
    }
  }
})
aceCreateActive.directive('ngTimeChange', function(){
return {
    link : function (s, ele, attrs) {
        ele.bind('change', function (e) {
          console.log('TimeChange');
          var time = new Date(s.rawActiveData.time);// Time时间
          console.log(s.rawActiveData.time)
          var tmp = (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()) + ' : ' + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes());
          console.log('tmp is : ',tmp);
          s.activeUIData.time = tmp;
          s.$apply();
        })
    }
  }
})
