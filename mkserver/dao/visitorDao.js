
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
    if (!param.userid && !param.depart) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getpath_app;
        if (param.userid) {
          sqlstring += "(select store_id from store where user_id = ";
          sqlstring += connection.escape(param.userid);
          sqlstring += ") order by a.path_seq,a.Path_id"
        } else if (param.depart) {
          sqlstring += "(select store_id from store where user_id in (SELECT username from user where depart = ";
          sqlstring += connection.escape(param.depart);
          sqlstring += ")) order by a.path_seq,a.Path_id"
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
    _dao.log(param.user_id, "创建拜访计划");
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.insertplan;
        var plandate = param.year + '-' + param.month + '-' + param.day;
        connection.query(sqlstring, [param.user_id, param.year, param.month, param.day, plandate, param.plan_type, "", param.store_id], function (err, result) {
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
    // if (!param.Plan_Id) {
    //   jsonWrite(res, {}, dbcode.PARAM_ERROR);
    //   return;
    // }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.delplan;
        sqlstring += " and store_id = ";
        sqlstring += connection.escape(param.store_id);
        sqlstring += " and plan_type != 1";
        connection.query(sqlstring, [param.userid, param.year, param.month, param.day], function (err, result) {
          //console.log('dbresult', err, result);
          if (err) {
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            if (result.affectedRows > 0) {
              jsonWrite(res, req.body, dbcode.SUCCESS);
            } else {
              jsonWrite(res, {}, dbcode.FAIL);
            }
          }
          connection.release();
        });
      }
    });
  },
  reSign: function (req, res, next) {
    console.log('visitorDao reSign');
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.resign;
        connection.query(sqlstring, [param.userid, param.year, param.month, param.day, param.store_id], function (err, result) {
          console.log('dbresult', err, result);
          if (err) {
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            if (result.affectedRows > 0) {
              jsonWrite(res, req.body, dbcode.SUCCESS);
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
    _dao.log(param.userid, "更新计划");
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
              var plandate = param.year + '-' + param.month + '-' + day;
              console.log(sqlstring, param.userid, param.year, param.month, day, plandate, plan.plan_type, plan.path_id, plan.store_id);
              connection.query(sqlstring, [param.userid, param.year, param.month, day, plandate, plan.plan_type, plan.path_id, plan.store_id],
                function (err, result) {
                  callback(err);
                });
            })
          }
        }
        tasks.push(function (callback) {
          connection.query('select a.*,b.Path_name Path_Name from plan a left join path b on (a.path_id = b.Path_id) where userid = ? and year = ? and month = ?',
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
    if (param.sign_type == 'signin') {
      _dao.log(param.userid, "签到");
    } else {
      _dao.log(param.userid, "签退");
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
    if (!param.userid || !param.signtime) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getsignlist;
        connection.query(sqlstring, [param.userid, "%" + param.signtime + "%"], function (err, result) {
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


    _dao.log(param.userid, "提交主货架信息");

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

        tasks.push(function (callback) {
          var sqlstring = _sql.delshelfmain;
          connection.query(sqlstring, [param.year, param.month, param.day, param.store_id, param.userid],
            function (err, result) {
              callback(err);
            });
        })

        for (var i = 0; i < product.length; i++) {
          let productInfo = product[i];
          tasks.push(function (callback) {
            var sqlstring = _sql.submitshelfmain;
            var plandate = param.year + '-' + param.month + '-' + param.day;
            connection.query(sqlstring, [param.store_id, productInfo.product_id, param.userid, param.year, param.month, param.day, plandate, parseInt(productInfo.count)],
              function (err, result) {
                callback(err);
              });
          })
        }

        for (var i = 0; i < image.length; i++) {
          let productImage = image[i];
          tasks.push(function (callback) {
            var sqlstring = _sql.submitproductimage;
            var submitdate = param.year + "-" + param.month + "-" + param.day;
            connection.query(sqlstring, [param.store_id, productImage.brand_id, productImage.display_id, productImage.product_id || "", param.userid, param.year, param.month, param.day, submitdate, productImage.filename, productImage.type, productImage.category || 0],
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

    _dao.log(param.userid, "提交库存信息");

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

        tasks.push(function (callback) {
          var sqlstring = _sql.delstock;
          connection.query(sqlstring, [param.year, param.month, param.day, param.store_id, param.userid],
            function (err, result) {
              callback(err);
            });
        })

        for (var i = 0; i < product.length; i++) {
          let productInfo = product[i];
          tasks.push(function (callback) {
            var sqlstring = _sql.submitstock;
            var plandate = param.year + '-' + param.month + '-' + param.day;
            connection.query(sqlstring, [param.store_id, productInfo.product_id, param.userid, param.year, param.month, param.day, plandate, parseInt(productInfo.count || 0), parseInt(productInfo.onway || 0)],
              function (err, result) {
                callback(err);
              });
          })
        }

        for (var i = 0; i < image.length; i++) {
          let productImage = image[i];
          tasks.push(function (callback) {
            var sqlstring = _sql.submitproductimage;
            var submitdate = param.year + "-" + param.month + "-" + param.day;
            connection.query(sqlstring, [param.store_id, productImage.brand_id, productImage.display_id, productImage.product_id || "", param.userid, param.year, param.month, param.day, submitdate, productImage.filename, productImage.type, productImage.category || 0],
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


    _dao.log(param.userid, "提交离架信息");


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
        tasks.push(function (callback) {
          var sqlstring = _sql.delshelfaway;
          connection.query(sqlstring, [param.year, param.month, param.day, param.store_id, param.userid],
            function (err, result) {
              callback(err);
            });
        })

        for (var i = 0; i < product.length; i++) {
          let productInfo = product[i];
          tasks.push(function (callback) {
            var sqlstring = _sql.submitshelfaway;
            var submitdate = param.year + "-" + param.month + "-" + param.day;
            connection.query(sqlstring, [param.store_id, productInfo.product_id, param.userid, param.year, param.month, param.day, submitdate, productInfo.display_id],
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
            var submitdate = param.year + "-" + param.month + "-" + param.day;
            connection.query(sqlstring, [param.store_id, productImage.brand_id, productImage.display_id, productImage.product_id || "", param.userid, param.year, param.month, param.day, submitdate, productImage.filename, productImage.type, productImage.category || 0],
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


    _dao.log(param.userid, "提交洽谈信息");

    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.submitchat;
        var plandate = param.year + '-' + param.month + '-' + param.day;
        connection.query(sqlstring, [param.store_id, param.userid, param.year, param.month, param.day, plandate, param.storeUser, param.chatContent, param.chatResult], function (err, result) {
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

    _dao.log(param.userid, "提交促销信息");

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

        tasks.push(function (callback) {
          var sqlstring = _sql.delpromotion;
          connection.query(sqlstring, [param.year, param.month, param.day, param.store_id, param.userid],
            function (err, result) {
              callback(err);
            });
        })

        for (var i = 0; i < product.length; i++) {
          let productInfo = product[i];
          tasks.push(function (callback) {
            var sqlstring = _sql.submitpromotion;
            connection.query(sqlstring, [param.store_id, productInfo.product_id, param.userid, param.year, param.month, param.day, productInfo.display, productInfo.pos, productInfo.count, param.confirm_user],
              function (err, result) {
                callback(err);
              });
          })
        }

        for (var i = 0; i < image.length; i++) {
          let productImage = image[i];
          tasks.push(function (callback) {
            var sqlstring = _sql.submitproductimage;
            var submitdate = param.year + "-" + param.month + "-" + param.day;
            connection.query(sqlstring, [param.store_id, productImage.brand_id || "", productImage.display_id, productImage.product_id || "", param.userid, param.year, param.month, param.day, submitdate, productImage.filename, productImage.type, productImage.category || 0],
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
  getVisitorPlan: function (req, res, next) {
    console.log('visitorDao getVisitorPlan');
    var param = req.body;
    if (!param.userid || !param.begindate || !param.enddate) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getvisitorplan;
        if (param.depart) {
          sqlstring += "and c.depart = ";
          sqlstring += connection.escape(param.depart);
        }
        sqlstring += " order by a.signin_time desc";
        connection.query(sqlstring, ["%" + param.userid + "%", "%" + param.userid + "%", param.begindate, param.enddate], function (err, result) {
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
  getVisitorChat: function (req, res, next) {
    console.log('visitorDao getVisitorChat');
    var param = req.body;
    if (!param.userid || !param.begindate || !param.enddate) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getvisitorchat;
        if (param.depart) {
          sqlstring += "and c.depart = ";
          sqlstring += connection.escape(param.depart);
        }
        sqlstring += " order by a.plan_date desc";
        connection.query(sqlstring, ["%" + param.userid + "%", "%" + param.userid + "%", param.begindate, param.enddate], function (err, result) {
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
  getVisitorMainshelf: function (req, res, next) {
    console.log('visitorDao getVisitorMainshelf');
    var param = req.body;
    if (!param.userid || !param.begindate || !param.enddate) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getvisitormainshelf;
        if (param.depart) {
          sqlstring += "and c.depart = ";
          sqlstring += connection.escape(param.depart);
        }
        sqlstring += " order by a.plan_date desc,a.store_id";
        connection.query(sqlstring, ["%" + param.userid + "%", "%" + param.userid + "%", param.begindate, param.enddate], function (err, result) {
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
  getVisitorStock: function (req, res, next) {
    console.log('visitorDao getVisitorStock');
    var param = req.body;
    if (!param.userid || !param.begindate || !param.enddate) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getvisitorstock;
        if (param.depart) {
          sqlstring += "and c.depart = ";
          sqlstring += connection.escape(param.depart);
        }
        sqlstring += "order by a.plan_date desc,a.store_id";
        connection.query(sqlstring, ["%" + param.userid + "%", "%" + param.userid + "%", param.begindate, param.enddate], function (err, result) {
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
  getVisitorShelfaway: function (req, res, next) {
    console.log('visitorDao getVisitorShelfaway');
    var param = req.body;
    if (!param.userid || !param.begindate || !param.enddate) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getvisitorshelfaway;
        if (param.depart) {
          sqlstring += "and c.depart = ";
          sqlstring += connection.escape(param.depart);
        }
        sqlstring += " order by a.plan_date desc,a.store_id,a.display_id"
        connection.query(sqlstring, ["%" + param.userid + "%", "%" + param.userid + "%", param.begindate, param.enddate], function (err, result) {
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
  getVisitorImage: function (req, res, next) {
    console.log('visitorDao getVisitorImage');
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
        var sqlstring = _sql.getvisitorimage;
        connection.query(sqlstring, [param.year, param.month, param.day, param.store_id, param.userid], function (err, result) {
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
  getShelfMain: function (req, res, next) {
    console.log('visitorDao getShelfMain');
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
        var sqlstring = _sql.getshelfmain;
        connection.query(sqlstring, [param.year, param.month, param.day, param.store_id, param.userid], function (err, result) {
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
  getStock: function (req, res, next) {
    console.log('visitorDao getStock');
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
        var sqlstring = _sql.getstock;
        connection.query(sqlstring, [param.year, param.month, param.day, param.store_id, param.userid], function (err, result) {
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
  getShelfaway: function (req, res, next) {
    console.log('visitorDao getShelfaway', req.body);
    var param = req.body;
    if (!param.year || !param.month || !param.userid) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    var shelfaway = [];
    var shelfawayCount = [];
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

        tasks.push(function (callback) {
          var sqlstring = _sql.getshelfaway;
          connection.query(sqlstring, [param.year, param.month, param.day, param.store_id, param.userid],
            function (err, result) {
              if (!err) {
                shelfaway = result;
              }
              callback(err);
            });
        });
        tasks.push(function (callback) {
          var sqlstring = _sql.getshelfawaycount;
          connection.query(sqlstring, [param.year, param.month, param.day, param.store_id, param.userid],
            function (err, result) {
              if (!err) {
                shelfawayCount = result;
              }
              callback(err);
            });
        });

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
            jsonWrite(res, { shelfaway: shelfaway, shelfawayCount: shelfawayCount }, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
  getPromotion: function (req, res, next) {
    console.log('visitorDao getPromotion');
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
        var sqlstring = _sql.getstorepromotion;
        connection.query(sqlstring, [param.year, param.month, param.day, param.store_id, param.userid], function (err, result) {
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
  getChat: function (req, res, next) {
    console.log('visitorDao getChat');
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
        var sqlstring = _sql.getchat;
        connection.query(sqlstring, [param.year, param.month, param.day, param.store_id, param.userid], function (err, result) {
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
  getRouteBasic: function (req, res, next) {
    console.log('visitorDao getRouteBasic');
    var param = req.body;
    if (!param.userid && !param.depart && !param.path) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getroutebasic;
        if (param.path) {
          sqlstring += "a.path_id like '%";
          sqlstring += param.path;
          sqlstring += "%'";
          sqlstring += "or Path_name like '%";
          sqlstring += param.path;
          sqlstring += "%'";
        } else {
          if (param.userid) {
            sqlstring += "c.store_id in (select store_id from store where user_id = ";
            sqlstring += connection.escape(param.userid);
            sqlstring += ") ";
            sqlstring += "order by a.path_seq,a.Path_id"
          } else if (param.depart) {
            sqlstring += "c.store_id in (select store_id from store where user_id in (SELECT username from user where depart = ";
            sqlstring += connection.escape(param.depart);
            sqlstring += ")) ";
            sqlstring += "order by a.path_seq,a.Path_id"
          }
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
  getRouteBasicArea: function (req, res, next) {
    console.log('visitorDao getRouteBasicArea');
    var param = req.body;
    if (!param.depart && !param.path) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getroutebasicarea;
        if (param.path) {
          sqlstring += "a.path_id like '%";
          sqlstring += param.path;
          sqlstring += "%'";
          sqlstring += "or Path_name like '%";
          sqlstring += param.path;
          sqlstring += "%'";
        } else {
          if (param.depart) {
            sqlstring += "c.store_id in (select store_id from store where user_id in (SELECT username from user where depart = ";
            sqlstring += connection.escape(param.depart);
            sqlstring += ")) ";
            sqlstring += "order by a.Path_id,a.path_seq";
          }
        }


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
  getRouteCost: function (req, res, next) {
    console.log('visitorDao getRouteCost');
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getroutecost;
        if (param.pathlist) {
          var pathlist = param.pathlist;
          pathlist = pathlist.substr(1, pathlist.length - 2);
          if (pathlist.indexOf(",") >= 0) {
            sqlstring += "and path_id in (";
            sqlstring += pathlist;
            sqlstring += ")";
          } else {
            sqlstring += "and path_id =";
            sqlstring += connection.escape(pathlist);
          }
        }
        connection.query(sqlstring, [param.routedate], function (err, result) {
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
  updateRouteCost: function (req, res, next) {
    console.log('userDao updateRouteCost');
    var param = req.body;
    _dao.log("后台", "更新路线费用标准");
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.updateroutecost;
        sqlstring += param.key;
        sqlstring += " = ";
        sqlstring += connection.escape(param.value);
        sqlstring += " on DUPLICATE KEY UPDATE ";
        sqlstring += param.key;
        sqlstring += " = ";
        sqlstring += connection.escape(param.value);
        console.log(sqlstring);
        connection.query(sqlstring, [param.routedate, parseInt(param.routetype), parseInt(param.routemark), param.path_id, param.store_id ? param.store_id : ""], function (err, result) {
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
  getPromotionSum: function (req, res, next) {
    console.log('visitorDao getPromotionSum');
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getpromotionsum;
        connection.query(sqlstring, [param.areaid, "%" + param.schedule + "%"], function (err, result) {
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
  getPromotionImage: function (req, res, next) {
    console.log('visitorDao getPromotionImage');
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getpromotionimage;
        connection.query(sqlstring, [param.areaid, param.begindate, param.enddate], function (err, result) {
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
  getPromotionAdjust: function (req, res, next) {
    console.log('userDao getPromotionAdjust');
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getpromotionadjust;
        connection.query(sqlstring, [param.pro_id], function (err, result) {
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
  updatePromotionAdjust: function (req, res, next) {
    console.log('userDao updatePromotionAdjust');
    var param = req.body;
    if (param.pro_id == null) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    _dao.log("后台", "更新促销陈列调整");
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.updatepromotionadjust;
        sqlstring += param.key;
        sqlstring += " = ";
        sqlstring += param.value;
        sqlstring += " on DUPLICATE KEY UPDATE ";
        sqlstring += param.key;
        sqlstring += " = ";
        sqlstring += param.value;
        connection.query(sqlstring, [param.pro_id, param.store_id], function (err, result) {
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
  getStockConfig: function (req, res, next) {
    console.log('userDao getStockConfig');
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getstockconfig;
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
  updateStockConfig: function (req, res, next) {
    console.log('userDao updateStockConfig');
    var param = req.body;
    _dao.log("后台", "更新库存配置");
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var tasks = [function (callback) {
          // 开启事务
          connection.beginTransaction(function (err) {
            callback(err);
          });
        }];

        for (let key in param) {
          if (key == "command") {
            continue;
          }
          console.log("updateStockConfig", key, param[key]);
          var sqlstring = _sql.updatestockconfig;
          tasks.push(function (callback) {
            connection.query(sqlstring, [key, param[key]],
              function (err, result) {
                if (!err) {
                }
                callback(err);
              });
          });
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
            jsonWrite(res, req.body, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
  getCheckPlan: function (req, res, next) {
    console.log('visitorDao getCheckPlan');
    var param = req.body;
    if (!param.userid && !param.depart) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getcheckplan;
        if (param.userid) {
          sqlstring += "and (a.userid = ";
          sqlstring += connection.escape(param.userid);
          sqlstring += " or c.realname = ";
          sqlstring += connection.escape(param.userid);
          sqlstring += ") ";
        } else if (param.depart != 0) {
          sqlstring += "and a.userid in (select username from user where depart =  ";
          sqlstring += connection.escape(param.depart);
          sqlstring += ") ";
        }

        sqlstring += "order by a.userid,a.plan_date,a.signin_time desc"

        connection.query(sqlstring, [param.begindate, param.enddate], function (err, result) {
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
  getSaleActual: function (req, res, next) {
    console.log('visitorDao getSaleActual');
    var param = req.body;
    // if (!param.userid && !param.depart) {
    //   jsonWrite(res, {}, dbcode.PARAM_ERROR);
    //   return;
    // }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getsaleactual;
        if (param.userid) {
          sqlstring += "AND a.user_id = ";
          sqlstring += connection.escape(param.userid);
        } else if (param.store_id) {
          sqlstring += "AND a.store_id = ";
          sqlstring += connection.escape(param.store_id);
        }
        sqlstring += " GROUP BY a.store_id,c.serial_no order by a.area_name,a.store_name,b.brand_name,b.series_name"
        console.log(sqlstring);
        connection.query(sqlstring, [param.year, param.month], function (err, result) {
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
  getMainshelfImage: function (req, res, next) {
    console.log('visitorDao getMainshelfImage');
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getmainshelfimage;
        connection.query(sqlstring, [param.userid, param.begindate, param.enddate], function (err, result) {
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
  getSafeStock: function (req, res, next) {
    console.log('visitorDao getSafeStock');
    var param = req.body;
    if (!param.store_id) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getsafestock;
        connection.query(sqlstring, [param.store_id, param.store_id], function (err, result) {
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
  getExpense: function (req, res, next) {
    console.log('visitorDao getExpense');
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
        var sqlstring = _sql.getexpense;
        connection.query(sqlstring, [param.userid, param.begindate, param.enddate], function (err, result) {
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
  adjustExpense: function (req, res, next) {
    console.log('visitorDao adjustExpense');
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
        var sqlstring = _sql.adjustexpense;
        connection.query(sqlstring, [param.adjustmoney, param.plandate, param.userid, param.expensetype, param.adjustmoney], function (err, result) {
          //console.log('dbresult', err, result);
          if (err) {
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            jsonWrite(res, param, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
  submitExpense: function (req, res, next) {
    console.log('visitorDao submitExpense', req.body);
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var tasks = [function (callback) {
          // 开启事务
          connection.beginTransaction(function (err) {
            callback(err);
          });
        }];

        var expenseList = JSON.parse(param.expense);
        for (var i = 0; i < expenseList.length; i++) {
          let sqlstring = _sql.submitexpense;
          let expense = expenseList[i];
          let plandate = new Date(expense.plandate).Format("yyyy-MM-dd");
          console.log("submitExpense sql", plandate, expense.expensetype, expense.userid, expense.nature, expense.fpcount || 0, expense.fpname, expense.money || "")
          tasks.push(function (callback) {
            connection.query(sqlstring, [plandate, expense.expensetype, expense.userid, expense.nature, expense.fpcount || 0, expense.fpname, expense.money || "", expense.nature, expense.fpcount || 0, expense.fpname, expense.money || ""], function (err, result) {
              if (!err) {
              }
              callback(err);
            });
          });
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
            jsonWrite(res, req.body, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
  getParttime: function (req, res, next) {
    console.log('visitorDao getParttime');
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getparttime;
        if (param.storeid) {
          sqlstring += "and a.storeid = ";
          sqlstring += connection.escape(param.storeid);
        } else if (param.userid) {
          sqlstring += "and b.user_id = ";
          sqlstring += connection.escape(param.userid);
        }
        if (param.isfinish) {
          sqlstring += "and a.isfinish = 0";
        }
        sqlstring += " order by a.entrytime desc";
        connection.query(sqlstring, [param.begindate, param.enddate, param.begindate, param.enddate], function (err, result) {
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
  submitParttime: function (req, res, next) {
    console.log('visitorDao submitParttime');
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring;
        if (param.addmode == "true") {
          sqlstring = _sql.addparttime;
          var entrytime = new Date(param.entrytime).Format('yyyy-MM-dd');
          connection.query(sqlstring, [param.storeid, param.username, param.sex, param.cardid, param.phone, param.work, param.bankcard, entrytime, param.cardidfile, param.bankcardfile], function (err, result) {
            console.log('dbresult', err, result);
            if (err) {
              jsonWrite(res, {}, dbcode.FAIL);
            } else {
              param.id = result.insertId;
              jsonWrite(res, param, dbcode.SUCCESS);
            }
            connection.release();
          });
        } else {
          sqlstring = _sql.updateparttime;
          var entrytime = new Date(param.entrytime).Format('yyyy-MM-dd');
          var quittime = null;
          if (param.quittime) {
            quittime = new Date(param.quittime).Format('yyyy-MM-dd');
          }
          connection.query(sqlstring, [param.username, param.sex, param.cardid, param.phone, param.work, param.bankcard, entrytime, param.isfinish, quittime, param.cardidfile, param.bankcardfile, param.id], function (err, result) {
            console.log('dbresult', err, result);
            if (err) {
              jsonWrite(res, {}, dbcode.FAIL);
            } else {
              jsonWrite(res, param, dbcode.SUCCESS);
            }
            connection.release();
          });
        }
      }
    });
  },
  getChartMonthUser: function (req, res, next) {
    console.log('visitorDao getChartMonthUser');
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var tasks = [function (callback) {
          // 开启事务
          connection.beginTransaction(function (err) {
            callback(err);
          });
        }];

        var sqlstring = _sql.getsaletarget_all;
        sqlstring += "group by c.realname"
        var year = parseInt(param.begindate.substr(0, 4));
        var month = parseInt(param.begindate.substr(5, 2));
        var saletarget = [];
        tasks.push(function (callback) {
          connection.query(sqlstring, [year, month, param.depart], function (err, result) {
            if (!err) {
              //console.log('saletarget',result);
              saletarget = result;
            }
            callback(err);
          });
        });

        var sqlstring2 = _sql.getsaleactual_all;
        sqlstring2 += "group by c.realname"
        var saleactual = [];
        tasks.push(function (callback) {
          connection.query(sqlstring2, [param.begindate, param.enddate, param.depart], function (err, result) {
            if (!err) {
              //console.log(result);
              saleactual = result;
            }
            callback(err);
          });
        });

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
            console.log('getChartMonthUser', 'saleactual', saleactual, "saletarget", saletarget);
            var chartdata = [];
            var getActual = function (realname) {
              for (var i = 0; i < saleactual.length; i++) {
                if (saleactual[i].realname == realname) {
                  return saleactual[i];
                }
              }
            }
            for (var i = 0; i < saletarget.length; i++) {
              var actual = getActual(saletarget[i].realname);
              if (actual) {
                chartdata.push({
                  key: actual.realname,
                  value: parseInt(actual.sum * 100 / saletarget[i].sum)
                })
              }
            }
            chartdata.sort((a, b) => {
              return b.value - a.value;
            })
            jsonWrite(res, chartdata, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
  getChartMonthSystem: function (req, res, next) {
    console.log('visitorDao getChartMonthSystem');
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var tasks = [function (callback) {
          // 开启事务
          connection.beginTransaction(function (err) {
            callback(err);
          });
        }];

        var sqlstring = _sql.getsaletarget_all;
        sqlstring += "group by e.system_name"
        var year = parseInt(param.begindate.substr(0, 4));
        var month = parseInt(param.begindate.substr(5, 2));
        var saletarget = [];
        tasks.push(function (callback) {
          connection.query(sqlstring, [year, month, param.depart], function (err, result) {
            if (!err) {
              //console.log('saletarget',result);
              saletarget = result;
            }
            callback(err);
          });
        });

        var sqlstring2 = _sql.getsaleactual_all;
        sqlstring2 += "group by e.system_name"
        var saleactual = [];
        tasks.push(function (callback) {
          connection.query(sqlstring2, [param.begindate, param.enddate, param.depart], function (err, result) {
            if (!err) {
              //console.log(result);
              saleactual = result;
            }
            callback(err);
          });
        });

        tasks.push(function (callback) {
          // 提交事务
          connection.commit(function (err) {
            callback(err);
          });
        })

        async.series(tasks, function (err, results) {
          if (err) {
            //console.log('tasks error', err);
            connection.rollback(); // 发生错误事务回滚
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            console.log('getChartMonthUser', 'saleactual', saleactual, "saletarget", saletarget);
            var chartdata = [];
            var getActual = function (system_name) {
              for (var i = 0; i < saleactual.length; i++) {
                if (saleactual[i].system_name == system_name) {
                  return saleactual[i];
                }
              }
            }
            for (var i = 0; i < saletarget.length; i++) {
              var actual = getActual(saletarget[i].system_name);
              if (actual) {
                chartdata.push({
                  key: actual.system_name,
                  value: parseInt(actual.sum * 100 / saletarget[i].sum)
                })
              }
            }
            chartdata.sort((a, b) => {
              return b.value - a.value;
            })
            jsonWrite(res, chartdata, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
  getChartActual: function (req, res, next) {
    console.log('visitorDao getChartActual');
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var tasks = [function (callback) {
          // 开启事务
          connection.beginTransaction(function (err) {
            callback(err);
          });
        }];

        var sqlstring = _sql.getsaletarget_all;
        sqlstring += " and a.system_id = ";
        sqlstring += connection.escape(param.system_id);
        sqlstring += " group by c.realname"
        var year = parseInt(param.begindate.substr(0, 4));
        var month = parseInt(param.begindate.substr(5, 2));
        var saletarget = [];
        tasks.push(function (callback) {
          connection.query(sqlstring, [year, month, param.depart], function (err, result) {
            if (!err) {
              console.log('saletarget', param.system_id, result);
              saletarget = result;
            }
            callback(err);
          });
        });

        var sqlstring2 = _sql.getsaleactual_all;
        sqlstring2 += " and a.system_id = ";
        sqlstring2 += connection.escape(param.system_id);
        sqlstring2 += " group by c.realname"
        var saleactual = [];
        tasks.push(function (callback) {
          connection.query(sqlstring2, [param.querydate, param.querydate, param.depart], function (err, result) {
            if (!err) {
              console.log('saleactual', param.system_id, result);
              saleactual = result;
            }
            callback(err);
          });
        });

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
            console.log('saleactual', saleactual, "saletarget", saletarget);
            var chartdata = [];
            var getActual = function (realname) {
              for (var i = 0; i < saleactual.length; i++) {
                if (saleactual[i].realname == realname) {
                  return saleactual[i];
                }
              }
            }
            for (var i = 0; i < saletarget.length; i++) {
              var actual = getActual(saletarget[i].realname);
              if (actual) {
                chartdata.push({
                  key: actual.realname,
                  value: actual.sum * 100 / saletarget[i].sum
                })
              }
            }
            chartdata.sort((a, b) => {
              return b.value - a.value;
            })
            jsonWrite(res, chartdata, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
  getChartPromotion: function (req, res, next) {
    console.log('visitorDao getChartPromotion');
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var tasks = [function (callback) {
          // 开启事务
          connection.beginTransaction(function (err) {
            callback(err);
          });
        }];

        var sqlstring = _sql.getsaletarget_pro;
        sqlstring += " and a.system_id = ";
        sqlstring += connection.escape(param.system_id);
        sqlstring += " group by c.realname"
        var year = parseInt(param.begindate.substr(0, 4));
        var month = parseInt(param.begindate.substr(5, 2));
        var saletarget = [];
        tasks.push(function (callback) {
          connection.query(sqlstring, [year, month, param.depart], function (err, result) {
            if (!err) {
              console.log('saletarget', param.system_id, result);
              saletarget = result;
            }
            callback(err);
          });
        });

        var sqlstring2 = _sql.getsaleactual_pro;
        sqlstring2 += " and a.system_id = ";
        sqlstring2 += connection.escape(param.system_id);
        sqlstring2 += " group by c.realname"
        var saleactual = [];
        tasks.push(function (callback) {
          connection.query(sqlstring2, [param.querydate, param.querydate, param.depart], function (err, result) {
            if (!err) {
              console.log('saleactual', param.system_id, result);
              saleactual = result;
            }
            callback(err);
          });
        });

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
            console.log('saleactual', saleactual, "saletarget", saletarget);
            var chartdata = [];
            var getActual = function (realname) {
              for (var i = 0; i < saleactual.length; i++) {
                if (saleactual[i].realname == realname) {
                  return saleactual[i];
                }
              }
            }
            for (var i = 0; i < saletarget.length; i++) {
              var actual = getActual(saletarget[i].realname);
              if (actual) {
                chartdata.push({
                  key: actual.realname,
                  value: actual.sum * 100 / saletarget[i].sum
                })
              }
            }
            chartdata.sort((a, b) => {
              return b.value - a.value;
            })
            jsonWrite(res, chartdata, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
};
