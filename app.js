var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var hbs = require('hbs');
var session = require('express-session');

var index = require('./routes/index');
const { exec } = require('child_process');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, 'public')));

// res.locals is an object passed to hbs engine
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.get('/vulnerable', (req, res) => {
 if (req.query.url) {
 	res.redirect(req.query.url);
 } else {
 	res.redirect('https://www.example.com');
 }
 console.log("added as test");
});

app.post('/vulnerable2', (req, res) => {
  // Insecure use of eval() to parse inputs
  var userInput = req.body.userInput;
  eval(userInput); // Vulnerable to SSJS attack
  console.log(userInput); // Vulnerable to SSJS attack

  console.log("added as test");
  // Send a response
  res.send('Code executed successfully');
});

console.log("added as test");

module.exports = app;
