var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/mhmks/index.html');
  //res.render('index', { title: '满好营销通' });
});

module.exports = router;
