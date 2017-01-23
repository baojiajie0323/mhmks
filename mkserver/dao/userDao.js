var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./sqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

var dbcode = {
  SUCCESS: 0,
  CONNECT_ERROR: 1,
  PARAM_ERROR: 2,
  FAIL: 3,
  LOGIN_FAIL: 4,
}
// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret, code) {
  if (code != dbcode.SUCCESS) {
    if (code == dbcode.CONNECT_ERROR) { res.json({ code: code, msg: '数据库连接失败' }); }
    else if (code == dbcode.PARAM_ERROR) { res.json({ code: code, msg: '参数错误' }); }
    else if (code == dbcode.FAIL) { res.json({ code: code, msg: '操作失败' }); }
    else if (code == dbcode.LOGIN_FAIL) { res.json({ code: code, msg: '用户名或密码错误' }); }
  } else {
    if (typeof ret === 'undefined') {
      res.json({ code: dbcode.FAIL, msg: '操作失败' });
    } else {
      res.json({ code: 0, data: ret });
    }
  }
};

function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var hours = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (hours >= 0 && hours <= 9) {
    hours = "0" + hours;
  }
  if (minute >= 0 && minute <= 9) {
    minute = "0" + minute;
  }
  if (second >= 0 && second <= 9) {
    second = "0" + second;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + hours + seperator2 + minute + seperator2 + second;
  return currentdate;
}

module.exports = {
  login: function (req, res, next) {
    var param = req.body;
    if (!param.username || !param.password || !param.type) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }

    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = $sql.login_web;
        if (param.type == 2) {
          sqlstring = $sql.login_app;
        }

        connection.query(sqlstring, [param.username, param.password], function (err, result) {
          console.log('dbresult', result);
          if (result.length > 0) {
            jsonWrite(res, result, dbcode.SUCCESS);
          } else {
            jsonWrite(res, {}, dbcode.LOGIN_FAIL);
          }
          connection.release();
        });
      }
    });
  },
  logout: function (req, res, next) {
    jsonWrite(res, {}, dbcode.SUCCESS);
  },
  insertgroup: function (req, res, next) {
    var param = req.body;
    if (param.name == null || param.groupid == null) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }

    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        connection.query($sql.insertgroup, [param.name, param.groupid], function (err, result) {
          if (result.affectedRows > 0) {
            jsonWrite(res, result, dbcode.SUCCESS);
          } else {
            jsonWrite(res, {}, dbcode.LOGIN_FAIL);
          }
          connection.release();
        });
      }
    });
  },

  queryallgroup: function (req, res, next) {
    console.log('queryallgroup');
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        connection.query($sql.queryallgroup, function (err, result) {
          jsonWrite(res, result, dbcode.SUCCESS);
          connection.release();
        });
      }
    });
  },

  queryallplan: function (req, res, next) {
    console.log('queryallplan');
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        connection.query($sql.queryallplan, function (err, result) {
          jsonWrite(res, result, dbcode.SUCCESS);
          connection.release();
        });
      }
    });
  },
  queryplan: function (req, res, next) {

    var param = req.body;
    if (param.planid == null) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }

    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        connection.query($sql.queryplan, [param.planid], function (err, result) {
          jsonWrite(res, result, dbcode.SUCCESS);
          connection.release();
        });
      }
    });
  },
  addplan: function (req, res, next) {
    var param = req.body;
    if (param.planname == null || param.plandetail == null) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }

    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        connection.query($sql.insertplan, [param.planname, getNowFormatDate(), param.userid, param.plandetail, 1], function (err, result) {
          if (result.affectedRows > 0) {
            jsonWrite(res, result, dbcode.SUCCESS);
          } else {
            jsonWrite(res, {}, dbcode.FAIL);
          }
          connection.release();
        });
      }
    });
  },
  delplan: function (req, res, next) {
    var param = req.body;
    if (param.planid == null) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }

    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        connection.query($sql.deleteplan, [param.planid], function (err, result) {
          if (result.affectedRows > 0) {
            jsonWrite(res, result, dbcode.SUCCESS);
          } else {
            jsonWrite(res, {}, dbcode.FAIL);
          }
          connection.release();
        });
      }
    });
  },

};
