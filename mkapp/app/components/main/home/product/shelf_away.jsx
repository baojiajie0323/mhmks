import React from 'react';
import styles from '../home.less';

import $ from 'jquery';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { message, Collapse, Upload, Icon, Modal } from 'antd';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import AddIcon from 'material-ui/svg-icons/content/add';
import MinusIcon from 'material-ui/svg-icons/content/remove';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import config from '../../../config';
const confirm = Modal.confirm;

import { cyan800, cyan100, cyan600, green600, indigo600, red600 } from 'material-ui/styles/colors';
const Panel = Collapse.Panel;

var displayInfo = [{
  display_id: 5,
  display_name: "挂条"
}, {
  display_id: 6,
  display_name: "网片"
}, {
  display_id: 7,
  display_name: "陈列架"
}]

class Shelf_away extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      product: Store.getProduct(this.props.userdata.store_id),
      previewVisible: false,
      previewImage: '',
      file: {},
      preSaveProduct: [],
      preSaveCount: {},
    };
    this.onClickBack = this.onClickBack.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.handleUploadChange = this.handleUploadChange.bind(this);
    this.onProductChange = this.onProductChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onClickAddImage = this.onClickAddImage.bind(this);
    this.removePhoto = this.removePhoto.bind(this);
    this.onShelfAwayChange = this.onShelfAwayChange.bind(this);
    this.onVisitorImage = this.onVisitorImage.bind(this);
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    console.log('handlePreview', file);
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleUploadChange(file, display_id) {
    console.log('handleUploadChange', file, display_id);
    var files = this.state.file;

    files[display_id] = file.fileList;
    this.setState({ file: files })
  }

  addToPreSaveProduct(product) {
    var preSaveProduct = this.state.preSaveProduct;
    var newProduct = {};
    $.extend(newProduct, product);
    for (var i = 0; i < preSaveProduct.length; i++) {
      if (preSaveProduct[i].Product_id == newProduct.Product_id &&
        preSaveProduct[i].display_id == newProduct.display_id
      ) {
        if (newProduct.check == false) {
          preSaveProduct.splice(i, 1);
        } else {
          preSaveProduct[i] = newProduct;
        }
        this.setState({ preSaveProduct });
        return true;
      }
    }
    preSaveProduct.push(newProduct);
    this.setState({ preSaveProduct });
  }

  onCheckChange(product, display_id, value) {
    product.check = value;
    product.display_id = display_id;
    this.addToPreSaveProduct(product);
  }

  getPreSaveProduct(product, display_id) {
    var preSaveProduct = this.state.preSaveProduct;
    for (var i = 0; i < preSaveProduct.length; i++) {
      if (preSaveProduct[i].Product_id == product.Product_id &&
        preSaveProduct[i].display_id == display_id) {
        return true;
      }
    }
    return false;
  }

  getPreSaveProductCount(display_id) {
    var preSaveCount = this.state.preSaveCount;
    if (preSaveCount.hasOwnProperty(display_id)) {
      return preSaveCount[display_id];
    }
    return "";
  }

  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_PRODUCT, this.onProductChange);
    Store.addChangeListener(StoreEvent.SE_SHELFAWAY_SUBMIT, this.onSumitSuccess);
    Store.addChangeListener(StoreEvent.SE_SHELFAWAY, this.onShelfAwayChange);
    Store.addChangeListener(StoreEvent.SE_VISITOR_IMAGE, this.onVisitorImage);

    this.checkProductList();
    var curDate = Store.getCurDate();
    Action.getShelfAway({
      year: curDate.getFullYear(),
      month: curDate.getMonth() + 1,
      day: curDate.getDate(),
      userid: localStorage.username,
      store_id: this.props.userdata.store_id,
    });
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_PRODUCT, this.onProductChange);
    Store.removeChangeListener(StoreEvent.SE_SHELFAWAY_SUBMIT, this.onSumitSuccess);
    Store.removeChangeListener(StoreEvent.SE_SHELFAWAY, this.onShelfAwayChange);
    Store.removeChangeListener(StoreEvent.SE_VISITOR_IMAGE, this.onVisitorImage);

  }
  onSumitSuccess() {
    Store.emit(StoreEvent.SE_VIEW, 'doplanview');
  }

  checkProductList() {
    if (this.state.product.length <= 0) {
      var store = this.props.userdata;
      Action.getProductbyStore({
        store_id: store.store_id
      });
    }
  }
  onProductChange() {
    this.setState({
      product: Store.getProduct(this.props.userdata.store_id)
    })
  }

  onTextChange(display_id, value) {
    var preSaveCount = this.state.preSaveCount;
    preSaveCount[display_id] = value;
    this.setState({ preSaveCount });
  }

  onShelfAwayChange(data) {
    data.shelfaway.forEach((sp) => {
      sp.Product_id = sp.product_id;
    })
    var shelfawayCount = {};
    data.shelfawayCount.forEach((sp) => {
      shelfawayCount[sp.display_id] = sp.count;
    })
    this.setState({
      preSaveProduct: data.shelfaway,
      preSaveCount: shelfawayCount
    })
    var curDate = Store.getCurDate();
    Action.getVisitorImage({
      year: curDate.getFullYear(),
      month: curDate.getMonth() + 1,
      day: curDate.getDate(),
      userid: localStorage.username,
      store_id: this.props.userdata.store_id,
    });
    console.log('onShelfAwayChange', data.shelfaway, shelfawayCount);
  }

  onVisitorImage(imageList) {
    var files = this.state.file;
    for (var i = 0; i < imageList.length; i++) {
      if (imageList[i].type == 1) {
        var file = {};
        if (!files.hasOwnProperty(imageList[i].display_id)) {
          files[imageList[i].display_id] = [];
        }
        var response = { data: { uuid: imageList[i].filename } };
        file.response = response;
        file.imageUri = config.domain_name + "/upload/" + imageList[i].filename + ".jpg";
        files[imageList[i].display_id].push(file);
      }
    }
    this.setState({ file: files });
    console.log(files);
  }

  getProductDom(display_id) {
    var productList = [];
    var context = this;
    var count = this.getPreSaveProductCount(display_id);
    productList.push(<ListItem
      disableTouchRipple={true}
      rightIconButton={<TextField
        value={count}
        onChange={function (e, value) { context.onTextChange(display_id, value) } }
        style={{ width: '80px' }}
        hintStyle={{ textAlign: 'right', width: '100%', paddingRight: '10px' }}
        inputStyle={{ textAlign: 'right', paddingRight: '10px' }}
        hintText="0"
        />}
      primaryText="总陈列"
      />)
    for (let i = 0; i < this.state.product.length; i++) {
      let product = this.state.product[i];
      var checked = this.getPreSaveProduct(product, display_id);
      productList.push(<ListItem
        disableTouchRipple={true}
        leftCheckbox={<Checkbox
          checked={checked}
          onCheck={function (e, checked) { context.onCheckChange(product, display_id, checked) } }
          />}
        rightAvatar={<Avatar
          color={"white"}
          backgroundColor={product.status == 1 ? green600 : red600}
          style={{ fontSize: '12px' }}
          >
          {product.status == 1 ? "正常" : "下架"}
        </Avatar>}
        primaryText={product.Product_name}
        secondaryText={product.Serial_no}
        />);
    }
    return productList;
  }

  onClickSubmit() {
    var context = this;
    confirm({
      title: '确定要提交数据吗？',
      onOk() {
        context.handleSubmit();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    //this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false });
  }
  handleSubmit() {
    this.setState({ open: false });
    var curDate = Store.getCurDate();
    var data = {
      year: curDate.getFullYear(),
      month: curDate.getMonth() + 1,
      day: curDate.getDate(),
      userid: localStorage.username,
      store_id: this.props.userdata.store_id,
      count: this.state.preSaveCount,
      product: [],
      image: [],
    }
    data.product = this.state.preSaveProduct.map((product) => {
      return {
        product_id: product.Product_id,
        display_id: product.display_id
      }
    })

    for (var display in this.state.file) {
      var filelist = this.state.file[display];
      console.log("filelsit", filelist);
      for (var i = 0; i < filelist.length; i++) {
        var file = filelist[i];
        data.image.push({
          filename: file.response.data.uuid,
          brand_id: "",
          display_id: display,
          type: 1
        })
      }
    }

    data.product = JSON.stringify(data.product);
    data.image = JSON.stringify(data.image);
    data.count = JSON.stringify(data.count);

    Action.submitShelfaway(data);
  }

  setOptions(srcType) {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: config.quality,
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

  onClickAddImage(display_id) {    
    var store = this.props.userdata;
    var srcType = store.plan_type == 3 ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA;
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
          if (files[display_id] == undefined) {
            files[display_id] = [];
          }
          files[display_id].push({
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
    for (var display in files) {
      var filelist = files[display];
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
        <img src={file.imageUri} /><Icon onClick={function () { context.removePhoto(file.imageUri) } } style={{ position: 'absolute', right: '0', fontSize: '20px', color: 'white' }} type="close" />
      </div>
    })
    return photoDom;
  }


  getPanel() {
    const { previewVisible, previewImage, file } = this.state;
    var panelList = [];
    var context = this;
    for (var i = 0; i < displayInfo.length; i++) {
      let display = displayInfo[i];
      var fileList = [];
      if (file.hasOwnProperty(display.display_id)) {
        fileList = file[display.display_id];
      }

      //console.log("getPanel", file, fileList, brand.Brand_id)

      const uploadButton = (
        <div className={styles.addPhotoButton} onClick={function () { context.onClickAddImage(display.display_id) } }>
          <Icon type="plus" style={{ fontSize: '18px', marginBottom: '5px' }} />
          <div className="ant-upload-text">添加照片</div>
        </div>
      );
      panelList.push(<Panel header={display.display_name} key={i.toString()}>
        <div className={styles.photocontent}>
          {this.getPhotolist(fileList)}
          {fileList.length >= 5 ? null : uploadButton}
        </div>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        {this.getProductDom(display.display_id)}
      </Panel>
      )
    }
    return panelList;
  }

  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, 'doplanview');
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
    return (
      <div className={styles.container}>
        <AppBar
          style={{ paddingTop: config.titlebarPadding }}
          title='离架陈列'
          onLeftIconButtonTouchTap={this.onClickBack}
          onRightIconButtonTouchTap={this.onClickSubmit}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton label="提交" />}
          />

        <div style={{ top: config.contentTop }} className={styles.content}>
          <Subheader>{this.props.userdata.Store_name}</Subheader>
          <Collapse accordion >
            {this.getPanel()}
          </Collapse>
        </div>
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

export default Shelf_away;