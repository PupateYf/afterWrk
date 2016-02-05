var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// 代理

gulp.task('browser-sync', function() {
    browserSync.init({
    	files: "**",
        proxy: "127.0.0.1:3000"
    });
});

gulp.task('default', ["browser-sync"]);
