import React from 'react';
import styles from './home.less';


import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import {message} from 'antd';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import TextField from 'material-ui/TextField';

import config from '../../config';

class Note extends React.Component {
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
    Store.emit(StoreEvent.SE_VIEW, '');
  }
  render() {
    const {finished, stepIndex} = this.state;
    return (
      <div className={styles.container}>
        <AppBar
          style={{  paddingTop:config.titlebarPadding }}
          title='日报'
          onLeftIconButtonTouchTap={this.onClickBack}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton label="提交" />}
          />
        <div style={{top:config.contentTop}} className={styles.content}>
          <div style={{padding:'0 40px'}}>
          <TextField
            multiLine={true}
            fullWidth={true}
            hintText="请输入文字"
            floatingLabelText="今日工作总结"
            rows={2}
            />
            </div>
        </div>
      </div>
    );
  }
}

export default Note;