var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// 代理

gulp.task('browser-sync', function() {
    browserSync.init({
    	files: "**",
        proxy: "192.168.136.141:3000"
    });
});

gulp.task('default', ["browser-sync"]);