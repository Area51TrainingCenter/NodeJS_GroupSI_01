var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/autenticado', function(req, res, next) {
  res.render('autenticado');
});


router.post('/loguear', 
		passport.authenticate('local', 
			{ successRedirect: '/autenticado',
			  failureRedirect: '/' 
			}
));


module.exports = router;
