var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/cliente', function(req, res, next) {
  res.render('cliente');
});

module.exports = router;
