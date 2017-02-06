import React from 'react';
import styles from './login.less';
import $ from 'jquery';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ActionHome from 'material-ui/svg-icons/action/home';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import {blue500} from 'material-ui/styles/colors';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  componentDidMount() {
    var username = localStorage.username;
    var password = localStorage.password;
    var savepwd = localStorage.savepwd;

    this.setState({
      savepwd: savepwd == 'true'
    });

    $('#username').val(username);
    if (savepwd) {
      $('#password').val(password);
    }


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
      type: 1
    }
    Action.login(data);
  }
  handleTouchTap() {
    alert('onTouchTap triggered on the title component');
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          style={{marginBottom:'30px'}}
          title='登录'
          iconElementLeft={<span></span>}
          iconElementRight={<IconButton><NavigationClose /></IconButton>}
          onRightIconButtonTouchTap={this.handleTouchTap}
          />
        <div className={styles.inputform}>
          <AccountBox style={{marginRight:'20px',width:'28px',height:'28px'}} color={"rgb(0,188,212)"}/>
          <TextField fullWidth={true} hintText="请输入用户名" />
        </div>
      </div>
    );
  }
}

export default Login;