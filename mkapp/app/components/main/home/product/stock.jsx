import React from 'react';
import styles from '../home.less';


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
import config from '../../../config';


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
      file: {}
      // {
      //   uid: -1,
      //   name: 'xxx.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // }
    };
    this.preSaveProduct = [];
    this.onClickBack = this.onClickBack.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.handleUploadChange = this.handleUploadChange.bind(this);
    this.onBrandChange = this.onBrandChange.bind(this);
    this.onProductChange = this.onProductChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onClickAddImage = this.onClickAddImage.bind(this);
    this.removePhoto = this.removePhoto.bind(this);
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
    for (var i = 0; i < this.preSaveProduct.length; i++) {
      if (this.preSaveProduct[i].Product_id == product.Product_id) {
        if (product.count == "") {
          this.preSaveProduct.splice(i, 1);
        } else {
          this.preSaveProduct[i] = product;
        }
        return true;
      }
    }
    this.preSaveProduct.push(product);
  }

  onTextChange(product, value) {
    product.count = value;
    this.addToPreSaveProduct(product);
    console.log('onTextChange', this.preSaveProduct);
  }

  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_BRAND, this.onBrandChange);
    Store.addChangeListener(StoreEvent.SE_PRODUCT, this.onProductChange);
    Store.addChangeListener(StoreEvent.SE_STOCK_SUBMIT, this.onSumitSuccess);

    this.checkBrand();
    this.checkProductList();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_BRAND, this.onBrandChange);
    Store.removeChangeListener(StoreEvent.SE_PRODUCT, this.onProductChange);
    Store.removeChangeListener(StoreEvent.SE_STOCK_SUBMIT, this.onSumitSuccess);
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

  getProductDom(Brand_id) {
    var productList = [];
    var context = this;
    for (let i = 0; i < this.state.product.length; i++) {
      let product = this.state.product[i];
      if (product.Brand_id == Brand_id) {
        productList.push(<ListItem
          leftAvatar={<Avatar
            color={"white"}
            backgroundColor={product.status == 1 ? green600 : red600}
            style={{ fontSize: '12px' }}
            >
            {product.status == 1 ? "正常" : "下架"}
          </Avatar>}
          rightIconButton={<TextField
            onChange={function (e, value) { context.onTextChange(product, value) } }
            style={{ width: '80px' }}
            hintStyle={{ textAlign: 'right', width: '100%', paddingRight: '10px' }}
            inputStyle={{ textAlign: 'right', paddingRight: '10px' }}
            hintText="0"
            />}
          primaryText={product.Product_name}
          secondaryText={product.Serial_no}
          />);
      }
    }
    return productList;
  }

  onClickSubmit() {
    this.setState({ open: true })
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
    data.product = this.preSaveProduct.map((product) => {
      return {
        product_id: product.Product_id,
        count: product.count
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
      quality: 100,
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

        var uri = encodeURI("http://116.246.2.202:6115/visitor/upload");

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
        <Icon onClick={function () { context.removePhoto(file.imageUri) } } style={{ position: 'absolute', right: '0', fontSize: '20px', color: 'white' }} type="close" />
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
        <div className={styles.addPhotoButton} onClick={function () { context.onClickAddImage(brand.Brand_id) } }>
          <Icon type="plus" style={{ fontSize: '18px', marginBottom: '5px' }}/>
          <div className="ant-upload-text">添加照片</div>
        </div>
      );
      panelList.push(<Panel header={brand.Brand_name} key={i.toString() }>
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
          {this.getPhotolist(fileList) }
          {fileList.length >= 3 ? null : uploadButton}
        </div>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <Paper zDepth={0} className={styles.headtitle}>
          <p>产品/货号</p>
          <p>库存数</p>
        </Paper>
        {this.getProductDom(brand.Brand_id) }
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

        <div style={{top:config.contentTop}} className={styles.content}>
          <Subheader>{this.props.userdata.Store_name}</Subheader>
          <Collapse accordion defaultActiveKey={['0']}>
            {this.getPanel() }
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

export default Stock;