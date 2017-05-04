var mysql = require('mysql');
var _sql = require('./sqlMapping');
var $conf = require('../conf/db');
var $util = require('../util/util');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

var dao = {
  dbcode: {
    SUCCESS: 0,
    CONNECT_ERROR: 1,
    PARAM_ERROR: 2,
    FAIL: 3,
    LOGIN_FAIL: 4,
  },
  getPool: () => {
    return pool;
  },
  log: (userid, logstring) => {
    console.log('log', userid, logstring);
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.log;
        var curDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
        connection.query(sqlstring, [curDate,userid,logstring], function (err, result) {
          connection.release();
        });
      }
    });
  },
  jsonWrite: function (res, ret, code, ncount) {
    if (code != dao.dbcode.SUCCESS) {
      if (code == dao.dbcode.CONNECT_ERROR) { res.json({ code: code, msg: '数据库连接失败' }); }
      else if (code == dao.dbcode.PARAM_ERROR) { res.json({ code: code, msg: '参数错误' }); }
      else if (code == dao.dbcode.FAIL) { res.json({ code: code, msg: '操作失败' }); }
      else if (code == dao.dbcode.LOGIN_FAIL) { res.json({ code: code, msg: '用户名或密码错误' }); }
    } else {
      if (typeof ret === 'undefined') {
        res.json({ code: dao.dbcode.FAIL, msg: '操作失败' });
      } else {
        res.json({ code: 0, data: ret, count: ncount });
      }
    }
  },
};

module.exports = dao;