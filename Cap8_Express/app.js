var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var photosRouter = require('./routes/photos')

var app = express();
// view engine setup
//视图设定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('photos',path.join(__dirname),'public/photos')

//中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//路由
app.use('/', photosRouter);
app.use('/users', usersRouter);

//程序级变量
app.locals.play = function(){
  console.log('play')
}

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


app.listen(3000)
module.exports = app;
