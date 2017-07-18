import React from 'react';
import styles from './home.less';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { message, Table, Icon, Input } from 'antd';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import config from '../../config';

class Expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: Store.getPlan(),
      nature: 0,
      expense: Store.getExpense(),
      subsidy: [],
      routeCost: [],
    };
    this.onClickBack = this.onClickBack.bind(this);
    this.onNatureChange = this.onNatureChange.bind(this);
    this.onSubsidyChange = this.onSubsidyChange.bind(this);
    this.onRoutecostChange = this.onRoutecostChange.bind(this);
  }

  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_SUBSIDY, this.onSubsidyChange);
    Store.addChangeListener(StoreEvent.SE_ROUTECOST, this.onRoutecostChange);
    var curDate = Store.getCurDate();

    var nature = 1;
    var expense = this.state.expense;
    for (var i = 0; i < expense.length; i++) {
      if (expense[i].expensetype == 'no') {
        nature = expense[i].nature;
        break;
      }
    }
    this.setState({ nature })

    Action.getSubsidy();

    var planpath = this.getPlanPath();
    if (planpath) {
      var routeData = {
        routedate: curDate.Format("yyyy-MM"),
        pathlist: '[' + planpath + ']'
      }
      Action.getRouteCost(routeData);
    }

    console.log("userInfo", Store.getUserInfo());
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_SUBSIDY, this.onSubsidyChange);
    Store.removeChangeListener(StoreEvent.SE_ROUTECOST, this.onRoutecostChange);
  }
  getCityLev() {
    var city_lev = 3;
    for (var i = 0; i < this.state.plan.length; i++) {
      return this.state.plan[i].city_lev;
    }
  }
  getPlanPath() {
    for (var i = 0; i < this.state.plan.length; i++) {
      var planInfo = this.state.plan[i];
      if (planInfo.plan_type == 1) {
        return planInfo.path_id;
      }
    }
  }
  onSubsidyChange(subsidy) {
    this.setState({ subsidy });
  }
  onRoutecostChange(routeCost) {
    this.setState({ routeCost })
  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, '');
  }
  onNatureChange(e, value) {
    this.setState({
      nature: value
    })
  }
  getRouteCtjt() {
    var ctjt = 0;
    var pathid = this.getPlanPath();
    if (pathid) {
      for (var i = 0; i < this.state.routeCost.length; i++) {
        var routeInfo = this.state.routeCost[i];
        if (routeInfo.path_id == pathid && routeInfo.routemark == 2) {
          ctjt += routeInfo.ctjtf ? parseInt(routeInfo.ctjtf) : 0;
        }
      }
    }
    return ctjt;
  }
  getRouteInfo(plan_date) {
    var pathid = this.getPlanPath();
    if (pathid) {
      for (var i = 0; i < this.state.routeCost.length; i++) {
        var routeInfo = this.state.routeCost[i];
        if (routeInfo.path_id == pathid && routeInfo.routemark == 1) {
          return routeInfo;
        }
      }
    }
  }
  getSubsidy(expenseType) {
    var role_id = Store.getUserInfo().role;
    var city_lev = this.getCityLev();
    var nature = this.state.nature;
    //console.log(plan_date, nature, city_lev, expenseType);
    if (expenseType == 'ctjt') {
      if (nature == 2 || nature == 3) {
        return this.getRouteCtjt();
      }
    } else if (expenseType == 'zsbt') {
      if (nature == 2) {
        var routeInfo = this.getRouteInfo();
        if (routeInfo) {
          return routeInfo.cczs;
        }
      }
    }
    for (var i = 0; i < this.state.subsidy.length; i++) {
      if (this.state.subsidy[i].role_id == role_id) {
        var subsidyInfo = this.state.subsidy[i];
        if (expenseType == "wcbt") {
          if (city_lev == 1) {
            return subsidyInfo.gzdcf1;
          } else if (city_lev == 2) {
            return subsidyInfo.gzdcf2;
          } else if (city_lev == 3) {
            return subsidyInfo.gzdcf3;
          }
        } else if (expenseType == "snjt") {
          if (nature == 2 || nature == 3) {
            return 0;
          }
          if (city_lev == 1) {
            return subsidyInfo.gzdjt1;
          } else if (city_lev == 2) {
            return subsidyInfo.gzdjt2;
          } else if (city_lev == 3) {
            return subsidyInfo.gzdjt3;
          }
        } else if (expenseType == "ccdsnjt") {
          if (nature == 1 || nature == 4) {
            return 0;
          }
          if (city_lev == 1) {
            return subsidyInfo.ccjt1;
          } else if (city_lev == 2) {
            return subsidyInfo.ccjt2;
          } else if (city_lev == 3) {
            return subsidyInfo.ccjt3;
          }
        } else if (expenseType == "ccbt") {
          if (nature == 1 || nature == 4) {
            return 0;
          }
          if (city_lev == 1) {
            return subsidyInfo.ccbt1;
          } else if (city_lev == 2) {
            return subsidyInfo.ccbt2;
          } else if (city_lev == 3) {
            return subsidyInfo.ccbt3;
          }
        }
      }
    }
    return 0;
  }
  onClickAddImage(product_id) {
    var store = this.props.userdata;
    var srcType = Camera.PictureSourceType.CAMERA;
    var options = this.setOptions(srcType);
    var context = this;
    navigator.camera.getPicture(function cameraSuccess(imageUri) {

      window.resolveLocalFileSystemURL(imageUri, function success(fileEntry) {
        // Do something with the FileEntry object, like write to it, upload it, etc.
        // writeFile(fileEntry, imgUri);
        console.log("got file: " + fileEntry.fullPath);
        message.info("正在上传照片");

        var fileURL = fileEntry.fullPath;
        function win(r) {

          message.info("上传照片成功");
          var response = JSON.parse(r.response);

          var files = context.state.file;
          if (files[product_id] == undefined) {
            files[product_id] = [];
          }
          files[product_id].push({
            response: response,
            imageUri: imageUri
          });
          context.setState({ file: files })
          //console.log("Code = " + r.responseCode);
          //alert("Response = " + r.response);
          //console.log("Sent = " + r.bytesSent);
        }

        function fail(error) {
          alert("An error has occurred: Code = " + error.code);
          console.log("upload error source " + error.source);
          console.log("upload error target " + error.target);
        }

        var uri = encodeURI(config.domain_name + "/visitor/upload");

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";

        var ft = new FileTransfer();
        ft.onprogress = function (progressEvent) {
          if (progressEvent.lengthComputable) {
            //loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
          } else {
            //loadingStatus.increment();
          }
        };
        ft.upload(imageUri, uri, win, fail, options);
      }, function () {
      });

    }, function cameraError(error) {
      console.debug("Unable to obtain picture: " + error, "app");

    }, options);
  }
  removePhoto(imageUri) {
    var files = this.state.file;
    for (var product in files) {
      var filelist = files[product];
      for (var i = 0; i < filelist.length; i++) {
        if (filelist[i].imageUri == imageUri) {
          filelist.splice(i, 1);
          break;
        }
      }
    }
    this.setState({ file: files })
  }
  getPhotolist(file) {
    return <div className={styles.photoblock}>
      <img src={file.imageUri} />
      <Icon onClick={function () { context.removePhoto(file.imageUri) }} style={{ position: 'absolute', right: '0', fontSize: '20px', color: 'white' }} type="close" />
    </div>
  }
  render() {
    const { finished, stepIndex } = this.state;
    var expenseStyle = {
      paperStyle_nophoto: {
        positon: 'relative',
        height: '70px',
        margin: '5px 15px 10px'
      },
      paperStyle: {
        positon: 'relative',
        height: '190px',
        margin: '5px 15px 10px'
      },
      titleStyle: {
        padding: '5px',
        color: 'white',
        backgroundColor: '#0A99AB',
      }
    }

    var ccdjtfile = null;
    return (
      <div className={styles.container}>
        <AppBar
          style={{ paddingTop: config.titlebarPadding }}
          title='费用报销'
          onLeftIconButtonTouchTap={this.onClickBack}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton label="提交" />}
        />
        <div style={{ top: config.contentTop }} className={styles.content}>
          <Subheader>今日拜访类型</Subheader>
          <RadioButtonGroup onChange={this.onNatureChange} style={{ padding: '0 15px' }} name="shipSpeed" valueSelected={this.state.nature}>
            <RadioButton
              value={1}
              label="室内拜访"
              style={{ marginBottom: "16px" }}
            />
            <RadioButton
              value={2}
              label="出差住宿"
              style={{ marginBottom: "16px" }}
            />
            <RadioButton
              value={3}
              label="出差不住宿"
              style={{ marginBottom: "16px" }}
            />
          </RadioButtonGroup>
          <Subheader>今日费用申请</Subheader>
          <Paper style={expenseStyle.paperStyle_nophoto} zDepth={1}>
            <p style={expenseStyle.titleStyle}>误餐费</p>
            <div className={styles.expenseContent}>
              <div className={styles.expenseCell}>
                <p>标准</p>
                <p>{this.getSubsidy("wcbt")}</p>
              </div>
            </div>
          </Paper>
          {this.state.nature == 1 ?
            <Paper style={expenseStyle.paperStyle_nophoto} zDepth={1}>
              <p style={expenseStyle.titleStyle}>市内交通费</p>
              <div className={styles.expenseContent}>
                <div className={styles.expenseCell}>
                  <p>标准</p>
                  <p>{this.getSubsidy("snjt")}</p>
                </div>
              </div>
            </Paper>
            : null}

          {this.state.nature == 2 || this.state.nature == 3 ? [
            <Paper style={expenseStyle.paperStyle_nophoto} zDepth={1}>
              <p style={expenseStyle.titleStyle}>出差补贴</p>
              <div className={styles.expenseContent}>
                <div className={styles.expenseCell}>
                  <p>标准</p>
                  <p>{this.getSubsidy("ccbt")}</p>
                </div>
              </div>
            </Paper>,
            <Paper style={expenseStyle.paperStyle} zDepth={1}>
              <p style={expenseStyle.titleStyle}>出差地交通费</p>
              <div className={styles.expenseContent}>
                <div className={styles.expenseCell}>
                  <p>标准</p>
                  <p>{this.getSubsidy("ccdsnjt")}</p>
                </div>
              </div>
              <div className={styles.expenseContent}>
                <div className={styles.expenseCell}>
                  <p>发票数</p>
                  <Input value={12} onChagne={function (e) { context.onPosChange(product.Product_id, e.target.value) }} placeholder="请填写"
                    style={{ width: '80px' }}
                  />
                </div>
                <div className={styles.line}></div>
                <div className={styles.expenseCell}>
                  <p>报销数</p>
                  <Input value={12} onChagne={function (e) { context.onPosChange(product.Product_id, e.target.value) }} placeholder="请填写"
                    style={{ width: '80px' }}
                  />
                </div>
              </div>
              <div className={styles.photocontent}>
                {ccdjtfile ? this.getPhotolist(ccdjtfile) :
                  <div className={styles.addPhotoButton} onClick={function () { context.onClickAddImage(product.Product_id) }}>
                    <Icon type="plus" style={{ fontSize: '18px', marginBottom: '5px' }} />
                    <div className="ant-upload-text">添加照片</div>
                  </div>}
              </div>
            </Paper>,
            <Paper style={expenseStyle.paperStyle} zDepth={1}>
              <p style={expenseStyle.titleStyle}>长途交通费</p>
              <div className={styles.expenseContent}>
                <div className={styles.expenseCell}>
                  <p>标准</p>
                  <p>{this.getSubsidy("ctjt")}</p>
                </div>
              </div>
              <div className={styles.expenseContent}>
                <div className={styles.expenseCell}>
                  <p>发票数</p>
                  <Input value={12} onChagne={function (e) { context.onPosChange(product.Product_id, e.target.value) }} placeholder="请填写"
                    style={{ width: '80px' }}
                  />
                </div>
                <div className={styles.line}></div>
                <div className={styles.expenseCell}>
                  <p>报销数</p>
                  <Input value={12} onChagne={function (e) { context.onPosChange(product.Product_id, e.target.value) }} placeholder="请填写"
                    style={{ width: '80px' }}
                  />
                </div>
              </div>
              <div className={styles.photocontent}>
                {ccdjtfile ? this.getPhotolist(ccdjtfile) :
                  <div className={styles.addPhotoButton} onClick={function () { context.onClickAddImage(product.Product_id) }}>
                    <Icon type="plus" style={{ fontSize: '18px', marginBottom: '5px' }} />
                    <div className="ant-upload-text">添加照片</div>
                  </div>}
              </div>
            </Paper>
          ] : null}
          {this.state.nature == 2 ?
            <Paper style={expenseStyle.paperStyle} zDepth={1}>
              <p style={expenseStyle.titleStyle}>住宿补贴</p>
              <div className={styles.expenseContent}>
                <div className={styles.expenseCell}>
                  <p>标准</p>
                  <p>{this.getSubsidy("zsbz")}</p>
                </div>
              </div>
              <div className={styles.expenseContent}>
                <div className={styles.expenseCell}>
                  <p>发票数</p>
                  <Input value={12} onChagne={function (e) { context.onPosChange(product.Product_id, e.target.value) }} placeholder="请填写"
                    style={{ width: '80px' }}
                  />
                </div>
                <div className={styles.line}></div>
                <div className={styles.expenseCell}>
                  <p>报销数</p>
                  <Input value={12} onChagne={function (e) { context.onPosChange(product.Product_id, e.target.value) }} placeholder="请填写"
                    style={{ width: '80px' }}
                  />
                </div>
              </div>
              <div className={styles.photocontent}>
                {ccdjtfile ? this.getPhotolist(ccdjtfile) :
                  <div className={styles.addPhotoButton} onClick={function () { context.onClickAddImage(product.Product_id) }}>
                    <Icon type="plus" style={{ fontSize: '18px', marginBottom: '5px' }} />
                    <div className="ant-upload-text">添加照片</div>
                  </div>}
              </div>
            </Paper> : null}
        </div>
      </div>
    );
  }
}

export default Expense;