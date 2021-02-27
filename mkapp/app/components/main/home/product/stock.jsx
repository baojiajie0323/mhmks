import React from 'react';
import styles from '../home.less';


import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { message, Collapse, Upload, Icon, Modal, Input } from 'antd';
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
import config from '../../../config';
const confirm = Modal.confirm;

import { cyan800, cyan100, cyan600, green600, indigo600, red600 } from 'material-ui/styles/colors';
const Panel = Collapse.Panel;


class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      brand: Store.getBrand(),
      product: Store.getProduct(this.props.userdata.store_id),
      previewVisible: false,
      previewImage: '',
      file: {},
      preSaveProduct: [],
      visible: false,
    };
    this.onClickBack = this.onClickBack.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.handleUploadChange = this.handleUploadChange.bind(this);
    this.onBrandChange = this.onBrandChange.bind(this);
    this.onProductChange = this.onProductChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onClickAddImage = this.onClickAddImage.bind(this);
    this.removePhoto = this.removePhoto.bind(this);
    this.onStockChange = this.onStockChange.bind(this);
    this.onVisitorImage = this.onVisitorImage.bind(this);
    this.handleStockCancel = this.handleStockCancel.bind(this);
    this.handleStockOk = this.handleStockOk.bind(this);
    this.onClickStock = this.onClickStock.bind(this);
    this.onCountChange = this.onCountChange.bind(this);
    this.onOnwayChange = this.onOnwayChange.bind(this);
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    console.log('handlePreview', file);
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleUploadChange(file, brand_id) {
    console.log('handleUploadChange', file, brand_id);
    var files = this.state.file;

    files[brand_id] = file.fileList;
    this.setState({ file: files })
  }

  addToPreSaveProduct(product) {
    var preSaveProduct = this.state.preSaveProduct;
    for (var i = 0; i < preSaveProduct.length; i++) {
      if (preSaveProduct[i].Product_id == product.Product_id) {
        if (product.count == "" && product.onway == "") {
          preSaveProduct.splice(i, 1);
        } else {
          preSaveProduct[i] = product;
        }
        this.setState({ preSaveProduct });
        return true;
      }
    }
    preSaveProduct.push(product);
    this.setState({ preSaveProduct });
  }

  getPreSaveProduct(product) {

    var preSaveProduct = this.state.preSaveProduct;
    for (var i = 0; i < preSaveProduct.length; i++) {
      if (preSaveProduct[i].Product_id == product.Product_id) {
        return preSaveProduct[i];
      }
    }
  }

  onTextChange(product, value) {

  }

  onOnwayChange(e) {
    this.setState({
      stockOnway: e.target.value
    })
    this._product.onway = e.target.value;
    this.addToPreSaveProduct(this._product);
  }
  onCountChange(e) {
    this.setState({
      stockCount: e.target.value
    })
    this._product.count = e.target.value;
    this.addToPreSaveProduct(this._product);
  }

  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_BRAND, this.onBrandChange);
    Store.addChangeListener(StoreEvent.SE_PRODUCT, this.onProductChange);
    Store.addChangeListener(StoreEvent.SE_STOCK_SUBMIT, this.onSumitSuccess);
    Store.addChangeListener(StoreEvent.SE_STOCK, this.onStockChange);
    Store.addChangeListener(StoreEvent.SE_VISITOR_IMAGE, this.onVisitorImage);


    this.checkBrand();
    this.checkProductList();

    var curDate = Store.getCurDate();
    Action.getStock({
      year: curDate.getFullYear(),
      month: curDate.getMonth() + 1,
      day: curDate.getDate(),
      userid: localStorage.username,
      store_id: this.props.userdata.store_id,
    });
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_BRAND, this.onBrandChange);
    Store.removeChangeListener(StoreEvent.SE_PRODUCT, this.onProductChange);
    Store.removeChangeListener(StoreEvent.SE_STOCK_SUBMIT, this.onSumitSuccess);
    Store.removeChangeListener(StoreEvent.SE_STOCK, this.onStockChange);
    Store.removeChangeListener(StoreEvent.SE_VISITOR_IMAGE, this.onVisitorImage);

  }
  onSumitSuccess() {
    Store.emit(StoreEvent.SE_VIEW, 'doplanview');
  }
  checkBrand() {
    if (this.state.brand.length <= 0) {
      Action.getBrand();
    }
  }
  onBrandChange() {
    this.setState({
      brand: Store.getBrand()
    })
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

  handleStockCancel() {
    this._product.count = this.oldstockCount;
    this._product.onway = this.oldstockOnway;
    this.addToPreSaveProduct(this._product);
    this.setState({
      visible: false,

    })
  }

  handleStockOk() {
    this.setState({
      visible: false
    })
  }

  onClickStock(product) {
    console.log("onClickStock", product);
    var preSave = this.getPreSaveProduct(product);
    this._product = product;
    var context = this;
    var count = preSave ? preSave.count : "";
    var onway = preSave ? preSave.onway : "";
    this.oldstockCount = count;
    this.oldstockOnway = onway;
    setTimeout(function () {
      context.setState({
        visible: true,
        title: product.Product_name,
        stockCount: count,
        stockOnway: onway,
      })
    }, 200);
  }

  onStockChange(preSaveProduct) {
    preSaveProduct.forEach((sp) => {
      sp.Product_id = sp.product_id;
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
      store_id: this.props.userdata.store_id,
    });
    console.log('onStockChange', preSaveProduct);
  }

  onVisitorImage(imageList) {
    var files = this.state.file;
    for (var i = 0; i < imageList.length; i++) {
      if (imageList[i].type == 2) {
        var file = {};
        if (!files.hasOwnProperty(imageList[i].brand_id)) {
          files[imageList[i].brand_id] = [];
        }
        var response = { data: { uuid: imageList[i].filename } };
        file.response = response;
        file.imageUri = config.domain_name + "/upload/" + imageList[i].filename + ".jpg";
        files[imageList[i].brand_id].push(file);
      }
    }
    this.setState({ file: files });
    console.log(files);
  }

  getProductDom(Brand_id) {
    var productList = [];
    var context = this;
    for (let i = 0; i < this.state.product.length; i++) {
      let product = this.state.product[i];
      var product_count = 0;
      var product_onway = 0;
      var product_presave = this.getPreSaveProduct(product);
      var stockInfo = "";
      if (product_presave) {
        product_count = product_presave.count;
        product_onway = product_presave.onway;
        stockInfo = (product_count || 0) + " / " + (product_onway || 0);
        if(!product_count && !product_onway){
          stockInfo = "";
        }
      }
      if (product.Brand_id == Brand_id) {
        productList.push(<ListItem
          leftAvatar={<Avatar
            color={"white"}
            backgroundColor={product.status == 1 ? green600 : red600}
            style={{ fontSize: '12px' }}
          >
            {product.status == 1 ? "正常" : "下架"}
          </Avatar>}

          rightIconButton={<p onClick={function () { context.onClickStock(product) }} style={{ marginTop: '14px' }}>
            {stockInfo}
          </p>}
          primaryText={product.Product_name}
          secondaryText={product.Serial_no}
          disableTouchRipple={true}
          onTouchTap={function () { context.onClickStock(product) }}
        />);
      }
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
      product: [],
      image: [],
    }
    data.product = this.state.preSaveProduct.map((product) => {
      return {
        product_id: product.Product_id,
        count: product.count,
        onway: product.onway,
      }
    })

    for (var brand in this.state.file) {
      var filelist = this.state.file[brand];
      console.log("filelsit", filelist);
      for (var i = 0; i < filelist.length; i++) {
        var file = filelist[i];
        data.image.push({
          filename: file.response.data.uuid,
          brand_id: brand,
          display_id: 0,
          type: 2
        })
      }
    }

    data.product = JSON.stringify(data.product);
    data.image = JSON.stringify(data.image);

    Action.submitStock(data);
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

  onClickAddImage(brand_id) {
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
          if (files[brand_id] == undefined) {
            files[brand_id] = [];
          }
          files[brand_id].push({
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
    for (var brand in files) {
      var filelist = files[brand];
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
        <Icon onClick={function () { context.removePhoto(file.imageUri) }} style={{ position: 'absolute', right: '0', fontSize: '20px', color: 'white' }} type="close" />
      </div>
    })
    return photoDom;
  }


  getPanel() {
    const { previewVisible, previewImage, file } = this.state;
    var panelList = [];
    var context = this;
    for (var i = 0; i < this.state.brand.length; i++) {
      let brand = this.state.brand[i];
      var fileList = [];
      if (file.hasOwnProperty(brand.Brand_id)) {
        fileList = file[brand.Brand_id];
      }

      //console.log("getPanel", file, fileList, brand.Brand_id)

      const uploadButton = (
        <div className={styles.addPhotoButton} onClick={function () { context.onClickAddImage(brand.Brand_id) }}>
          <Icon type="plus" style={{ fontSize: '18px', marginBottom: '5px' }} />
          <div className="ant-upload-text">添加照片</div>
        </div>
      );
      panelList.push(<Panel header={brand.Brand_name} key={i.toString()}>
        {/*<Upload
          multiple
          action="/visitor/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={function (file) { context.handleUploadChange(file, brand.Brand_id) } }
          showUploadList={{
            showPreviewIcon: false,
            showRemoveIcon: true
          }}
          >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>*/}
        <div className={styles.photocontent}>
          {this.getPhotolist(fileList)}
          {fileList.length >= 5 ? null : uploadButton}
        </div>
        <Modal maskClosable={false} visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <Paper zDepth={0} className={styles.headtitle}>
          <p>产品/货号</p>
          <p>库存/在途</p>
        </Paper>
        {this.getProductDom(brand.Brand_id)}
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
          title='库存采集'
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
        <Modal
          title={this.state.title}
          visible={this.state.visible}
          onOk={this.handleStockOk}
          onCancel={this.handleStockCancel}
          maskClosable={false}
        >
          <div className={styles.stockModalcontent}>
            <p>库存量：</p>
            <Input value={this.state.stockCount} onChange={this.onCountChange} />
          </div>
          <div className={styles.stockModalcontent}>
            <p>在途量：</p>
            <Input value={this.state.stockOnway} onChange={this.onOnwayChange} />
          </div>
        </Modal>
      </div>
    );
  }
}

export default Stock;