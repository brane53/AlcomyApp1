module.exports = function (config) {
  config.set({

    basePath: '../',

    files: [
	    'node_modules/angular/angular.js',
	    'node_modules/@angular/router/angular1/angular_1_router.js',
	    'node_modules/angular-animate/angular-animate.js',
	    'node_modules/angular-aria/angular-aria.js',
	    'node_modules/angular-messages/angular-messages.js',
	    'node_modules/angular-mocks/angular-mocks.js',
	    'node_modules/angular-material/angular-material.js',
	
	    '../app/alcomyApp.module.js',
	    '../app/alcomyApp.config.js',
	    '../app/alcomyApp.component.js',
	    'app/components/residents/residents.module.js',
	    '../app/components/residents/shared/residents.service.js',
	    'app/components/residents/residents.component.js',
	
	    'test/unit/app/**/*.js'
    ],

    logLevel: config.LOG_ERROR,
    port: 9876,
    reporters: ['progress'],
    colors: true,

	  // For TDD mode
    autoWatch : true,
    singleRun : false,

    // For Non TDD mode
    //autoWatch : false,
    //singleRun : true,

    frameworks: ['jasmine'],
    browsers: [
	    'Chrome'
	    //'Firefox',
	    //'IE'

    ],

    plugins: [
      'karma-chrome-launcher',
	    //'karma-firefox-launcher',
	    //'karma-ie-launcher',
      'karma-jasmine'
    ]

  });
};
