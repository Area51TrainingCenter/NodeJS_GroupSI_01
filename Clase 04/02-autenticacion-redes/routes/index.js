var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/usuario", function(req, res){
	res.render("usuario", req.user);
});

router.get('/loginFacebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/usuario', failureRedirect: '/' }
));

router.get('/loginGoogle', passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ] }));

router.get('/google/callback', passport.authenticate('google',
  { successRedirect: '/usuario', failureRedirect: '/' }
));

module.exports = router;