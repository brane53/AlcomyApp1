"use strict";
var path = require('path');
var staticdir = process.env.NODE_ENV === 'production' ? 'dist.prod' : 'dist.dev';

module.exports = function(app) {
	app.get('*', function(req, res) {
		console.log('STATIC DIR: ' + staticdir);
		res.sendFile(path.join(__dirname, '../', staticdir, 'index.html'));
	});
};