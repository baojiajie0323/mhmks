
var _dao = require('./dao');
var _sql = require('./sqlMapping');

var pool = _dao.getPool();
var jsonWrite = _dao.jsonWrite;
var dbcode = _dao.dbcode;
console.log(dbcode);

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
        var sqlstring = _sql.login_web;
        if (param.type == 2) {
          sqlstring = _sql.login_app;
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
  getUser: function (req, res, next) {
    console.log('userDao getUser');
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getuser;
        connection.query(sqlstring, [], function (err, result) {
          console.log('dbresult', err, result);
          if (err) {
            jsonWrite(res, {}, dbcode.LOGIN_FAIL);
          } else {
            jsonWrite(res, result, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
  addUser: function (req, res, next) {
    console.log('userDao addUser');
    var param = req.body;
    if (param.username == null || param.password == null) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    if(param.depart == ''){
      param.depart = 0;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.adduser;
        connection.query(sqlstring, [param.username, param.password, param.realname, param.phone, param.email, parseInt(param.depart)], function (err, result) {
          console.log('dbresult', err, result);
          if (err) {
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            if (result.affectedRows > 0) {
              var data = req.body;
              data.id = result.insertId;
              jsonWrite(res, data, dbcode.SUCCESS);
            } else {
              jsonWrite(res, {}, dbcode.FAIL);
            }
          }
          connection.release();
        });
      }
    });
  },
  modUser: function (req, res, next) {
    console.log('userDao modUser');
    var param = req.body;
    if (param.id == null) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    if(param.depart == ''){
      param.depart = 0;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.moduser;
        connection.query(sqlstring, [param.username, param.password, param.realname, param.phone, param.email, parseInt(param.depart), param.id], function (err, result) {
          console.log('dbresult', err, result);
          if (err) {
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            if (result.affectedRows > 0) {
              var data = req.body;
              jsonWrite(res, data, dbcode.SUCCESS);
            } else {
              jsonWrite(res, {}, dbcode.FAIL);
            }
          }
          connection.release();
        });
      }
    });
  },
  delUser: function (req, res, next) {
    console.log('userDao delUser');
    var param = req.body;
    if (param.id == null) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.deluser;
        connection.query(sqlstring, [param.id], function (err, result) {
          console.log('dbresult', err, result);
          if (err) {
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            if (result.affectedRows > 0) {
              var data = req.body;
              jsonWrite(res, data, dbcode.SUCCESS);
            } else {
              jsonWrite(res, {}, dbcode.FAIL);
            }
          }
          connection.release();
        });
      }
    });
  },
  getDepart: function (req, res, next) {
    console.log('userDao getDepart');
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getdepart;
        connection.query(sqlstring, [], function (err, result) {
          console.log('dbresult', err, result);
          if (err) {
            jsonWrite(res, {}, dbcode.LOGIN_FAIL);
          } else {
            jsonWrite(res, result, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
  addDepart: function (req, res, next) {
    console.log('userDao addDepart');
    var param = req.body;
    if (param.name == null || param.parentid == null) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    if (param.userid == "") {
      param.userid = 0;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.adddepart;
        connection.query(sqlstring, [param.name, param.parentid, parseInt(param.userid)], function (err, result) {
          console.log('dbresult', err, result);
          if (err) {
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            if (result.affectedRows > 0) {
              var data = req.body;
              data.id = result.insertId;
              jsonWrite(res, data, dbcode.SUCCESS);
            } else {
              jsonWrite(res, {}, dbcode.FAIL);
            }
          }
          connection.release();
        });
      }
    });
  },
  modDepart: function (req, res, next) {
    console.log('userDao modDepart');
    var param = req.body;
    if (param.id == null) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    if (param.userid == "") {
      param.userid = 0;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.moddepart;
        connection.query(sqlstring, [param.name, parseInt(param.userid), param.id], function (err, result) {
          console.log('dbresult', err, result);
          if (err) {
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            if (result.affectedRows > 0) {
              var data = req.body;
              jsonWrite(res, data, dbcode.SUCCESS);
            } else {
              jsonWrite(res, {}, dbcode.FAIL);
            }
          }
          connection.release();
        });
      }
    });
  },
  delDepart: function (req, res, next) {
    console.log('userDao delDepart');
    var param = req.body;
    if (param.id == null) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.deldepart;
        connection.query(sqlstring, [param.id], function (err, result) {
          console.log('dbresult', err, result);
          if (err) {
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            if (result.affectedRows > 0) {
              var data = req.body;
              jsonWrite(res, data, dbcode.SUCCESS);
            } else {
              jsonWrite(res, {}, dbcode.FAIL);
            }
          }
          connection.release();
        });
      }
    });
  },
};
