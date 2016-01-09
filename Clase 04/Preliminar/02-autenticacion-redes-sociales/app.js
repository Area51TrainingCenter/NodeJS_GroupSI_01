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
  , FacebookStrategy = require('passport-facebook').Strategy
  , TwitterStrategy = require('passport-twitter').Strategy
  , GithubStrategy = require('passport-github2').Strategy
  , GoogleStrategy = require('passport-google-oauth2').Strategy;


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


  passport.use(new FacebookStrategy({
    clientID      : "1683373388547963",
    clientSecret  : "e840259aded568c2b0a80a2a6c319e16",
    callbackURL  : 'http://localhost:5000/auth/facebook/callback',
    profileFields : ['id', 'displayName','photos']
  }, function(accessToken, refreshToken, profile, done) {
    modelo.validar(profile.id, function(err, registros){
      console.log("estado1");
      console.log(err);
      console.log(registros.length);
      if(err) {return done(err);}

      if(registros.length==0) {
        var obj = {};
        obj.idusuario = profile.id;
        obj.proveedor = profile.provider;
        obj.name = profile.displayName;
        obj.photo = profile.photos[0].value;

        console.log(obj);

        console.log("estado2");
        modelo.insertar(obj, function(err){
          console.log("estado3");
          console.log(obj);
          console.log(err);
          if(err) return done(null, false);
          return done(null, obj);
        })
      } else {
        return done(null, registros[0]);
      }
    }) 
  }));


  passport.use(new TwitterStrategy({
    consumerKey      : "Zgb8BIPd4oLMaloNofMZPLSpV",
    consumerSecret    : "Xp03UGd5YFcJN3bfdX3PYRGkcgvIfL9IHIdLkvlSqUrV29Ojxp",
    callbackURL  : '/auth/twitter/callback'
  }, function(accessToken, refreshToken, profile, done) {
    modelo.validar(profile.id, function(err, registros){
      console.log("estado1");
      console.log(err);
      console.log(registros.length);
      if(err) {return done(err);}

      if(registros.length==0) {
        var obj = {};
        obj.idusuario = profile.id;
        obj.proveedor = profile.provider;
        obj.name = profile.displayName;
        obj.photo = profile.photos[0].value;

        console.log(obj);

        console.log("estado2");
        modelo.insertar(obj, function(err){
          console.log("estado3");
          console.log(obj);
          console.log(err);
          if(err) return done(null, false);
          return done(null, obj);
        })
      } else {
        return done(null, registros[0]);
      }
    }) 
  }));

  passport.use(new GithubStrategy({
    clientID      : "e2e3c667931c8eed3030",
    clientSecret    : "ca154e16cf32c4a103b0b10bb66836bc841d8ea8",
    callbackURL  : 'http://127.0.0.1:5000/auth/github/callback'
  }, function(accessToken, refreshToken, profile, done) {
    console.log("datos");
      console.log(profile);
    modelo.validar(profile.id, function(err, registros){
      console.log("estado1");
      console.log(err);
      console.log(registros.length);
      if(err) {return done(err);}



      if(registros.length==0) {
        var obj = {};
        obj.idusuario = profile.id;
        obj.proveedor = profile.provider;
        obj.name = profile.displayName;
        obj.photo = profile._json.avatar_url;


        console.log("estado2");
        modelo.insertar(obj, function(err){
          console.log("estado3");
          console.log(obj);
          console.log(err);
          if(err) return done(null, false);
          return done(null, obj);
        })
      } else {
        return done(null, registros[0]);
      }
    }) 
  }));

  passport.use(new GoogleStrategy({
    clientID      : "231080822663-dhcd6u4jsmrh8cu0k4v236f22tb6uh38.apps.googleusercontent.com",
    clientSecret    : "h2YjvEUQtwve4FgAOsd8tN70",
    callbackURL  : '/auth/google/callback'
  }, function(accessToken, refreshToken, profile, done) {
    console.log("datos");
      console.log(profile);
    modelo.validar(profile.id, function(err, registros){
      console.log("estado1");
      console.log(err);
      console.log(registros.length);
      if(err) {return done(err);}



      if(registros.length==0) {
        var obj = {};
        obj.idusuario = profile.id;
        obj.proveedor = profile.provider;
        obj.name = profile.displayName;
        obj.photo = profile._json.image.url;


        console.log("estado2");
        modelo.insertar(obj, function(err){
          console.log("estado3");
          console.log(obj);
          console.log(err);
          if(err) return done(null, false);
          return done(null, obj);
        })
      } else {
        return done(null, registros[0]);
      }
    }) 
  }));



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
