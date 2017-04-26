
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
    if (!param.plan_type || !param.user_id) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.insertplan;
        var plandate = param.year + '-' + param.month + '-' + param.day;
        connection.query(sqlstring, [param.user_id, param.year, param.month, param.day,plandate, param.plan_type, "", param.store_id], function (err, result) {
          console.log('dbresult', err, result);
          if (err) {
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            if (result.affectedRows > 0) {
              var data = req.body;
              //data.Plan_Id = result.insertId;
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

  sign: function (req, res, next) {
    console.log('visitorDao sign');
    var param = req.body;
    if (!param.lat || !param.lon || !param.store_id || !param.userid) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = '';
        if (param.sign_type == 'signin') {
          sqlstring = _sql.signin;
        } else {
          sqlstring = _sql.signout;
        }

        var curDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
        connection.query(sqlstring, [curDate, param.lon, param.lat, param.userid, param.year, param.month, param.day, param.store_id], function (err, result) {
          console.log('dbresult', err, result);
          if (err) {
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            if (result.affectedRows > 0) {
              var data = req.body;
              data.signin_time = curDate;
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
  checkSign: function (req, res, next) {
    console.log('visitorDao checkSign');
    var param = req.body;
    if (!param.lat || !param.lon || !param.userid) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.checksign;

        var curDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
        connection.query(sqlstring, [curDate, param.lon, param.lat, param.userid], function (err, result) {
          console.log('dbresult', err, result);
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
  getSignList: function (req, res, next) {
    console.log('visitorDao getSignList');
    var param = req.body;
    if (!param.userid || !param.signtime ) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getsignlist;
        connection.query(sqlstring, [param.userid,"%" + param.signtime + "%"], function (err, result) {
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
  submitShelfMain: function (req, res, next) {
    console.log('visitorDao submitShelfMain', req.body);
    var param = req.body;
    if (!param.year || !param.month || !param.userid) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    var product = JSON.parse(param.product);
    var image = JSON.parse(param.image);

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
        }];

        for (var i = 0; i < product.length; i++) {
          let productInfo = product[i];
          tasks.push(function (callback) {
            var sqlstring = _sql.submitshelfmain;
            connection.query(sqlstring, [param.store_id, productInfo.product_id, param.userid, param.year, param.month, param.day, parseInt(productInfo.count)],
              function (err, result) {
                callback(err);
              });
          })
        }

        for (var i = 0; i < image.length; i++) {
          let productImage = image[i];
          tasks.push(function (callback) {
            var sqlstring = _sql.submitproductimage;
            connection.query(sqlstring, [param.store_id, productImage.brand_id, productImage.display_id,productImage.product_id||"", param.userid, param.year, param.month, param.day, productImage.filename, productImage.type],
              function (err, result) {
                callback(err);
              });
          })
        }

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
            jsonWrite(res, {}, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
  submitStock: function (req, res, next) {
    console.log('visitorDao submitStock', req.body);
    var param = req.body;
    if (!param.year || !param.month || !param.userid) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    var product = JSON.parse(param.product);
    var image = JSON.parse(param.image);

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
        }];

        for (var i = 0; i < product.length; i++) {
          let productInfo = product[i];
          tasks.push(function (callback) {
            var sqlstring = _sql.submitstock;
            connection.query(sqlstring, [param.store_id, productInfo.product_id, param.userid, param.year, param.month, param.day, parseInt(productInfo.count)],
              function (err, result) {
                callback(err);
              });
          })
        }

        for (var i = 0; i < image.length; i++) {
          let productImage = image[i];
          tasks.push(function (callback) {
            var sqlstring = _sql.submitproductimage;
            connection.query(sqlstring, [param.store_id, productImage.brand_id, productImage.display_id,productImage.product_id||"", param.userid, param.year, param.month, param.day, productImage.filename, productImage.type],
              function (err, result) {
                callback(err);
              });
          })
        }

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
            jsonWrite(res, {}, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
  submitShelfAway: function (req, res, next) {
    console.log('visitorDao submitShelfAway', req.body);
    var param = req.body;
    if (!param.year || !param.month || !param.userid) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    var product = JSON.parse(param.product);
    var image = JSON.parse(param.image);
    var count = JSON.parse(param.count);

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
        }];

        for (var i = 0; i < product.length; i++) {
          let productInfo = product[i];
          tasks.push(function (callback) {
            var sqlstring = _sql.submitshelfaway;
            connection.query(sqlstring, [param.store_id, productInfo.product_id, param.userid, param.year, param.month, param.day, productInfo.display_id],
              function (err, result) {
                callback(err);
              });
          })
        }

        for (let display_id in count) {
          let countInfo = count[display_id];
          tasks.push(function (callback) {
            var sqlstring = _sql.submitshelfawaycount;
            console.log("submitshelfawaycount", display_id, countInfo);
            connection.query(sqlstring, [param.store_id, param.userid, param.year, param.month, param.day, display_id, parseInt(countInfo)],
              function (err, result) {
                callback(err);
              });
          })
        }

        for (var i = 0; i < image.length; i++) {
          let productImage = image[i];
          tasks.push(function (callback) {
            var sqlstring = _sql.submitproductimage;
            connection.query(sqlstring, [param.store_id, productImage.brand_id, productImage.display_id,productImage.product_id||"", param.userid, param.year, param.month, param.day, productImage.filename, productImage.type],
              function (err, result) {
                callback(err);
              });
          })
        }

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
            jsonWrite(res, {}, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
  submitChat: function (req, res, next) {
    console.log('visitorDao submitChat');
    var param = req.body;
    if (!param.year || !param.month || !param.day || !param.store_id) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.submitchat;
        connection.query(sqlstring, [param.store_id, param.userid, param.year, param.month, param.day, param.storeUser,param.chatContent,param.chatResult], function (err, result) {
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
  submitPromotion: function (req, res, next) {
    console.log('visitorDao submitPromotion', req.body);
    var param = req.body;
    if (!param.year || !param.month || !param.userid) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    var product = JSON.parse(param.product);
    var image = JSON.parse(param.image);

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
        }];

        for (var i = 0; i < product.length; i++) {
          let productInfo = product[i];
          tasks.push(function (callback) {
            var sqlstring = _sql.submitpromotion;
            connection.query(sqlstring, [param.store_id, productInfo.product_id, param.userid, param.year, param.month, param.day,productInfo.display,productInfo.pos,productInfo.count,param.confirm_user],
              function (err, result) {
                callback(err);
              });
          })
        }

        for (var i = 0; i < image.length; i++) {
          let productImage = image[i];
          tasks.push(function (callback) {
            var sqlstring = _sql.submitproductimage;
            connection.query(sqlstring, [param.store_id, productImage.brand_id||"", productImage.display_id,productImage.product_id||"",param.userid, param.year, param.month, param.day, productImage.filename, productImage.type],
              function (err, result) {
                callback(err);
              });
          })
        }

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
            jsonWrite(res, {}, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
};
