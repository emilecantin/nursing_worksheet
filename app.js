
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var db = require('./models');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// ROUTING
app.get('/', routes.patientsProfile);
app.get('/api/workday-conf/:id', routes.api.workdayConf.get);

db.sequelize.sync(/* { force: true } */).complete(function(err) {
	if (err) {
		throw err
	} else {
		http.createServer(app).listen(app.get('port'), function(){
			console.log('Express server listening on port ' + app.get('port'))
		});
	}
});

