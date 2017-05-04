var express = require('express');
var router = express.Router();
var multer = require('multer');
var formidable = require('formidable');
var fs = require('fs');
var visitorDao = require('../dao/visitorDao');
var _dao = require('../dao/dao');
var UPLOAD_FOLDER = '/upload/';
var UUID = require('node-uuid');
var upload = multer({ dest: 'public/upload/' })


var jsonWrite = _dao.jsonWrite;
var dbcode = _dao.dbcode;

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  console.log('visitor :' + JSON.stringify(req.body));
  if (req.body.command == "getpath") {
    console.log('getpath');
    visitorDao.getPath(req, res, next);
  } else if (req.body.command == "getpathdetail") {
    console.log('getpathdetail');
    visitorDao.getPathDetail(req, res, next);
  } else if (req.body.command == "getpath_app") {
    console.log('getpath_app');
    visitorDao.getPath_app(req, res, next);
  } else if (req.body.command == "getplan") {
    console.log('getplan');
    visitorDao.getPlan(req, res, next);
  } else if (req.body.command == "updateplan") {
    console.log('updateplan');
    visitorDao.updatePlan(req, res, next);
  } else if (req.body.command == "addplan") {
    console.log('addplan');
    visitorDao.addPlan(req, res, next);
  } else if (req.body.command == "delplan") {
    console.log('delplan');
    visitorDao.delPlan(req, res, next);
  } else if (req.body.command == "getplansum") {
    console.log('getplansum');
    visitorDao.getPlanSum(req, res, next);
  } else if (req.body.command == "sign") {
    console.log('sign');
    visitorDao.sign(req, res, next);
  } else if (req.body.command == "checksign") {
    console.log('checksign');
    visitorDao.checkSign(req, res, next);
  } else if (req.body.command == "getsignlist") {
    console.log('getsignlist');
    visitorDao.getSignList(req, res, next);
  } else if (req.body.command == "submitshelfmain") {
    console.log('submitshelfmain');
    visitorDao.submitShelfMain(req, res, next);
  } else if (req.body.command == "submitstock") {
    console.log('submitstock');
    visitorDao.submitStock(req, res, next);
  } else if (req.body.command == "submitshelfaway") {
    console.log('submitshelfaway');
    visitorDao.submitShelfAway(req, res, next);
  } else if (req.body.command == "submitchat") {
    console.log('submitchat');
    visitorDao.submitChat(req, res, next);
  } else if (req.body.command == "submitpromotion") {
    console.log('submitpromotion');
    visitorDao.submitPromotion(req, res, next);
  } else if (req.body.command == "getvisitorplan") {
    console.log('getvisitorplan');
    visitorDao.getVisitorPlan(req, res, next);
  } else if (req.body.command == "getvisitorimage") {
    console.log('getvisitorimage');
    visitorDao.getVisitorImage(req, res, next);
  }
});

router.post('/upload/', upload.single('file'), function (req, res, next) {
  console.log("upload", req.file);
  var uuid = UUID.v1();
  var avatarName = uuid + '.jpg';
  var newPath = req.file.destination + avatarName;
  fs.renameSync(req.file.path, newPath);  //重命名
  jsonWrite(res, { uuid: uuid }, dbcode.SUCCESS);

  _dao.log("","上传照片");
})

// router.post('/upload/', function (req, res, next) {
//   console.log('upload image');
//   var form = new formidable.IncomingForm();   //创建上传表单
//   form.encoding = 'utf-8';		//设置编辑
//   form.uploadDir = 'public' + UPLOAD_FOLDER;	 //设置上传目录
//   form.keepExtensions = true;	 //保留后缀
//   form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
//   var uuid = UUID.v1();
//   form.parse(req, function (err, fields, files) {
//     console.log('upload parse', err, fields, JSON.stringify(files));
//     if (err) {
//       console.log('upload err', err);
//       res.locals.error = err;
//       return;
//     }

//     var extName = '';  //后缀名
//     console.log('files.type', files.file.type);
//     switch (files.file.type) {
//       case 'image/pjpeg':
//         extName = 'jpg';
//         break;
//       case 'image/jpeg':
//         extName = 'jpg';
//         break;
//       case 'image/png':
//         extName = 'png';
//         break;
//       case 'image/x-png':
//         extName = 'png';
//         break;
//     }

//     if (extName.length == 0) {
//       res.locals.error = '只支持png和jpg格式图片';

//       console.log('upload err 只支持png和jpg格式图片');
//       return;
//     }

//     var avatarName = uuid + '.' + extName;
//     var newPath = form.uploadDir + avatarName;

//     console.log(newPath);
//     fs.renameSync(files.file.path, newPath);  //重命名

//     //jsonWrite(res,{},dbcode.SUCCESS);
//     //res.locals.success = '上传成功';

//     console.log('上传成功');
//   });
//   jsonWrite(res, { uuid: uuid }, dbcode.SUCCESS);
// });

module.exports = router;
