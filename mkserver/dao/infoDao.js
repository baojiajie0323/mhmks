
var _dao = require('./dao');
var _sql = require('./sqlMapping');

var pool = _dao.getPool();
var jsonWrite = _dao.jsonWrite;
var dbcode = _dao.dbcode;

module.exports = {
  getStoreArea: function (req, res, next) {
    console.log('infoDao getStoreArea');
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getstorearea;
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
  getStoreBasic: function (req, res, next) {
    console.log('infoDao getStoreBasic', req.body);

    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getstorebasic;
        if (param.username) {
          sqlstring += ' where user_id = ' + connection.escape(param.username);
          sqlstring += ' and acti = "Y"';
        } else if(param.depart) {
          sqlstring += ' where user_id in (select username from user where depart = ';
          sqlstring += connection.escape(param.depart);
          sqlstring += ')';
          sqlstring += ' and acti = "Y"';
        }
        console.log(sqlstring);
        connection.query(sqlstring, [], function (err, result) {
          //console.log('dbresult', result);
          //if (result.length > 0) {
          if (err) {
            jsonWrite(res, {}, dbcode.FAIL);
          } else {
            jsonWrite(res, result, dbcode.SUCCESS);
          }
          // } else {
          //   jsonWrite(res, {}, dbcode.FAIL);
          // }
          connection.release();
        });
      }
    });
  },
  getStoreContacts: function (req, res, next) {
    console.log('infoDao getStoreContacts');
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getstorecontacts;
        connection.query(sqlstring, [], function (err, result) {
          //console.log('dbresult', result);
          if (result.length > 0) {
            jsonWrite(res, result, dbcode.SUCCESS);
          } else {
            jsonWrite(res, {}, dbcode.FAIL);
          }
          connection.release();
        });
      }
    });
  },
  getStoreDisplay: function (req, res, next) {
    console.log('infoDao getStoreDisplay');
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getstoredisplay;
        connection.query(sqlstring, [], function (err, result) {
          //console.log('dbresult', result);
          if (result.length > 0) {
            jsonWrite(res, result, dbcode.SUCCESS);
          } else {
            jsonWrite(res, {}, dbcode.FAIL);
          }
          connection.release();
        });
      }
    });
  },
  getProduct: function (req, res, next) {
    console.log('infoDao getProduct');
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getproduct;
        connection.query(sqlstring, [], function (err, result) {
          //console.log('dbresult', result);
          if (result.length > 0) {
            jsonWrite(res, result, dbcode.SUCCESS);
          } else {
            jsonWrite(res, {}, dbcode.FAIL);
          }
          connection.release();
        });
      }
    });
  },
  getProductPrice: function (req, res, next) {
    console.log('infoDao getProductPrice', req.body);
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getproductpricecount;
        connection.query(sqlstring, [], function (err, result) {
          var nCount = result[0]['count(*)'];
          //console.log('dbresult', result, nCount);
          sqlstring = _sql.getproductprice;
          connection.query(sqlstring, [parseInt(param.page)], function (err, result) {
            //console.log('dbresult', result);
            if (result.length > 0) {
              jsonWrite(res, result, dbcode.SUCCESS, nCount);
            } else {
              jsonWrite(res, {}, dbcode.FAIL);
            }
            connection.release();
          });
        });
      }
    });
  },
  getProductStock: function (req, res, next) {
    console.log('infoDao getProductStock');
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getproductstockcount;
        connection.query(sqlstring, [], function (err, result) {
          var nCount = result[0]['count(*)'];
          //console.log('dbresult', result, nCount);
          sqlstring = _sql.getproductstock;
          connection.query(sqlstring, [parseInt(param.page)], function (err, result) {
            //console.log('dbresult', result);
            if (result.length > 0) {
              jsonWrite(res, result, dbcode.SUCCESS, nCount);
            } else {
              jsonWrite(res, {}, dbcode.FAIL);
            }
            connection.release();
          });
        });
      }
    });
  },
  getProductBrand: function (req, res, next) {
    console.log('infoDao getProductBrand');
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getproductbrand;
        connection.query(sqlstring, [], function (err, result) {
          //console.log('dbresult', result);
          if (result.length > 0) {
            jsonWrite(res, result, dbcode.SUCCESS);
          } else {
            jsonWrite(res, {}, dbcode.FAIL);
          }
          connection.release();
        });
      }
    });
  },
  getPromotionType: function (req, res, next) {
    console.log('infoDao getPromotionType');
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getpromotiontype;
        connection.query(sqlstring, [], function (err, result) {
          //console.log('dbresult', result);
          if (result.length > 0) {
            jsonWrite(res, result, dbcode.SUCCESS);
          } else {
            jsonWrite(res, {}, dbcode.FAIL);
          }
          connection.release();
        });
      }
    });
  },
  getPromotion: function (req, res, next) {
    console.log('infoDao getPromotion');
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getpromotioncount;
        connection.query(sqlstring, [], function (err, result) {
          var nCount = result[0]['count(*)'];
          //console.log('dbresult', result, nCount);
          sqlstring = _sql.getpromotion;
          connection.query(sqlstring, [parseInt(param.page)], function (err, result) {
            //console.log('dbresult', result);
            if (result.length > 0) {
              jsonWrite(res, result, dbcode.SUCCESS, nCount);
            } else {
              jsonWrite(res, {}, dbcode.FAIL);
            }
            connection.release();
          });
        });
      }
    });
  },
  getProductByStore: function (req, res, next) {
    console.log('infoDao getProductByStore', req.body);
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getproductbystore;
        connection.query(sqlstring, [param.store_id], function (err, result) {
          //console.log('dbresult', result);
          if (result.length > 0) {
            jsonWrite(res, result, dbcode.SUCCESS);
          } else {
            jsonWrite(res, {}, dbcode.FAIL);
          }
          connection.release();
        });
      }
    });
  },
  getPromotionByStore: function (req, res, next) {
    console.log('infoDao getPromotionByStore', req.body);
    var param = req.body;
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getpromotionbystore;
        var nowdate = new Date().Format("yyyy-MM-dd");
        //nowdate = "2017-04-02";
        connection.query(sqlstring, [param.store_id, nowdate], function (err, result) {
          console.log('dbresult', result);
          //          if (result.length > 0) {
          jsonWrite(res, result, dbcode.SUCCESS);
          // } else {
          //   jsonWrite(res, {}, dbcode.FAIL);
          // }
          connection.release();
        });
      }
    });
  },
};
