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


import { cyan800, cyan100, cyan600 } from 'material-ui/styles/colors';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onClickBack = this.onClickBack.bind(this);
  }

  componentDidMount() {
  }
  componentWillUnmount() {
  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, 'doplanview');
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          style={{ paddingTop: '20px' }}
          title='洽谈记录'
          onLeftIconButtonTouchTap={this.onClickBack}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton label="提交" />}
          />

        <div className={[styles.content, styles.content_notoolbar].join(' ') }>
          <Subheader>上海大润发松江店</Subheader>
          <div style={{ padding: '0 18px' }}>
            <TextField
              hintText="请输入"
              floatingLabelText="门店对接人"
              fullWidth={true}
              floatingLabelFixed={true}
              />
            <TextField
              hintText="请输入"
              floatingLabelText="洽谈内容"
              multiLine={true}
              fullWidth={true}
              floatingLabelFixed={true}
              rows={3}
              />
            <TextField
              hintText="请输入"
              floatingLabelText="洽谈结果"
              multiLine={true}
              fullWidth={true}
              floatingLabelFixed={true}
              rows={3}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;