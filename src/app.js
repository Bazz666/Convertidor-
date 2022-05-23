'use strict';

// var createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
// settings
app.set('port', (process.env.PORT || 3000));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Body Parcer
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// Logger middleware
const logger = require('morgan');
app.use(logger('dev'));

//routes
app.use(require("./routes"));
// static files
app.use(express.static(path.join(__dirname, "public")));
// module.exports = app;
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});

// app.listen(process.env.PORT || 8080);