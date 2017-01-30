
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
        connection.query(sqlstring, [param.name, parseInt(param.userid),param.id], function (err, result) {
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
        connection.query(_sql.insertgroup, [param.name, param.groupid], function (err, result) {
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
        connection.query(_sql.queryallgroup, function (err, result) {
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
        connection.query(_sql.queryallplan, function (err, result) {
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
        connection.query(_sql.queryplan, [param.planid], function (err, result) {
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
        connection.query(_sql.insertplan, [param.planname, getNowFormatDate(), param.userid, param.plandetail, 1], function (err, result) {
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
        connection.query(_sql.deleteplan, [param.planid], function (err, result) {
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
