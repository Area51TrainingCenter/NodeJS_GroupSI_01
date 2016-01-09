var express = require('express');
var router = express.Router();
var passport = require("passport");

var estaAutenticado = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

//router.post('/autenticar', passport.authenticate('local', { successRedirect: '/',failureRedirect: '/login' }));

router.post("/autenticar", 
function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      //return res.redirect('/users/' + user.username);
      //res.render("home");
      return res.redirect("/home/"+user.usuario);
    });
  })(req, res, next);
})




/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index');
});*/


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
