import React from 'react';
import styles from './login.less';
import $ from 'jquery'
import { Icon, Checkbox, message} from 'antd';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savepwd: false,
    };
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
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

    
    Store.addChangeListener(StoreEvent.SE_KEYPRESS,this.onKeyPress);
  }
  componentWillUnmount() {
    localStorage.username = $('#username').val();
    localStorage.savepwd = this.state.savepwd;
    if(this.state.savepwd){
      localStorage.password = $('#password').val();
    }else{
      localStorage.password = '';
    }

    
    Store.removeChangeListener(StoreEvent.SE_KEYPRESS,this.onKeyPress);
  }
  onKeyPress(keyCode){
    if(keyCode == 13){
      this.onClickLogin();
    }
  }
  onClickLogin() {
    var username = $('#username').val();
    var password = $('#password').val();
    if(username == ""){
      message.info("请输入用户名！");
      return;
    }
    if(password == ""){
      message.info("请输入密码！");
      return;
    }
    var data = {
      username:username,
      password:password,
      type:1
    }
    Action.login(data);
  }
  onCheckChange(e) {
    this.setState({
      savepwd: e.target.checked
    })
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.title}>满好营销通后台管理平台</p>
          <div className={styles.formcontent}>
            <Icon className={styles.formIcon} type="user" />
            <input id="username" className={styles.formInput} placeholder="请输入用户名" />
          </div>
          <div className={styles.formcontent}>
            <Icon className={styles.formIcon} type="unlock" />
            <input id="password" type="password" className={styles.formInput} placeholder="请输入密码" />
          </div>
          <div className={styles.savepwd}>
            <Checkbox checked={this.state.savepwd} onChange={this.onCheckChange} >记住密码</Checkbox>
          </div>
          <div className={styles.loginbtn} onClick={this.onClickLogin}>登 录</div>
        </div>

      </div>
    );
  }
}

export default Login;