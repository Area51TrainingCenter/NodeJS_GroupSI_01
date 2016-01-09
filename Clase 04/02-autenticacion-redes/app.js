var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var credenciales = require("./credenciales");

var passport = require("passport");
var passportFacebook = require("passport-facebook").Strategy;
var passportGoogle = require('passport-google-oauth2').Strategy;

var cookieSession = require("cookie-session");
var modelo = require("./modelos/modeloUsuarios");

var routes = require('./routes/index');

var app = express();

passport.serializeUser(function(usuario, done) {
  done(null, usuario);
});
 
passport.deserializeUser(function(usuario, done) {
    done(null, usuario);
});

passport.use(new passportFacebook({
  clientID      : credenciales.facebook.claveCliente,
  clientSecret  : credenciales.facebook.claveServidor,
  callbackURL  : credenciales.facebook.urlCallback,
  profileFields : ['id', 'displayName','photos']
}, function(accessToken, refreshToken, profile, done) {

  modelo.validar(profile.id, function(err, registros){
    if(err) {return done(err);}

    if(registros.length==0) {
      var obj = {};
      obj.id = profile.id;
      obj.proveedor = profile.provider;
      obj.name = profile.displayName;
      obj.photo = profile.photos[0].value;

      modelo.insertar(obj, function(err){
        if(err) return done(null, false);
        return done(null, obj);
      })
    } else {
      return done(null, registros[0]);
    }
  }) 
}));


  passport.use(new passportGoogle({
    clientID      : credenciales.google.claveCliente,
    clientSecret    : credenciales.google.claveServidor,
    callbackURL  : credenciales.google.urlCallback
  }, function(accessToken, refreshToken, profile, done) {
    modelo.validar(profile.id, function(err, registros){
      if(err) {return done(err);}

      if(registros.length==0) {
        var obj = {};
        obj.id = profile.id;
        obj.proveedor = profile.provider;
        obj.name = profile.displayName;
        obj.photo = profile._json.image.url;

        modelo.insertar(obj, function(err){
          if(err) return done(null, false);
          return done(null, obj);
        })
      } else {
        return done(null, registros[0]);
      }
    }) 
  }));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({secret: "123456"}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);


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
