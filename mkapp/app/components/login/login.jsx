import React from 'react';
import styles from './login.less';
import $ from 'jquery';
import { message,Spin } from 'antd';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/action/exit-to-app';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import config from '../config';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginloading: false,
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.onLoginChange = this.onLoginChange.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
  }

  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_LOGIN, this.onLoginChange);
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_LOGIN, this.onLoginChange);
    localStorage.username = $('#username').val();
    localStorage.password = $('#password').val();
  }
  onLoginChange(loginSuccess) {
    this.setState({ loginloading: false });
  }
  onClickLogin() {
    this.setState({ loginloading: true });
    var username = $('#username').val();
    var password = $('#password').val();
    if (username == "") {
      message.info("请输入用户名！");
      return;
    }
    if (password == "") {
      message.info("请输入密码！");
      return;
    }
    var data = {
      username: username,
      password: password,
      type: 2
    }
    Action.login(data);
  }
  handleTouchTap() {
  }
  render() {
    var username = localStorage.username;
    var password = localStorage.password;
    return (
      <div className={styles.container}>
        <AppBar
          style={{ marginBottom: '30px', paddingTop: config.titlebarPadding }}
          title='满好营销通'
          iconElementLeft={<span></span>}
          />
        <div className={styles.inputform}>
          <TextField floatingLabelText="用户名" defaultValue={username} id="username" fullWidth={true} />
        </div>
        <div className={styles.inputform}>
          <TextField floatingLabelText="密码" defaultValue={password} id="password" type="password" fullWidth={true} hintText="请输入密码" />
        </div>
        <Spin spinning={this.state.loginloading}>
          <div className={styles.btnform}>
            <RaisedButton disabled={this.state.loginloading}
              onTouchTap={this.onClickLogin}
              labelStyle={{ fontSize: '16px' }}
              buttonStyle={{ height: '50px' }}
              label={this.state.loginloading ? "正在登录,请稍后" : "登 录"}
              primary={!this.state.loginloading}
              secondary={true}
              fullWidth={true} />
          </div>
        </Spin>
      </div>
    );
  }
}

export default Login;