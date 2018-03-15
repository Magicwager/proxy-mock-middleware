/**
 * Created by Magicwager on 2017/12/1.
 */
var gulp = require('gulp');
var less = require('gulp-less');
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var copy = require('gulp-copy');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var util = require('gulp-util');
var minifycss = require('gulp-minify-css');
var livereload=require('gulp-livereload')
var koa = require('koa');
var app = koa();
var browserify = require('gulp-browserify');
var es2015 = require("babel-preset-es2015");
var stage0 = require("babel-preset-stage-0");
var react=require('gulp-react');
var webpack = require("gulp-webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var server = require('gulp-server-livereload');
var pmm = require('proxy-mock-middleware');

// 编译 src 下所有的 html,js 文件到 dist 目录
gulp.task('copy:src', function () {
    gulp.src([
        'src/**/**/*.html',
        'src/**/**/*.js',
        'src/**/**/*.json',
        'src/**/**/*.png',
        'src/**/**/*.jpg',
        'src/**/**/*.gif',
        'src/**/**/*.ico',
        'src/**/**/*.css',
    ])
        .pipe(rename(function (path) {
            path.dirname += '';//相对src的路径，例如设path.dirname='/test',则输出的路径会在原目录文件的外层包一层test
        }))
        .pipe(gulp.dest("./dist"))
});

// 匹配所有 less文件进行 less 编译
gulp.task('less', function () {
    gulp.src('src/**/*.less')
        .pipe(less())
        .pipe(rename(function (path) {
            path.extname = ".css"
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('less:dist', function () {
    gulp.src(['src/**/*.less'])
        .pipe(less())
        .pipe(minifycss())
        .pipe(rename(function (path) {
            path.extname = ".css"
        }))
        .pipe(gulp.dest('dist'));
    gulp.src(['src/**/*.css'])
        .pipe(minifycss())
        .pipe(gulp.dest('dist'));
});

//es6 to js,开发环境，可以相对友好的跟错误
gulp.task('react-es6-dev',function(){
    gulp.src(['./src/**/*.jsx','./src/**/*.js'])
        //.pipe(browserify({
           // transform:['babelify','reactify']
        //}))//compile JSX (superset of javascript used in react UI library) files to javascript
        .pipe(react({es6module: true}))//这里就是新加入的模块, 解析jsx用
        .pipe(babel({presets:[es2015,stage0],babelrc:true}))//es6tojs的解析器
        .pipe(gulp.dest('dist'))
        .pipe(webpack({
            //babel编译import会转成require，webpack再包装以下代码让代码里支持require
            devtool:'cheap-module-source-map',
            output:{
              filename:"index.js",
            },
            stats:{
              colors:true
            },
            module: {
                rules:[
                    {
                        test: /\.js[x]?$/,
                        exclude: /(node_modules)/,
                        use: [{
                          loader: 'babel-loader'
                        }]
                      },
                    {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                      use: ['css-loader', 'postcss-loader'],
                      fallback: 'style-loader'
                    })
                  }, {
                         test: /\.less$/,
                        use: ExtractTextPlugin.extract({
                          use: ['css-loader', 'postcss-loader', 'less-loader'],
                          fallback: 'style-loader'
                        })

                }]
                
              },
          }))
        .pipe(gulp.dest('./dist/build'))  
});
gulp.task('react-es6',function(){
    gulp.src(['./src/**/*.jsx','./src/**/*.js'])
        //.pipe(browserify({
           // transform:['babelify','reactify']
        //}))//compile JSX (superset of javascript used in react UI library) files to javascript
        .pipe(react({es6module: true}))//这里就是新加入的模块, 解析jsx用
        .pipe(babel({presets:[es2015],babelrc:true}))//es6tojs的解析器
        .pipe(gulp.dest('dist'))
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('./dist/build'))  
});
//监听文件改动，执行相应任务
gulp.task('watch', function () {
    console.log('监听文件改动，执行相应任务');
    gulp.watch('src/**/**/*.less', ['less']);
    gulp.watch(['./src/**/**/*.jsx','./src/**/**/*.js'],['react-es6-dev']);
    gulp.watch([ 'src/**/**/*.html', 'src/**/**/*.js', 'src/**/**/*.css'], [ 'copy:src']);
});

gulp.task('reload', function () {
  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);
});
//清空 dist 目录下的资源
gulp.task('clean', function () {
    console.log('清空 dist 目录下的资源')
    gulp.src('dist/*', {
        read: false
    })//read:false--阻止gulp读取文件，这样会加快任务
        .pipe(clean({
            force: true
        }));
});

//
gulp.task('dev-server', function () {
    pmm.start()
});
gulp.task('before', [ 'copy:src', 'less']);
gulp.task('default', ['before','react-es6-dev','dev-server', 'watch','reload']);
gulp.task('dev',['before','react-es6-dev', 'watch','reload'])
//gulp.task('trans-test', ['translate', 'dev-server','watch']);
