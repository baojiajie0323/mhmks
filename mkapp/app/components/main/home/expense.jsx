import React from 'react';
import styles from './home.less';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { message, Table } from 'antd';
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
    var expenseStyle = {
      paperStyle: {
        positon: 'relative',
        padding: '0 15px',
        height: '120px',
        margin: '5px 15px 10px'
      },
      titleStyle: {
        position: 'absolute',
        left: '25px',
        marginTop: '4px',
        color: 'rgb(56, 150, 161)'
      }
    }
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
          <Subheader>今日拜访类型</Subheader>
          <RadioButtonGroup style={{ padding: '0 15px' }} name="shipSpeed" defaultSelected={1}>
            <RadioButton
              value={1}
              label="室内拜访"
              style={{ marginBottom: "16px" }}
            />
            <RadioButton
              value={2}
              label="出差住宿"
              style={{ marginBottom: "16px" }}
            />
            <RadioButton
              value={3}
              label="出差不住宿"
              style={{ marginBottom: "16px" }}
            />
          </RadioButtonGroup>
          <Subheader>今日费用申请</Subheader>
          <Paper style={expenseStyle.paperStyle} zDepth={1}>
            <p style={expenseStyle.titleStyle}>误餐费</p>
          </Paper>
          <Paper style={expenseStyle.paperStyle} zDepth={1}>
            <p style={expenseStyle.titleStyle}>市内交通费</p>
          </Paper>
          <Paper style={expenseStyle.paperStyle} zDepth={1}>
            <p style={expenseStyle.titleStyle}>出差补贴</p>
          </Paper>
          <Paper style={expenseStyle.paperStyle} zDepth={1}>
            <p style={expenseStyle.titleStyle}>出差地交通费</p>
          </Paper>
          <Paper style={expenseStyle.paperStyle} zDepth={1}>
            <p style={expenseStyle.titleStyle}>长途交通费</p>
          </Paper>
          <Paper style={expenseStyle.paperStyle} zDepth={1}>
            <p style={expenseStyle.titleStyle}>住宿补贴</p>
          </Paper>
        </div>
      </div>
    );
  }
}

export default Expense;