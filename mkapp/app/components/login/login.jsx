import React from 'react';
import styles from './login.less';
import $ from 'jquery';
import { message } from 'antd';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/action/exit-to-app';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  componentDidMount() {
    // this.map = new BMap.Map("allmap");
    // var point = new BMap.Point(116.331398, 39.897445);
    // this.map.centerAndZoom(point, 12);
    // var context = this;
    // var geolocation = new BMap.Geolocation();
    // geolocation.getCurrentPosition(function (r) {
    //   if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //     var mk = new BMap.Marker(r.point);
    //     context.map.addOverlay(mk);
    //     context.map.panTo(r.point);
    //     alert('您的位置：' + r.point.lng + ',' + r.point.lat);
    //   }
    //   else {
    //     alert('failed' + this.getStatus());
    //   }
    // }, { enableHighAccuracy: true })
  }
  componentWillUnmount() {
    localStorage.username = $('#username').val();
    localStorage.password = $('#password').val();
  }
  onTouchTest() {
    var context = this;
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var mk = new BMap.Marker(r.point);
        context.map.addOverlay(mk);
        context.map.panTo(r.point);
        alert('您的位置：' + r.point.lng + ',' + r.point.lat);
      }
      else {
        alert('failed' + this.getStatus());
      }
    }, { enableHighAccuracy: true })
  }

  onClickLogin() {
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
    alert('onTouchTap triggered on the title component');
  }
  render() {
    var username = localStorage.username;
    var password = localStorage.password;
    return (
      <div className={styles.container}>
        <AppBar
          style={{ marginBottom: '30px' }}
          title='满好营销通'
          iconElementLeft={<span></span>}
          iconElementRight={<IconButton><NavigationClose /></IconButton>}
          onRightIconButtonTouchTap={this.handleTouchTap}
          />
        <div className={styles.inputform}>
          <TextField defaultValue={username} id="username" fullWidth={true} hintText="请输入用户名" />
        </div>
        <div className={styles.inputform}>
          <TextField defaultValue={password} id="password" type="password" fullWidth={true} hintText="请输入密码" />
        </div>
        <div className={styles.btnform}>
          <RaisedButton onTouchTap={this.onClickLogin} labelStyle={{fontSize:'16px'}} buttonStyle={{height:'50px'}} label="登 录" primary={true} fullWidth={true} />
        </div>
      </div>
    );
  }
}

export default Login;