import React from 'react';
import styles from './login.less';
import $ from 'jquery';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onTouchTest = this.onTouchTest.bind(this);
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


    this.map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398, 39.897445);
    this.map.centerAndZoom(point, 12);
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
  render() {
    return (
      <div className={styles.container}>
        <RaisedButton onClick={this.onTouchTest} label="定位" primary={true} />
        <div style={{ height: 'calc(100% - 36px)' }} id="allmap"></div>

      </div>
    );
  }
}

export default Login;