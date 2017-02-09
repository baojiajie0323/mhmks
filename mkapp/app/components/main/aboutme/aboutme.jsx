import React from 'react';
import styles from './aboutme.less';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import PosIcon from 'material-ui/svg-icons/maps/my-location';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import {cyan300,cyan600} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import CommunicationCall from 'material-ui/svg-icons/communication/call';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import AreaIcon from 'material-ui/svg-icons/maps/person-pin';

class Aboutme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  onClickPos() {
    Store.emit(StoreEvent.SE_VIEW, 'localtionview');
  }
  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }
  handleOk() {
    Action.logout();
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
        onTouchTap={this.handleOk}
        />,
    ];
    return (
      <div className={styles.container}>
        <AppBar
          title='个人中心'
          iconElementLeft={<span></span>}
          />
        <div className={styles.usercontainer}>
          <Paper className={styles.userphoto} zDepth={3} circle={true} />
          <p className={styles.username}>李春香</p>
        </div>
        <List>
          <ListItem primaryText="15026489683"
          leftIcon={<CommunicationCall color={cyan300}/>} 
          />
          <ListItem primaryText="lichunxiang@myhome-sh.com"
          leftIcon={<CommunicationEmail color={cyan300}/>} 
          />
          <ListItem primaryText="浙江宁波"
          leftIcon={<AreaIcon color={cyan300}/>} 
          />
          <Divider />
          <ListItem primaryText="我的位置"
            onTouchTap={this.onClickPos}
            leftIcon={<PosIcon color={cyan600} />}
            rightIcon={<RightIcon color={cyan600} />} />
        </List>
        <RaisedButton
          label="退出登录"
          primary={true}
          fullWidth={true}
          onTouchTap={this.handleOpen}
          labelStyle={{ fontSize: '16px' }}
          buttonStyle={{ height: '50px', backgroundColor: 'rgb(241, 48, 25)', marginTop: '10px' }}
          />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          >
          确定要退出登录吗？
        </Dialog>
      </div>
    );
  }
}

export default Aboutme;