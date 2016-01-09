var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require("cookie-session");

var modelo = require("./modelos/modeloPelicula");

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(usuario, done) {
  //done(null, user.id);
  done(null, usuario);
});
 
passport.deserializeUser(function(usuario, done) {
  //User.findById(id, function(err, user) {
    //done(null, {id: 1, usuario: "sergio", contrasena: "123"});
    done(null, usuario);
  //});
});


passport.use(new LocalStrategy(
  {
    usernameField: "usuario",
    passwordField: "contrasena"
  },
  function(username, password, done) {
    console.log("Usuario: "+username);
    console.log("Contraseña: "+password);
    modelo.validar(username, password, function(err, registros){
      if(err) {return done(err);}

      if(!registros) {
        return done(null, false);
      }
      console.log("ok");
      console.log(registros[0]);
      console.log(done);
      return done(null, registros[0]);
    })    
    /*User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });*/
  //return done(null, false, { message: 'Incorrect password.' });
  //return done(null, false);
  }
));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({secret: "123456"}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
