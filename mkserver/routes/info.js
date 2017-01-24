var express = require('express');
var router = express.Router();

var infoDao = require('../dao/infoDao');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  console.log('info :' + JSON.stringify(req.body));
  if (req.body.command == "getstorearea") {
    console.log('getstorearea');
    infoDao.getStoreArea(req, res, next);
  }
});

module.exports = router;
