import React from 'react';
import styles from './home.less';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { message,Table } from 'antd';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import config from '../../config';

class Expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: Store.getPlan(),
    };
    this.onClickBack = this.onClickBack.bind(this);
  }

  componentDidMount() {
    var curDate = Store.getCurDate();
  }
  componentWillUnmount() {
  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, '');
  }

  render() {
    const { finished, stepIndex } = this.state;
    return (
      <div className={styles.container}>
        <AppBar
          style={{ paddingTop: config.titlebarPadding }}
          title='费用报销'
          onLeftIconButtonTouchTap={this.onClickBack}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton label="提交" />}
        />
        <div style={{ top: config.contentTop }} className={styles.content}>
          <div style={{ padding: '0 40px' }}>
            <Subheader>今日拜访情况</Subheader>
            <Subheader>报销费用填报</Subheader>
          </div>
        </div>
      </div>
    );
  }
}

export default Expense;