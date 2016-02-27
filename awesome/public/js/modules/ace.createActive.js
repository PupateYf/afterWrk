AppConfig.registerModule('ace.createActive');
var aceCreateActive = angular.module('ace.createActive');
aceCreateActive.controller('activeController', ['$scope', 'FileUploader', function($scope, FileUploader) {

  var uploader = $scope.uploader = new FileUploader({
      url: '/upload'
  });

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
