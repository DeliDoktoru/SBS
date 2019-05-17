var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var fs = require("fs");
var indexRouter = require('./routes/index');
var ajaxRouter = require('./routes/ajax');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* #region  error catchers */
process.on('uncaughtException', function (err) {
  fs.appendFile(path.join(__dirname, 'error.log'), err.message + "\n->" + err.stack + "\n", function (error) {
    console.log(error);
  });
  console.log(err.stack);

});
process.on('unhandledRejection', function (err) {
  fs.appendFile(path.join(__dirname, 'error.log'), err.message + "\n->" + err.stack + "\n", function (error) {
    if (error) console.log(error);
  });
  console.log(err.stack);

});
/* #endregion */
/* #region   morgan loger customize*/
//file
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a'
})
app.use(logger(function (tokens, req, res) {
  return [
    (req.session && req.session.user && req.session.user.userName) || "anonymus",
    tokens.method(req, res),
    decodeURIComponent(tokens.url(req, res)),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body),
    req.connection.remoteAddress
  ].join(' ')
}, {
  skip: function (req, res) {
    return req.url.search("public") != -1
  },
  stream: accessLogStream
}));
//console
app.use(logger(function (tokens, req, res) {
  return [
    (req.session && req.session.user && req.session.user.userName) || "anonymus",
    tokens.method(req, res),
    decodeURIComponent(tokens.url(req, res)),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body),
    req.connection.remoteAddress
  ].join(' ')
}, {
  skip: function (req, res) {
    return req.url.search("public") != -1
  },
}));

/* #endregion */
/* #region  session */
app.use(session({
  secret: '3D75D274B997B53CFD2892F69F54BC28',
  resave: false,
  saveUninitialized: true
  //cookie: { secure: true }
}));


/* #endregion */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* #region  dil arakatmanı */
app.use(function (req, res, next) {
  if(req.url.search("public") != -1){
    next();
  }
  const l= require('./selfContent/language');
  res.locals.l= new l((req.session&&req.session.language)||"tr");
  next();
});

/* #endregion */
app.use('/', indexRouter);
app.use('/ajax', ajaxRouter);
app.use('/users', usersRouter);

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

module.exports = app;
