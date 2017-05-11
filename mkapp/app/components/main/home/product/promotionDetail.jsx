import React from 'react';
import styles from '../home.less';


import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { message, Upload, Icon, Input, Select, Modal } from 'antd';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { orange500, blue500 } from 'material-ui/styles/colors';
import config from '../../../config';

const Option = Select.Option;

import { cyan800, cyan100, cyan600 } from 'material-ui/styles/colors';

class PromotionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promotion: Store.getPromotionByStore(this.props.userdata.store.store_id),
      file: {},
      previewVisible: false,
      previewImage: '',
      open: false,
      preSaveProduct: [],
    };
    this.onClickBack = this.onClickBack.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onStoreUser = this.onStoreUser.bind(this);
    this.onChatContent = this.onChatContent.bind(this);
    this.onChatResult = this.onChatResult.bind(this);
    this.handleUploadChange = this.handleUploadChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSumitSuccess = this.onSumitSuccess.bind(this);

    this.onPosChange = this.onPosChange.bind(this);
    this.onCountChange = this.onCountChange.bind(this);
    this.onDisplayChange = this.onDisplayChange.bind(this);

    this.onClickAddImage = this.onClickAddImage.bind(this);
    this.removePhoto = this.removePhoto.bind(this);
    this.onPromotionChange = this.onPromotionChange.bind(this);
    this.onVisitorImage = this.onVisitorImage.bind(this);

    this.displayType = [{
      Display_id: 1,
      Display_name: '堆箱'
    }, {
      Display_id: 2,
      Display_name: '叠篮'
    }, {
      Display_id: 3,
      Display_name: '端架'
    }]
  }

  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_PROMOTION_SUBMIT, this.onSumitSuccess);
    Store.addChangeListener(StoreEvent.SE_STORE_PROMOTION, this.onPromotionChange);
    Store.addChangeListener(StoreEvent.SE_VISITOR_IMAGE, this.onVisitorImage);
    var curDate = Store.getCurDate();
    Action.getPromotion({
      year: curDate.getFullYear(),
      month: curDate.getMonth() + 1,
      day: curDate.getDate(),
      userid: localStorage.username,
      store_id: this.props.userdata.store.store_id,
    });
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_PROMOTION_SUBMIT, this.onSumitSuccess);
    Store.removeChangeListener(StoreEvent.SE_STORE_PROMOTION, this.onPromotionChange);
    Store.removeChangeListener(StoreEvent.SE_VISITOR_IMAGE, this.onVisitorImage);

  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, 'promotionview', this.props.userdata.store);
  }
  onStoreUser(e, value) {
    this.storeUser = value;
  }
  onChatContent(e, value) {
    this.chatContent = value;
  }
  onChatResult(e, value) {
    this.chatResult = value;
  }
  onSumitSuccess() {
    Store.emit(StoreEvent.SE_VIEW, 'promotionview', this.props.userdata.store);
  }
  onClickSubmit() {
    this.setState({ open: true })
  }
  handleClose() {
    this.setState({ open: false });
  }

  onPromotionChange(preSaveProduct) {
    console.log('onPromotionChange', preSaveProduct);
    preSaveProduct.forEach((sp) => {
      sp.Product_id = sp.product_id;
      sp.display = sp.display_id;
    })

    this.setState({
      preSaveProduct
    })
    var curDate = Store.getCurDate();
    Action.getVisitorImage({
      year: curDate.getFullYear(),
      month: curDate.getMonth() + 1,
      day: curDate.getDate(),
      userid: localStorage.username,
      store_id: this.props.userdata.store.store_id,
    });
  }

  onVisitorImage(imageList) {
    var files = this.state.file;
    for (var i = 0; i < imageList.length; i++) {
      if (imageList[i].type == 3) {
        var file = {};
        if (!files.hasOwnProperty(imageList[i].product_id)) {
          files[imageList[i].product_id] = [];
        }
        var response = { data: { uuid: imageList[i].filename } };
        file.response = response;
        file.imageUri = config.domain_name + "/upload/" + imageList[i].filename + ".jpg";
        files[imageList[i].product_id].push(file);
      }
    }
    this.setState({ file: files });
    console.log(files);
  }

  getPreSaveDisplayid(product) {
    console.log("getPreSaveDisplayid", this.state.preSaveProduct);
    var preSaveProduct = this.state.preSaveProduct;
    for (var i = 0; i < preSaveProduct.length; i++) {
      if (preSaveProduct[i].Product_id == product.Product_id) {
        return preSaveProduct[i].display;
      }
    }
    return "";
  }
  getPreSaveDisplaypos(product) {
    var preSaveProduct = this.state.preSaveProduct;
    for (var i = 0; i < preSaveProduct.length; i++) {
      if (preSaveProduct[i].Product_id == product.Product_id) {
        return preSaveProduct[i].pos;
      }
    }
    return "";
  }
  getPreSaveDisplaycount(product) {
    var preSaveProduct = this.state.preSaveProduct;
    for (var i = 0; i < preSaveProduct.length; i++) {
      if (preSaveProduct[i].Product_id == product.Product_id) {
        return preSaveProduct[i].count;
      }
    }
    return "";
  }

  onPosChange(Product_id, value) {
    console.log("onPosChange", value, Product_id);
    var preSaveProduct = this.state.preSaveProduct;
    for (var i = 0; i < preSaveProduct.length; i++) {
      var product = preSaveProduct[i];
      if (product.Product_id == Product_id) {
        product.pos = value;
        this.setState({
          preSaveProduct
        })
        return;
      }
    }
    var data = {
      Product_id: Product_id,
      pos: value
    }
    preSaveProduct.push(data);
    this.setState({
      preSaveProduct
    })
  }

  onCountChange(Product_id, value) {
    console.log("onCountChange", value, Product_id);
    var preSaveProduct = this.state.preSaveProduct;
    for (var i = 0; i < preSaveProduct.length; i++) {
      var product = preSaveProduct[i];
      if (product.Product_id == Product_id) {
        product.count = value;
        this.setState({
          preSaveProduct
        })
        return;
      }
    }
    var data = {
      Product_id: Product_id,
      count: value
    }
    preSaveProduct.push(data);
    this.setState({
      preSaveProduct
    })
  }

  onDisplayChange(Product_id, value) {
    console.log("onDisplayChange", value, Product_id);
    var preSaveProduct = this.state.preSaveProduct;
    for (var i = 0; i < preSaveProduct.length; i++) {
      var product = preSaveProduct[i];
      if (product.Product_id == Product_id) {
        product.display = value;
        this.setState({
          preSaveProduct
        })
        return;
      }
    }
    var data = {
      Product_id: Product_id,
      display: value
    }
    preSaveProduct.push(data);
    this.setState({
      preSaveProduct
    })
  }

  handleUploadChange(file, product_id) {
    console.log('handleUploadChange', file, product_id);
    var files = this.state.file;

    files[product_id] = file.fileList;
    this.setState({ file: files })
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    console.log('handlePreview', file);
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  getProductList(pro) {
    var promotion = this.state.promotion;
    var productList = [];
    for (var i = 0; i < promotion.length; i++) {
      if (promotion[i].Pro_name == pro.Pro_name &&
        promotion[i].Promotion_type == pro.Promotion_type) {
        productList.push(promotion[i]);
      }
    }
    return productList;
  }

  getPromotionDom() {
    var context = this;

    var nowDate = new Date();
    var pmDom = [];

    var pm = this.props.userdata.pm;
    var proBeginDate = new Date(pm.Date3);
    var proEndDate = new Date(pm.Date4);
    var proState = "";
    var diff = 0;
    var diffkey = "";
    var titleStyle = [styles.titlebar];
    if (nowDate < proBeginDate) {
      proState = "未开档"
      titleStyle.push(styles.orangeBkColor);
      diff = parseInt(Math.abs(nowDate - proBeginDate) / 1000 / 60 / 60 / 24) + 1;
      diffkey = "距开始天数";
    } else {
      proState = "档期中";
      diff = parseInt(Math.abs(nowDate - proEndDate) / 1000 / 60 / 60 / 24) + 1;
      if (diff > pm.Day) {
        diff = pm.Day;
      }
      diffkey = "剩余天数";
    }
    var productList = this.getProductList(pm);
    var diff = parseInt(Math.abs(nowDate - proEndDate) / 1000 / 60 / 60 / 24) + 1;
    if (diff > pm.Day) {
      diff = pm.Day;
    }
    return <Paper zDepth={1} className={[styles.promotionPanel, styles.nomargin].join(' ')}>
      <div className={titleStyle.join(' ')}>
        <p>{pm.Pro_name}</p>
        <p>{pm.promotion_name}</p>
      </div>
      <div className={styles.content}>
        <p>{"日期：" + proBeginDate.Format("yyyy-MM-dd ") + "至" + proEndDate.Format(" yyyy-MM-dd")}</p>
        <p>{proState}</p>
      </div>
      <div className={styles.footbar}>
        <div className={styles.footcontent}>
          <p>促销天数</p>
          <p>{pm.Day + '天'}</p>
        </div>
        <p className={styles.line}></p>
        <div className={styles.footcontent}>
          <p>{diffkey}</p>
          <p>{diff + '天'}</p>
        </div>
        <p className={styles.line}></p>
        <div className={styles.footcontent}>
          <p>产品数量</p>
          <p>{productList.length + "个"}</p>
        </div>
      </div>
    </Paper>

  }

  setOptions(srcType) {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: false,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
  }

  onClickAddImage(product_id) {
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

  getPhotolist(fileList) {
    var photoDom = [];
    var context = this;
    photoDom = fileList.map((file) => {
      return <div className={styles.photoblock}>
        <img src={file.imageUri} />
        <Icon onClick={function () { context.removePhoto(file.imageUri) } } style={{ position: 'absolute', right: '0', fontSize: '20px', color: 'white' }} type="close" />
      </div>
    })
    return photoDom;
  }

  getProduct() {
    var context = this;
    var pm = this.props.userdata.pm;
    var productList = this.getProductList(pm);
    var productDom = [];
    for (var i = 0; i < productList.length; i++) {
      let product = productList[i];

      var fileList = [];
      if (this.state.file.hasOwnProperty(product.Product_id)) {
        fileList = this.state.file[product.Product_id];
      }

      const uploadButton = (
        <div className={styles.addPhotoButton} onClick={function () { context.onClickAddImage(product.Product_id) } }>
          <Icon type="plus" style={{ fontSize: '18px', marginBottom: '5px' }} />
          <div className="ant-upload-text">添加照片</div>
        </div>
      );
      var displayid = this.getPreSaveDisplayid(product);
      var displaypos = this.getPreSaveDisplaypos(product);
      var displaycount = this.getPreSaveDisplaycount(product);
      console.log("displayid", displayid);
      productDom.push(<div className={styles.productcontent}>
        <Paper zDepth={1} className={styles.productPanel}>
          <div className={styles.titlebar}>
            {product.product_name}
          </div>
          <div className={styles.head}>
            <div className={styles.headcontent}>
              <p>目标实销量</p>
              <p>未知</p>
            </div>
            <p className={styles.line}></p>
            <div className={styles.headcontent}>
              <p>累计实销量</p>
              <p>未知</p>
            </div>
          </div>
          <div className={styles.photocontent}>
            {this.getPhotolist(fileList)}
            {fileList.length >= 5 ? null : uploadButton}

          </div>
          <div className={styles.usercontent}>
            <div className={styles.form}>
              <div className={styles.formcontent}>
                <p style={{ color: orange500 }}>陈列方式</p>
                <Select value={displayid.toString()} onChange={function (value) { context.onDisplayChange(product.Product_id, value) } }
                  placeholder="请选择" style={{ width: 100 }}>
                  {this.displayType.map((dp) => {
                    return <Option value={dp.Display_id.toString()}>{dp.Display_name}</Option>
                  })}
                </Select>
              </div>
              <div className={styles.formcontent}>
                <p style={{ color: orange500 }}>陈列位置</p>
                <Input value={displaypos} onChange={function (e) { context.onPosChange(product.Product_id, e.target.value) } } placeholder="请填写"
                  style={{ width: '100px' }}
                  />
              </div>
              <div className={styles.formcontent}>
                <p style={{ color: orange500 }}>陈列数量</p>
                <Input value={displaycount} onChange={function (e) { context.onCountChange(product.Product_id, e.target.value) } } placeholder="请填写"
                  style={{ width: '100px' }} />
              </div>
            </div>
          </div>
        </Paper>
      </div>);
    }
    return productDom;
  }

  handleSubmit() {
    var curDate = Store.getCurDate();
    var data = {
      year: curDate.getFullYear(),
      month: curDate.getMonth() + 1,
      day: curDate.getDate(),
      userid: localStorage.username,
      store_id: this.props.userdata.store.store_id,
      product: [],
      image: [],
      confirm_user: '',
    }
    console.log("preSaveProduct", this.state.preSaveProduct);
    data.product = this.state.preSaveProduct.map((product) => {
      return {
        product_id: product.Product_id,
        count: product.count,
        pos: product.pos,
        display: product.display
      }
    })

    for (var productid in this.state.file) {
      var filelist = this.state.file[productid];
      console.log("filelsit", filelist);
      for (var i = 0; i < filelist.length; i++) {
        var file = filelist[i];
        data.image.push({
          filename: file.response.data.uuid,
          product_id: productid,
          display_id: 0,
          type: 3
        })
      }
    }

    data.product = JSON.stringify(data.product);
    data.image = JSON.stringify(data.image);

    Action.submitPromotion(data);
  }
  render() {
    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleClose}
        />,
      <FlatButton
        label="确定"
        primary={true}
        onTouchTap={this.handleSubmit}
        />,
    ];

    const items = [
      <MenuItem key={1} value={1} primaryText="Never" />,
      <MenuItem key={2} value={2} primaryText="Every Night" />,
      <MenuItem key={3} value={3} primaryText="Weeknights" />,
      <MenuItem key={4} value={4} primaryText="Weekends" />,
      <MenuItem key={5} value={5} primaryText="Weekly" />,
    ];
    const { previewVisible, previewImage } = this.state;
    return (
      <div className={styles.container}>
        <AppBar
          style={{ paddingTop: config.titlebarPadding }}
          title='促销详情'
          onLeftIconButtonTouchTap={this.onClickBack}
          onRightIconButtonTouchTap={this.onClickSubmit}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton label="提交" />}
          />

        <div style={{ top: config.contentTop }} className={styles.content}>
          {this.getPromotionDom()}
          {this.getProduct()}
        </div>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          >
          确定要提交数据吗？
        </Dialog>
      </div>
    );
  }
}

export default PromotionDetail;