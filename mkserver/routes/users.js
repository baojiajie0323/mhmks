var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  console.log('users :' + JSON.stringify(req.body));
  if (req.body.command == "login") {
    console.log('login');
    userDao.login(req, res, next);
  } else if (req.body.command == "logout") {
    console.log('logout');
    userDao.logout(req, res, next);
  }
});

module.exports = router;
