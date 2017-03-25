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
      file: {}
      // {
      //   uid: -1,
      //   name: 'xxx.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // }
    };
    this.preSaveProduct = [];
    this.preSaveCount = {};
    this.onClickBack = this.onClickBack.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.handleUploadChange = this.handleUploadChange.bind(this);
    this.onProductChange = this.onProductChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
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
    var newProduct = {};
    $.extend(newProduct,product);
    for (var i = 0; i < this.preSaveProduct.length; i++) {
      if (this.preSaveProduct[i].Product_id == newProduct.Product_id &&
          this.preSaveProduct[i].display_id == newProduct.display_id
      ) {
        if (newProduct.check == false) {
          this.preSaveProduct.splice(i, 1);
        } else {
          this.preSaveProduct[i] = newProduct;
        }
        return true;
      }
    }
    this.preSaveProduct.push(newProduct);
  }

  onCheckChange(product,display_id, value) {
    console.log("onCheckChange",display_id);
    product.check = value;
    product.display_id = display_id;
    console.log(this.preSaveProduct);
    this.addToPreSaveProduct(product);
    console.log(this.preSaveProduct);
  }

  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_PRODUCT, this.onProductChange);
    Store.addChangeListener(StoreEvent.SE_SHELFAWAY_SUBMIT, this.onSumitSuccess);

    this.checkProductList();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_PRODUCT, this.onProductChange);
    Store.removeChangeListener(StoreEvent.SE_SHELFAWAY_SUBMIT, this.onSumitSuccess);
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

  onTextChange(display_id,value){
    this.preSaveCount[display_id] = value;
  }

  getProductDom(display_id) {
    var productList = [];
    var context = this;
    productList.push(<ListItem
          rightIconButton={<TextField
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
      productList.push(<ListItem
        leftCheckbox={<Checkbox 
          onCheck={function (e, checked) { context.onCheckChange(product,display_id, checked) } }
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
      count:this.preSaveCount,
      product: [],
      image: [],
    }
    data.product = this.preSaveProduct.map((product) => {
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
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">添加照片</div>
        </div>
      );
      panelList.push(<Panel header={display.display_name} key={i.toString()}>
        <Upload
          multiple
          action="/visitor/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={function (file) { context.handleUploadChange(file, display.display_id) } }
          showUploadList={{
            showPreviewIcon: false,
            showRemoveIcon: true
          }}
          >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
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
          style={{ paddingTop: '20px' }}
          title='离架陈列'
          onLeftIconButtonTouchTap={this.onClickBack}
          onRightIconButtonTouchTap={this.onClickSubmit}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton label="提交" />}
          />

        <div className={[styles.content, styles.content_notoolbar].join(' ')}>
          <Subheader>{this.props.userdata.Store_name}</Subheader>
          <Collapse accordion defaultActiveKey={['0']}>
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