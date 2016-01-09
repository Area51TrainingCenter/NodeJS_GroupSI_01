var express = require('express');
var router = express.Router();
var passport = require("passport");

var estaAutenticado = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}


	/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
  	res.render("autenticado", req.user);
  } else {
  	res.render('index');	
  }
  
});

router.get('/autenticado', estaAutenticado, function(req, res, next) {
  res.render('autenticado', req.user);
});


router.post('/loguear', 
		passport.authenticate('local', 
			{ successRedirect: '/autenticado',
			  failureRedirect: '/' 
			}
));

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
})

module.exports = router;
