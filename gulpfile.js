var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    typescript = require('gulp-typescript'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    imageResize = require('gulp-image-resize'),
    autoprefixer = require('gulp-autoprefixer'),
		svgstore = require('gulp-svgstore'),
		svgmin = require('gulp-svgmin'),
		es = require('event-stream'),
		sourcemaps = require('gulp-sourcemaps'),
		htmlhint = require('gulp-htmlhint'),
		htmlmin = require('gulp-htmlmin'),
		ngHtml2js = require('gulp-ng-html2js'),
		inject = require('gulp-inject'),
		order = require('gulp-order'),
		print = require('gulp-print'),
		rename = require('gulp-rename'),
		regRename = require('gulp-regex-rename'),
		path = require('path'),
		angularFilesort = require('gulp-angular-filesort'),
		nodemon = require('gulp-nodemon'),
		del = require('del'),
		Q = require('q');

/*CONFIGURATION*/
var config = {
	venderScripts: [
		'node_modules/angular/angular.js',
		'node_modules/@angular/router/angular1/angular_1_router.js',
		'node_modules/angular-animate/angular-animate.js',
		'node_modules/angular-aria/angular-aria.js',
		'node_modules/angular-messages/angular-messages.js',
		'node_modules/angular-material/angular-material.js',
		//'node_modules/firebase/lib/firebase-web.js',
		'node_modules/ng-idle/angular-idle.js',
		'node_modules/angularfire/dist/angularfire.js',
	  'node_modules/angular-filter/dist/angular-filter.js'
	],
	appScripts: [
		// Main Module
		'alcomyApp.module.js',
		'alcomyApp.config.js',
		// App Configuration Files
		'shared/config/firebaseRoot.js',
		'shared/config/uiConfig.js',
		// HTML Partials in JS
		'partials.js',
		// AlcomyApp Component
		'alcomyApp.component.js',
	  
	  // Security
	  'shared/security/security.module.js',
		//'shared/security/authentication.service.js',
	  'components/login/login.module.js',
	  'components/login/login.component.js',
	  'shared/security/logout.js',
	  // Main Toolbar
	  'components/shared/main-toolbar/main-toolbar.module.js',
	  'components/shared/main-toolbar/main-toolbar.component.js',
		// Vertical-Toolbar
		'components/shared/vertical-toolbar/vertical-toolbar.module.js',
		'components/shared/vertical-toolbar/vertical-toolbar.component.js',
		// User
	  'components/user/user.module.js',
	  'components/user/user.service.js',
		// Company
		'components/company/company.module.js',
		'components/company/company.service.js',
		// Account
		'components/account/account.module.js',
		'components/account/account.service.js',
		'components/account/account.component.js',
		// Home
		'components/home/home.module.js',
	  'components/home/home.component.js',
		// Dashboard
		'components/dashboard/dashboard.module.js',
		'components/dashboard/dashboard.component.js',
		// Tasks
		'components/dashboard/tasks/tasks.module.js',
		'components/dashboard/tasks/tasks.component.js',
		// Residents
		'components/residents/shared/residents-mock.js',
		'components/residents/residents.module.js',
		'components/residents/shared/residents.service.js',
		'components/residents/residents.component.js',
		// Resident-List
		'components/residents/resident-list/resident-list.component.js'
	],
	scssMain: './app/app.scss',
	scripts: 'app/**/*.js',
	styles: ['app/**/*.css', 'app/**/*.scss'],
	images: './app/assets/images/**/*',
	svgs: './app/assets/svg/*.svg',
	svgSprite: './app/assets/svg/icons.svg',
	svgAppDir: './app/assets/svg',
	index: 'index.html',
	partials: 'app/**/*.html',
	distDev: 'dist.dev',
	distProd: 'dist.prod',
	deleteDev: 'dist.dev/**',
	deleteProd: 'dist.prod/**',
	deleteSvgSprite: './app/assets/svg/icons.svg',
	distScriptsProd: 'dist.prod/scripts',
	scriptsDevServer: 'devServer/**/*.js'
};

// == PIPE SEGMENTS ========

var pipes = {};

pipes.orderedVendorScripts = function() {
	return order(config.venderScripts);
};

pipes.orderedAppScripts = function() {
	//return gulp.src(config.appScripts)
	return order(config.appScripts);
	//return angularFilesort();
};

pipes.minifiedFileName = function() {
	return rename(function (path) {
		path.extname = '.min' + path.extname;
	});
};

pipes.validatedAppScripts = function() {
	//return gulp.src(config.appScripts)
	return gulp.src(config.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
};

// BUILD APP SCRIPTS FOR __DEVELOPMENT__
pipes.buildAppScriptsDev = function() {
	/*return pipes.validatedAppScripts()
		pipe(pipes.orderedAppScripts())
		.pipe(concat('app.js'))
		.pipe(gulp.dest(config.distDev));*/

	var scriptedPartials = pipes.scriptedPartials();
	var validatedAppScripts = pipes.validatedAppScripts();

	return es.merge(scriptedPartials, validatedAppScripts)
		.pipe(pipes.orderedAppScripts())
		.pipe(concat('app.js'))
		.pipe(gulp.dest(config.distDev + '/scripts'));

};

// BUILD APP SCRIPTS **PRODUCTION**
pipes.buildAppScriptsProd = function() {
	var scriptedPartials = pipes.scriptedPartials();
	var validatedAppScripts = pipes.validatedAppScripts();

	return es.merge(scriptedPartials, validatedAppScripts)
		.pipe(pipes.orderedAppScripts())
		.pipe(sourcemaps.init())
			.pipe(concat('app.min.js'))
			.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.distScriptsProd));
};

// BUILD VENDER SCRIPTS __DEVELOPMENT__
pipes.buildVendorScriptsDev = function() {
	return gulp.src(config.venderScripts)
		.pipe(gulp.dest(config.distDev + '/vender'));
};

// BUILD VENDER SCRIPTS **PRODUCTION**
pipes.buildVendorScriptsProd = function() {
	return gulp.src(config.venderScripts)
		//.pipe(concat('vendor.min.js'))
		//.pipe(uglify())
		.pipe(gulp.dest(config.distScriptsProd));
};

// VALIDATE THE SCRIPTS ON THE DEVELOPMENT SERVER
pipes.validatedDevServerScripts = function() {
	return gulp.src(config.scriptsDevServer)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
};

pipes.validatedPartials = function() {
	return gulp.src(config.partials)
		.pipe(htmlhint({'doctype-first': false}))
		.pipe(htmlhint.reporter());
};

// BUILD HTML PARTIALS FOR __DEVELOPMENT__ **NOT USED**
pipes.buildPartialsDev = function() {
	// return pipes.scriptedPartials()
	return pipes.validatedPartials()
		.pipe(gulp.dest(config.distDev));

};

/*SCRIPTED PARTIALS*/
pipes.scriptedPartials = function() {
	return pipes.validatedPartials()
		.pipe(htmlhint.failReporter())
		.pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
		.pipe(ngHtml2js({
			moduleName: "alcomyApp",
			declareModule: false,
			prefix: './app/'
		}))
		.pipe(concat('partials.js'));
};

// BUILDS THE STYLES FOR __DEVELOPMENT__
pipes.buildStylesDev = function() {
	return gulp.src(config.scssMain)
		.pipe(sass())
		.pipe(gulp.dest(config.distDev));
};


/*
	BUILDS THE STYLES FOR **PRODUCTION**
	Takes the main scss file (./app/app.scss) that contains all the imports,
	compiles it to css, minifies it, creates an inline sourcemap, and
	puts it in the dist.dev folder
*/
pipes.buildStylesProd = function() {
	return gulp.src(config.scssMain)
		.pipe(sourcemaps.init())
			.pipe(sass())
			.pipe(minifyCss())
		.pipe(sourcemaps.write())
		.pipe(pipes.minifiedFileName())
		.pipe(gulp.dest(config.distProd));
};

/*CREATE SVG SPRITE FROM SVG FILES*/
pipes.buildSvgSprite = function(){
	return gulp.src(config.svgs)
		.pipe(regRename(/ic_(.+)_black_24px/, '$1'))
		.pipe(regRename(/_/g, '-'))
		.pipe(svgstore())
		//.pipe(svgmin())
		.pipe(rename('icons.svg'))
		.pipe(gulp.dest(config.svgAppDir));
};

// PROCESS SVGS FOR __DEVELOPMENT__
pipes.processSvgsDev = function(){
	return gulp.src(config.svgSprite)
		.pipe(gulp.dest(config.distDev + '/app/assets/svg/'))
};

// PROCESS SVGS FOR **PRODUCTION**
pipes.processSvgsProd = function(){
	return gulp.src(config.svgSprite)
		.pipe(gulp.dest(config.distProd + '/app/assets/svg/'))
};

// PROCESS IMAGES FOR __DEVELOPMENT__
pipes.processedImagesDev = function() {
	return gulp.src(config.images)
		.pipe(gulp.dest(config.distDev + '/assets/images/'));
};

// PROCESS IMAGES FOR **PRODUCTION**
pipes.processedImagesProd = function() {
	return gulp.src(config.images)
		.pipe(gulp.dest(config.distProd + '/assets/images/'));
};

pipes.validatedIndex = function() {
	return gulp.src(config.index)
		.pipe(htmlhint())
		.pipe(htmlhint.reporter());
};

// BUILD INDEX FOR __DEVELOPMENT__
pipes.buildIndexDev = function() {

	/*var orderedVendorScripts = pipes.buildVendorScriptsDev();
	var orderedAppScripts = pipes.buildAppScriptsDev();
	var appStyles = pipes.buildStylesDev();*/

	var vendorScripts = pipes.buildVendorScriptsDev();
	var appScripts = pipes.buildAppScriptsDev();
	var appStyles = pipes.buildStylesDev();

	return pipes.validatedIndex()
		.pipe(gulp.dest(config.distDev)) // write first to get relative path for inject
		.pipe(inject(vendorScripts, {relative: true, name: 'vender'}))
		.pipe(inject(appScripts, {relative: true}))
		.pipe(inject(appStyles, {relative: true}))
		.pipe(gulp.dest(config.distDev));
};

// BUILD INDEX FOR PRODUCTION
// TODO: Uncomment html minification
pipes.buildIndexProd = function() {

	var vendorScripts = pipes.buildVendorScriptsProd();
	var appScripts = pipes.buildAppScriptsProd();
	var appStyles = pipes.buildStylesProd();

	return pipes.validatedIndex()
		.pipe(gulp.dest(config.distProd)) // write first to get relative path for inject
		.pipe(inject(vendorScripts, {relative: true, name: 'vender'}))
		.pipe(inject(appScripts, {relative: true}))
		.pipe(inject(appStyles, {relative: true}))
		//.pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
		.pipe(gulp.dest(config.distProd));
};

// BUILD __DEVELOPMENT__ APP
pipes.buildAppDev = function() {
	return es.merge(pipes.buildIndexDev(), /*pipes.buildPartialsDev(),*/ pipes.processedImagesDev(), pipes.processSvgsDev());
};

// BUILD **PRODUCTION** APP
pipes.buildAppProd = function() {
	return es.merge(pipes.buildIndexProd(), pipes.processedImagesProd(), pipes.processSvgsProd());
};


// == TASKS ========

// removes all compiled dev files
gulp.task('clean-dev', function() {
	return del([config.deleteDev]).then(function(paths) {
		if (paths && paths != '') {
			console.log('[gulp][clean] Deleted files/folders:\n', paths.join('\n'));
		}
	});
});

// removes all compiled production files
gulp.task('clean-prod', function() {
	return del([config.deleteProd]).then(function(paths) {
		if (paths && paths != '') {
			console.log('[gulp][clean] Deleted files/folders:\n', paths.join('\n'));
		}
	});
});

gulp.task('clean-svg-sprite', function(){
	return del([config.deleteSvgSprite]).then(function(paths){
		if (paths && paths != '') {
			console.log('[gulp][clean] Deleted SVG sprite: ', paths.join('\n'));
		}else {
			console.log('No sprite to delete')
		}
	});
});

// checks html source files for syntax errors
gulp.task('validate-partials', pipes.validatedPartials);

// checks index.html for syntax errors
gulp.task('validate-index', pipes.validatedIndex);

// moves html source files into the dev environment
gulp.task('build-partials-dev', pipes.buildPartialsDev);

// converts partials to javascript using html2js
gulp.task('convert-partials-to-js', pipes.scriptedPartials);

// runs jshint on the dev server scripts
gulp.task('validate-devserver-scripts', pipes.validatedDevServerScripts);

// runs jshint on the app scripts
gulp.task('validate-app-scripts', pipes.validatedAppScripts);

// moves app scripts into the dev environment
gulp.task('build-app-scripts-dev', pipes.buildAppScriptsDev);

// concatenates, uglifies, and moves app scripts and partials into the prod environment
gulp.task('build-app-scripts-prod', pipes.buildAppScriptsProd);

// creates an svg sprite from all svg files
gulp.task('build-svg-sprite', ['clean-svg-sprite'], pipes.buildSvgSprite);

// compiles app sass and moves to the dev environment
gulp.task('build-styles-dev', pipes.buildStylesDev);

// compiles and minifies app sass to css and moves to the prod environment
gulp.task('build-styles-prod', pipes.buildStylesProd);

// moves vendor scripts into the dev environment
gulp.task('build-vendor-scripts-dev', pipes.buildVendorScriptsDev);

// concatenates, uglifies, and moves vendor scripts into the prod environment
gulp.task('build-vendor-scripts-prod', pipes.buildVendorScriptsProd);

// validates and injects sources into index.html and moves it to the dev environment
gulp.task('build-index-dev', pipes.buildIndexDev);

// validates and injects sources into index.html, minifies and moves it to the dev environment
gulp.task('build-index-prod', pipes.buildIndexProd);

// builds a complete dev environment
gulp.task('build-app-dev', pipes.buildAppDev);

// builds a complete prod environment
gulp.task('build-app-prod', pipes.buildAppProd);

// cleans and builds a complete dev environment
gulp.task('clean-build-app-dev', ['clean-dev'], pipes.buildAppDev);

// cleans and builds a complete prod environment
gulp.task('clean-build-app-prod', ['clean-prod'], pipes.buildAppProd);

// clean, build, and watch live changes to the dev environment
gulp.task('watch-dev', ['clean-build-app-dev', 'validate-devserver-scripts'], function() {

	// start nodemon to auto-reload the dev server
	nodemon({ script: 'server.js', ext: 'js', watch: ['devServer/'], env: {NODE_ENV : 'development'} })
		.on('change', ['validate-devserver-scripts'])
		.on('restart', function () {
			console.log('[nodemon] restarted dev server');
		});

	// start live-reload server
	livereload.listen({ start: true });

	// watch index
	gulp.watch(config.index, function() {
		return pipes.buildIndexDev()
			.pipe(livereload());
	});

	// watch app scripts
	gulp.watch(config.scripts, function() {
		return pipes.buildAppScriptsDev()
			.pipe(livereload());
	});

	// watch html partials
	gulp.watch(config.partials, function() {
		return pipes.buildAppScriptsDev() /*pipes.buildPartialsDev()*/
			.pipe(livereload());
	});

	// watch styles
	gulp.watch(config.styles, function() {
		return pipes.buildStylesDev()
			.pipe(livereload());
	});

	// watch svgs
	gulp.watch(config.svgSprite, function(){
		return pipes.processSvgsDev()
			.pipe(livereload());
	})

});

// clean, build, and watch live changes to the prod environment
gulp.task('watch-prod', ['clean-build-app-prod', 'validate-devserver-scripts'], function() {

	// start nodemon to auto-reload the dev server
	nodemon({ script: 'server.js', ext: 'js', watch: ['devServer/'], env: {NODE_ENV : 'production'} })
		.on('change', ['validate-devserver-scripts'])
		.on('restart', function () {
			console.log('[nodemon] restarted dev server');
		});

	// start live-reload server
	livereload.listen({start: true});

	// watch index
	gulp.watch(config.index, function() {
		return pipes.buildIndexProd()
			.pipe(livereload());
	});

	// watch app scripts
	gulp.watch(config.scripts, function() {
		return pipes.buildAppScriptsProd()
			.pipe(livereload());
	});

	// watch hhtml partials
	gulp.watch(config.partials, function() {
		return pipes.buildAppScriptsProd()
			.pipe(livereload());
	});

	// watch styles
	gulp.watch(config.styles, function() {
		return pipes.buildStylesProd()
			.pipe(livereload());
	});
	
	// watch svg sprite partials
	gulp.watch(config.svgSprite, function() {
		return pipes.buildAppScriptsProd()
			.pipe(livereload());
	});

});

// default task builds for prod
gulp.task('default', ['clean-build-app-prod']);





















// Compiles SCSS files to CSS then minifies the assets/css/styles.css to ./production
gulp.task('sass', function () {
    return gulp.src(config.scssMain)
      .pipe(plumber())
      .pipe(sass())
      .pipe(autoprefixer({
          browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'],
          cascade: true
          }))
      .pipe(gulp.dest(config.destDir))
      //.pipe(livereload())
      ;

});

gulp.task('imageResize', function () {
  return gulp.src('assets/images/avatars/*.jpg')
    .pipe(plumber())
    .pipe(imageResize({ 
      width : 50,
      height : 50,
      crop : true,
      upscale : false,
      imageMagick: true
    }))
    .pipe(gulp.dest('production/assets/images/avatars'));
});

gulp.task('refresh', function(){
    livereload.reload();
});

/*gulp.task('watch', function() {
    livereload.listen();
    // watch for CSS changes
    gulp.watch('assets/scss/!*.scss', ['sass']);
    // watch for JS changes
    gulp.watch('app/!**!/!*.js', ['scripts']);
    gulp.watch('index.html', ['refresh', 'imageResize']);
    gulp.watch('app/!**!/!*.html', ['refresh'])


});*/

/*gulp.task('watch', function() {

    gulp.watch('app/!**!/!*.scss', ['css']);
    gulp.watch('app/!**!/!*.js', ['scripts']);
    //gulp.watch('app/!**!/!*.html', ['imageResize']);

});*/


