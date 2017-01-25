
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
          console.log('dbresult', err,JSON.stringify(result));
          if(err){
            jsonWrite(res, {}, dbcode.LOGIN_FAIL);
          }else{
            jsonWrite(res, result, dbcode.SUCCESS);
          }
          connection.release();
        });
      }
    });
  },
  getStoreBasic: function (req, res, next) {
    console.log('infoDao getStoreBasic');
    pool.getConnection(function (err, connection) {
      if (connection == undefined) {
        jsonWrite(res, {}, dbcode.CONNECT_ERROR);
        return;
      } else {
        var sqlstring = _sql.getstorebasic;
        connection.query(sqlstring, [], function (err, result) {
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
};
