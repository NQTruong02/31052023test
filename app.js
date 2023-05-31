var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//b4
var studentRouter = require('./routes/student');

var app = express();
//b1
var mongoose = require('mongoose');
//console.log("Mongoose version " + mongoose.version);

var uri = "mongodb+srv://Truong2002:Truong2002@cluster0.y7zoaiw.mongodb.net/"
mongoose.connect(uri)
.then(() => {console.log("connect duoc roi")})
.catch(() => {console.log("loi roi")})
//b2
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/students', studentsRouter);

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
//b3
var Port  = process.env.PORT || process.env.PORT || 5000
app.listen(Port);


module.exports = app;
