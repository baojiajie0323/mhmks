
var _dao = require('./dao');
var _sql = require('./sqlMapping');

var pool = _dao.getPool();
var jsonWrite = _dao.jsonWrite;
var dbcode = _dao.dbcode;

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
            _dao.log(param.username,"登录成功[登录终端类型：" + param.type + "]");
            jsonWrite(res, result, dbcode.SUCCESS);
          } else {
            _dao.log(param.username,"登录[登录终端类型：" + param.type + " 登录密码："+ param.password +"]");
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
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getuser;
        if(param.depart){
          sqlstring += ' where a.depart = ';
          sqlstring += connection.escape(param.depart);
        }
        connection.query(sqlstring, [], function (err, result) {
          //console.log('dbresult', err, result);
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
    if (param.depart == '') {
      param.depart = 0;
    }
    if (param.role == '') {
      param.role = 0;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.adduser;
        connection.query(sqlstring, [param.username, param.password, param.realname, param.phone, param.email, parseInt(param.depart),parseInt(param.role),parseInt(param.enableweb),parseInt(param.enableapp)], function (err, result) {
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
    if (param.depart == '') {
      param.depart = 0;
    }
    if (param.role == '') {
      param.role = 0;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.moduser;
        connection.query(sqlstring, [param.username, param.password, param.realname, param.phone, param.email, parseInt(param.depart), parseInt(param.role) ,parseInt(param.enableweb),parseInt(param.enableapp), param.id], function (err, result) {
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
        connection.query(sqlstring, [param.name, param.parentid, parseInt(param.userid), param.path], function (err, result) {
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
        connection.query(sqlstring, [param.name, parseInt(param.userid),param.path, param.id], function (err, result) {
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
  getPermissontype: function (req, res, next) {
    console.log('userDao getPermissontype');
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getpermissontype;
        connection.query(sqlstring, [], function (err, result) {
          console.log('dbresult', err, result);
          if (err) {
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            jsonWrite(res, result, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
  getRole: function (req, res, next) {
    console.log('userDao getRole');
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getrole;
        connection.query(sqlstring, [], function (err, result) {
          console.log('dbresult', err, result);
          if (err) {
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            jsonWrite(res, result, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
  addRole: function (req, res, next) {
    console.log('userDao addRole');
    var param = req.body;
    if (param.name == null) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.addrole;
        connection.query(sqlstring, [param.name,param.level,param.permisson], function (err, result) {
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
  modRole: function (req, res, next) {
    console.log('userDao modRole');
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
        var sqlstring = _sql.modrole;
        connection.query(sqlstring, [param.name, param.level, param.permisson, param.id], function (err, result) {
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
  delRole: function (req, res, next) {
    console.log('userDao delRole');
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
        var sqlstring = _sql.delrole;
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
  getSubsidy: function (req, res, next) {
    console.log('userDao getSubsidy');
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getsubsidy;
        connection.query(sqlstring, [], function (err, result) {
          console.log('dbresult', err, result);
          if (err) {
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            jsonWrite(res, result, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
  updateSubsidy: function (req, res, next) {
    console.log('userDao updateSubsidy');
    var param = req.body;
    if (param.role_id == null) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    _dao.log("后台","更新补贴报销标准");
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.updatesubsidy;
        sqlstring += param.key;
        sqlstring += " = ";
        sqlstring += connection.escape(param.value);
        sqlstring += " on DUPLICATE KEY UPDATE ";
        sqlstring += param.key;
        sqlstring += " = ";
        sqlstring += connection.escape(param.value);
        connection.query(sqlstring, [param.role_id], function (err, result) {
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
