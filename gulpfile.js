'use strict'

const
	gulp = require('gulp'),
	csso = require('gulp-csso'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	replace = require('gulp-replace'),
	autoprefixer = require('gulp-autoprefixer'),
	build = require('gulp-html-replace')



// ------------------  pre process  -------------------------

// concat css
gulp.task('pre-concat', function(){
	return gulp
			.src('public/css/*.css')
			.pipe(concat('ow.min.css'))
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}))
			.pipe(csso())
			.pipe(gulp.dest('build/public/css'))
})

// replace html
gulp.task('pre-replace', function(){
	return gulp
			.src('html/*.html')
			.pipe(build({
				'css': '../public/css/ow.min.css'
			}))

			// 正式
				.pipe(replace(/(\.\.\/){0,4}public/g, function(){return 'http://cloudliving-img.b0.upaiyun.com/static/Home/ow'}))

			.pipe(gulp.dest('build/html'))
})

// carry other resource
gulp.task('move', function(){
	gulp
		.src('public/images/**')
		.pipe(gulp.dest('build/public/images'))
	gulp
		.src('public/js/**')

		// 正式
			.pipe(replace(/(\.\.\/){0,4}public/g, function(){return 'http://cloudliving-img.b0.upaiyun.com/static/Home/ow'}))
			.pipe(replace('tw.cloudliving.net', 'www.cloudliving.net'))
			
		.pipe(uglify())
		.pipe(gulp.dest('build/public/js'))
	gulp
		.src('public/lib/**')
		.pipe(gulp.dest('build/public/lib'))
	return gulp
		.src('public/media/**')
		.pipe(gulp.dest('build/public/media'))
})

gulp.task('pre', ['pre-concat', 'pre-replace', 'move'])