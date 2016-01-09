var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require("cookie-session");
var bodyParser = require('body-parser');

var modelo = require("./modelos/modeloUsuarios");

var passport = require("passport");
var passportLocal = require("passport-local").Strategy;

var routes = require('./routes/index');

var app = express();

passport.serializeUser(function(usuario, done) {
  done(null, usuario);
});
 
passport.deserializeUser(function(usuario, done) {
    console.log("deserealizacion = " + usuario);

    modelo.detalle(usuario, function(err, datos){
      if(err) {
        done(false, null)
      } else {
        done(null, {nombre: datos[0].nombre})
      }
    })

    //done(null, usuario);
});

passport.use(new passportLocal(
  {
    usernameField: "usuario",
    passwordField: "contrasena"
  },
  function(username, password, done) {
    console.log("Usuario: "+username);
    console.log("Contraseña: "+password);

    modelo.validar(username, password, function(err, datos){
      if(err) {
        return done(false, null)
      };

      if(datos.length) {
        var usuarioId = datos[0].id;
        return done(null, usuarioId);
      } else {
        return done(false, null);
      }

    })


    /*if(username=="sergio" && password=="123456") {
      var datos = {
        id: 123,
        usuario: username
      };

      return done(null, datos);
    } else {
      return done(false, null);
    }*/

    
  }
));



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
