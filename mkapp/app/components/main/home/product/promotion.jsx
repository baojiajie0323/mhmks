import React from 'react';
import styles from '../home.less';


import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { message } from 'antd';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';


import { cyan800, cyan100, cyan600 } from 'material-ui/styles/colors';

class Promotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.onClickBack = this.onClickBack.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onStoreUser = this.onStoreUser.bind(this);
    this.onChatContent = this.onChatContent.bind(this);
    this.onChatResult = this.onChatResult.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.storeUser = "";
    this.chatContent = "";
    this.chatResult = "";
  }

  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_CHAT_SUBMIT, this.onSumitSuccess);
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_CHAT_SUBMIT, this.onSumitSuccess);
  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, 'doplanview');
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
    Store.emit(StoreEvent.SE_VIEW, 'doplanview');
  }
  onClickSubmit() {
    this.setState({ open: true })
  }
  handleClose() {
    this.setState({ open: false });
  }

  handleSubmit() {
    var curDate = Store.getCurDate();
    var data = {
      store_id: this.props.userdata.store_id,
      userid: localStorage.username,
      year: curDate.getFullYear(),
      month: curDate.getMonth() + 1,
      day: curDate.getDate(),
      storeUser: this.storeUser,
      chatContent: this.chatContent,
      chatResult: this.chatResult
    }
    Action.submitChat(data);
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
          title='洽谈记录'
          onLeftIconButtonTouchTap={this.onClickBack}
          onRightIconButtonTouchTap={this.onClickSubmit}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton label="提交" />}
          />

        <div className={[styles.content, styles.content_notoolbar].join(' ') }>
          <Subheader>{this.props.userdata.Store_name}</Subheader>
          <div style={{ padding: '0 18px' }}>
            <TextField
              hintText="请输入"
              floatingLabelText="门店对接人"
              fullWidth={true}
              floatingLabelFixed={true}
              onChange={this.onStoreUser}
              />
            <TextField
              hintText="请输入"
              floatingLabelText="洽谈内容"
              multiLine={true}
              fullWidth={true}
              floatingLabelFixed={true}
              onChange={this.onChatContent}
              rows={3}
              />
            <TextField
              hintText="请输入"
              floatingLabelText="洽谈结果"
              multiLine={true}
              fullWidth={true}
              floatingLabelFixed={true}
              onChange={this.onChatResult}
              rows={3}
              />
          </div>
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

export default Promotion;