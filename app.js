var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeeRouter = require('./routes/employee');
var skillRouter = require('./routes/skill');
const initDb = require("./models/db").initDb;

initDb(function (err) {
  
      console.log("API Up and running on port ");
  
});

var app = express();

// in app.js (or similar)

const livereload = require("livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {

  console.log("allow access origin")
  res. header("Access-Control-Allow-Origin","*");
  res. header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
  
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employee',employeeRouter);
app.use('/skill',skillRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
console.log("in app");


// error handler
app.use(function(err, req, res, next) {
  console.log("Handle Error")
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log('render error')
  // render the error page
  res.status(err.status || 500);
  res.render('error',err);
});
module.exports = app;
