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


import { cyan800, cyan100, cyan600, green600, indigo600, red600 } from 'material-ui/styles/colors';
const Panel = Collapse.Panel;


class Shelf_main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: Store.getBrand(),
      product: Store.getProduct(),
      previewVisible: false,
      previewImage: '',
      fileList: [
        // {
        //   uid: -1,
        //   name: 'xxx.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // }
      ],
    };
    this.onClickBack = this.onClickBack.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.handleUploadChange = this.handleUploadChange.bind(this);
    this.onBrandChange = this.onBrandChange.bind(this);
    this.onProductChange = this.onProductChange.bind(this);
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    console.log('handlePreview', file);
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleUploadChange(file) {
    console.log('handleUploadChange', file);
    this.setState({ fileList: file.fileList })
  }


  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_BRAND, this.onBrandChange);
    Store.addChangeListener(StoreEvent.SE_PRODUCT, this.onProductChange);

    this.checkBrand();
    this.checkProductList();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_BRAND, this.onBrandChange);
    Store.removeChangeListener(StoreEvent.SE_PRODUCT, this.onProductChange);
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
      Action.getProductbyStore();
    }
  }
  onProductChange(){
    this.setState({
      product: Store.getProduct({
        store_id:this.props.userdata.store_id
      })
    })
  }

  onClickSubmit() {
    console.log('onClickSubmit', this.state.fileList);
  }

  getPanel() {
    const { previewVisible, previewImage, fileList } = this.state;
    var panelList = [];
    for (var i = 0; i < this.state.brand.length; i++) {
      var brand = this.state.brand[i];
      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">添加照片</div>
        </div>
      );
      panelList.push(<Panel header={brand.Brand_name} key={i.toString() }>
        <Upload
          multiple
          action="/visitor/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleUploadChange}
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
        <Paper className={styles.headtitle}>
          <p>产品/货号</p>
          <p>排面数</p>
        </Paper>
        <ListItem
          leftAvatar={<Avatar icon={<FileFolder />} />}
          rightIconButton={<TextField
            style={{ width: '80px' }}
            hintStyle={{ textAlign: 'right', width: '100%', paddingRight: '10px' }}
            inputStyle={{ textAlign: 'right', paddingRight: '10px' }}
            hintText="0"
            />}
          primaryText="巧姿马桶垫1组装"
          secondaryText="31700279"
          />
        <ListItem
          leftAvatar={<Avatar icon={<FileFolder />} />}
          rightIconButton={<TextField
            style={{ width: '80px' }}
            hintStyle={{ textAlign: 'right', width: '100%', paddingRight: '10px' }}
            inputStyle={{ textAlign: 'right', paddingRight: '10px' }}
            hintText="0"
            />}
          primaryText="巧姿马桶垫1组装"
          secondaryText="31700279"
          />
      </Panel>
      )
    }
    return panelList;
  }

  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, 'doplanview');
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          style={{ paddingTop: '20px' }}
          title='主货架陈列'
          onLeftIconButtonTouchTap={this.onClickBack}
          onRightIconButtonTouchTap={this.onClickSubmit}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton label="提交" />}
          />

        <div className={[styles.content, styles.content_notoolbar].join(' ') }>
          <Subheader>{this.props.userdata.Store_name}</Subheader>
          <Collapse accordion defaultActiveKey={['0']}>
            {this.getPanel() }
          </Collapse>
        </div>
      </div>
    );
  }
}

export default Shelf_main;