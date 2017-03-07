
var _dao = require('./dao');
var _sql = require('./sqlMapping');
var async = require('async');

var pool = _dao.getPool();
var jsonWrite = _dao.jsonWrite;
var dbcode = _dao.dbcode;

module.exports = {
  getPath: function (req, res, next) {
    console.log('visitorDao getPath');
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getpath;
        connection.query(sqlstring, [], function (err, result) {
          //console.log('dbresult', err, result);
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
  getPathDetail: function (req, res, next) {
    console.log('visitorDao getPathDetail');
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getpathdetail;
        connection.query(sqlstring, [], function (err, result) {
          //console.log('dbresult', err, result);
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
  getPath_app: function (req, res, next) {
    console.log('visitorDao getPath');
    var param = req.body;
    if (!param.userid) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getpath_app;
        connection.query(sqlstring, [param.userid], function (err, result) {
          //console.log('dbresult', err, result);
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
  getPlanSum: function (req, res, next) {
    console.log('visitorDao getPlanSum');
    var param = req.body;
    if (!param.userid || !param.year) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getplansum;
        connection.query(sqlstring, [param.userid, param.year], function (err, result) {
          //console.log('dbresult', err, result);
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
  getPlan: function (req, res, next) {
    console.log('visitorDao getPlan');
    var param = req.body;
    if (!param.userid || !param.year || !param.month) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getplan;
        sqlstring += ' where userid = ' + connection.escape(param.userid);
        sqlstring += ' and year = ' + connection.escape(param.year);
        sqlstring += ' and month = ' + connection.escape(param.month);
        if (param.day) {
           sqlstring += ' and day = ' + connection.escape(param.day);
        }
        connection.query(sqlstring, [], function (err, result) {
          //console.log('dbresult', err, result);
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
  addPlan: function (req, res, next) {
    console.log('visitorDao addPlan');
    var param = req.body;
    if (!param.Plan_Type || !param.Plan_Date || !param.Store_Name || !param.User_Id) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.addplan;
        connection.query(sqlstring, [param.Plan_Type, param.Plan_Date, param.Path_Id, param.Store_Id, param.Store_Name, param.User_Id], function (err, result) {
          //console.log('dbresult', err, result);
          if (err) {
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            if (result.affectedRows > 0) {
              var data = req.body;
              data.Plan_Id = result.insertId;
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
  delPlan: function (req, res, next) {
    console.log('visitorDao delPlan');
    var param = req.body;
    if (!param.Plan_Id) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.delplan;
        connection.query(sqlstring, [parseInt(param.Plan_Id)], function (err, result) {
          //console.log('dbresult', err, result);
          if (err) {
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            if (result.affectedRows > 0) {
              jsonWrite(res, {}, dbcode.SUCCESS);
            } else {
              jsonWrite(res, {}, dbcode.FAIL);
            }
          }
          connection.release();
        });
      }
    });
  },
  updatePlan: function (req, res, next) {
    console.log('visitorDao updatePlan', req.body);
    var param = req.body;
    if (!param.year || !param.month || !param.userid) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    var sumInfo = JSON.parse(param.sumInfo);
    var modifyData = JSON.parse(param.modifyData);

    var planSum = {};
    var plan = [];
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        // function数组，需要执行的任务列表，每个function都有一个参数callback函数并且要调用
        var tasks = [function (callback) {
          // 开启事务
          connection.beginTransaction(function (err) {
            callback(err);
          });
        }, function (callback) {
          var sqlstring = _sql.updateplansum;
          connection.query(sqlstring, [param.userid, param.year, param.month,
            sumInfo.storeCount, sumInfo.storeACount, sumInfo.storeBCount, sumInfo.storeCCount,
            sumInfo.storeA, sumInfo.storeB, sumInfo.storeC, sumInfo.cover],
            function (err, result) {
              callback(err);
            });
        }, function (callback) {
          connection.query('select * from plan_sum where userid = ? and year = ? and month = ?',
            [param.userid, param.year, param.month], function (err, result) {
              //console.log('dbresult', err, result);
              planSum = result;
              callback(err);
            });
        }];

        for (let day in modifyData) {
          var planlist = modifyData[day];
          tasks.push(function (callback) {
            var sqlstring = _sql.delplan;
            connection.query(sqlstring, [param.userid, param.year, param.month, day],
              function (err, result) {
                callback(err);
              });
          })

          for (var i = 0; i < planlist.length; i++) {
            let plan = planlist[i];
            tasks.push(function (callback) {
              var sqlstring = _sql.insertplan;
              console.log(sqlstring, param.userid, param.year, param.month, day, plan.plan_type, plan.path_id, plan.store_id);
              connection.query(sqlstring, [param.userid, param.year, param.month, day, plan.plan_type, plan.path_id, plan.store_id],
                function (err, result) {
                  callback(err);
                });
            })
          }
        }
        tasks.push(function (callback) {
          connection.query('select * from plan where userid = ? and year = ? and month = ?',
            [param.userid, param.year, param.month], function (err, result) {
              //console.log('dbresult', err, result);
              plan = result;
              callback(err);
            });
        })

        tasks.push(function (callback) {
          // 提交事务
          connection.commit(function (err) {
            callback(err);
          });
        })

        async.series(tasks, function (err, results) {
          if (err) {
            console.log('tasks error', err);
            connection.rollback(); // 发生错误事务回滚
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            var result = {
              planSum: planSum,
              plan: plan
            }
            jsonWrite(res, result, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
};
