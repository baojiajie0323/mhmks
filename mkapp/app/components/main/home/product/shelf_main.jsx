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


import { cyan800, cyan100, cyan600, green600, indigo600, red600 } from 'material-ui/styles/colors';
const Panel = Collapse.Panel;


class Shelf_main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    };
    this.onClickBack = this.onClickBack.bind(this);
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    console.log('handlePreview',file);
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })


  componentDidMount() {
  }
  componentWillUnmount() {
  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, 'doplanview', this.props.userdata);
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">添加照片</div>
      </div>
    );
    const {finished, stepIndex} = this.state;

    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

    return (
      <div className={styles.container}>
        <AppBar
          style={{ paddingTop: '20px' }}
          title='主货架陈列'
          onLeftIconButtonTouchTap={this.onClickBack}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton label="提交" />}
          />

        <div className={[styles.content, styles.content_notoolbar].join(' ') }>
          <Subheader>上海大润发松江店</Subheader>
          <Collapse accordion defaultActiveKey={['1']}>
            <Panel header="巧姿" key="1">
              <Upload
                action="/visitor/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                showUploadList={{
                  showPreviewIcon:false,
                  showRemoveIcon:true
                }}
                >
                {fileList.length >= 3 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
              <div className={styles.listItem}>
                <Avatar icon={<FileFolder />} />
                <div className={styles.textcontent}>
                  <p className={styles.primaryText}>巧姿马桶垫1组装</p>
                  <p className={styles.secondaryText}>31700279</p>
                </div>
                <IconButton
                  style={{ width: 32, height: 32, padding: 4 }}>
                  <MinusIcon color='rgb(192,192,192)' />
                </IconButton>
                <TextField
                  style={{ width: '35px' }}
                  hintStyle={{ textAlign: 'center', width: '100%' }}
                  inputStyle={{ textAlign: 'center' }}
                  hintText="0"
                  />
                <IconButton
                  style={{ width: 32, height: 32, padding: 4 }}>
                  <AddIcon color='rgb(192,192,192)' />
                </IconButton>
              </div>
              <Divider />
              <div className={styles.listItem}>
                <Avatar icon={<FileFolder />} />
                <div className={styles.textcontent}>
                  <p className={styles.primaryText}>巧姿马桶垫1组装</p>
                  <p className={styles.secondaryText}>31700279</p>
                </div>
                <IconButton
                  style={{ width: 32, height: 32, padding: 4 }}>
                  <MinusIcon color='rgb(192,192,192)' />
                </IconButton>
                <TextField
                  style={{ width: '35px' }}
                  hintStyle={{ textAlign: 'center', width: '100%' }}
                  inputStyle={{ textAlign: 'center' }}
                  hintText="0"
                  />
                <IconButton
                  style={{ width: 32, height: 32, padding: 4 }}>
                  <AddIcon color='rgb(192,192,192)' />
                </IconButton>
              </div>

              <Divider />
            </Panel>
            <Panel header="好好先生" key="2">
              <p>{text}</p>
            </Panel>
            <Panel header="满好" key="3">
              <p>{text}</p>
            </Panel>
            <Panel header="巧心" key="4">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default Shelf_main;