var gulp        = require('gulp'),
	browserSync = require('browser-sync').create(),
	uglify 		= require('gulp-uglify'),
	minifycss 	= require('gulp-minify-css'), 
	rename 		= require('gulp-rename'),
	concat		= require('gulp-concat'),
	clean		= require('gulp-clean');


// 代理

gulp.task('browser-sync', function() {
    browserSync.init({
    	files: "**",
        proxy: "127.0.0.1:3000"
    });
});

gulp.task('default', ["browser-sync"]);

gulp.task('clean', function() {
	gulp.src(['./public/dist'],{read: false})
		.pipe(clean())
});

gulp.task('js', function () {
	var jsSrc = [
					'./public/js/mapTools.js',
					'./public/components/jquery/dist/jquery.min.js',
					'./public/components/jquery.cookie/jquery.cookie.js',
					'./public/components/angular/angular.min.js',
					'./public/components/angular-route/angular-route.min.js',
					'./public/components/angular-animate/angular-animate.min.js',
					'./public/components/angular-sanitize/angular-sanitize.min.js',
					'./public/components/angular-strap/dist/angular-strap.min.js',
					'./public/components/angular-strap/dist/angular-strap.tpl.min.js',
					'./public/components/angular-file-upload/dist/angular-file-upload.min.js',
					'./public/components/fastclick/lib/fastclick.js',
					'./public/components/socket.io.js',
					'./public/js/AppConfig.js', 
					'./public/js/modules/*.js'
				],
		jsDst = './public/dist/';
	gulp.src(jsSrc)
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest(jsDst));
})

gulp.task('css', function () {
	var cssSrc = [
					'./public/components/bootstrap/dist/css/bootstrap.min.css',
					'./public/components/bootstrap-additions/dist/bootstrap-additions.min.css',
					'./public/components/angular-motion/dist/angular-motion.min.css',
					'./public/css/main.css'
				],
		cssDst = './public/dist/';
	gulp.src(cssSrc)
		.pipe(concat('main.css'))
		.pipe(minifycss())
		.pipe(gulp.dest(cssDst));
})




