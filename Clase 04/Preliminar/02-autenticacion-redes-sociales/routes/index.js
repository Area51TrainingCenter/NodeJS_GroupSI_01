var express = require('express');
var router = express.Router();
var passport = require("passport");

var estaAutenticado = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/', failureRedirect: '/login' }
));

router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/', failureRedirect: '/login' }
));

router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/auth/github/callback', passport.authenticate('github',
  { successRedirect: '/', failureRedirect: '/login' }
));

router.get('/auth/google', passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ] }));
router.get('/auth/google/callback', passport.authenticate('google',
  { successRedirect: '/', failureRedirect: '/login' }
));

router.get("/login", function(req, res, next){
  res.render("login");
});

router.get("/", estaAutenticado, function(req, res){
  console.log(req.user);
  res.render("index", {usuario: req.user});
});

router.get("/home/:usuario", estaAutenticado, function(req, res){
  console.log(req.user);
  res.render("home",{usuario: req.params.usuario});
});


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
