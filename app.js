var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
passport.use(new LocalStrategy(
  function(username, password, done) {
   Account.findOne({ username: username }, function (err, user) {
     if (err) { return done(err); }
     if (!user) {
       return done(null, false, { message: 'Incorrect username.' });
     }
     if (!user.validPassword(password)) {
       return done(null, false, { message: 'Incorrect password.' });
     }
     return done(null, user);
   });
  }));

var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

require('dotenv').config();
const connectionString =
process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,{useNewUrlParser: true,useUnifiedTopology: true});


var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var elephantRouter = require('./routes/elephant');
var gridbuildRouter = require('./routes/gridbuild');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');
var elephant = require("./models/elephant");

var app = express();

async function recreateDB(){
  // Delete everything
  await elephant.deleteMany();
  let instance1 = new
  elephant({elephant_color:"gray",elephant_breed:"african bush elephant",elephant_price:1290});
  let instance2 = new
  elephant({elephant_color:"brown",elephant_breed:"boreno elephant",elephant_price:2500});
  let instance3 = new
  elephant({elephant_color:"white",elephant_breed:"sumatran elephant",elephant_price:3290});
  instance1.save( function(err,doc) {
    if(err) return console.error(err);
    console.log("First object saved")
    });
  instance2.save( function(err,doc) {
      if(err) return console.error(err);
      console.log("second object saved")
      });
  instance3.save( function(err,doc) {
        if(err) return console.error(err);
        console.log("third object saved")
        });
  }
  let reseed = true;
  if (reseed) { recreateDB();}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/elephant', elephantRouter);
app.use('/gridbuild', gridbuildRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);

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
