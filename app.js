'use strict';

var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');



// Body Parcer
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// Logger
var logger = require('morgan');
app.use(logger('dev'));
// Coockies/session
var cookieParser = require('cookie-parser');
app.use(cookieParser());


var engines = require('consolidate');
// app.use(express.static(path.join(__dirname, '/views')));

app.engine('html', engines.mustache);
app.set('view engine', 'html');


app.use(express.static('public'));
app.get('/', function(req, res) {
  res.sendFile(__dirname,'/public/index.html');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// export app or start server
// if (!!module.parent){
  //   modele.exports = app;
  // } else {
  //   app.listen(3000);
  // }
  
module.exports = app;
