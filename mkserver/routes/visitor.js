var express = require('express');
var router = express.Router();

var visitorDao = require('../dao/visitorDao');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  console.log('visitor :' + JSON.stringify(req.body));
  if (req.body.command == "getpath") {
    console.log('getpath');
    visitorDao.getPath(req, res, next);
  } else if (req.body.command == "getpathdetail") {
    console.log('getpathdetail');
    visitorDao.getPathDetail(req, res, next);
  } else if (req.body.command == "getpath_app") {
    console.log('getpath_app');
    visitorDao.getPath_app(req, res, next);
  } else if (req.body.command == "getplan") {
    console.log('getplan');
    visitorDao.getPlan(req, res, next);
  } else if (req.body.command == "addplan") {
    console.log('addplan');
    visitorDao.addPlan(req, res, next);
  }
});

module.exports = router;
