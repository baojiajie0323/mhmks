import React from 'react';
import styles from './login.less';
import $ from 'jquery'
import { Icon, Checkbox, message} from 'antd';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
  }
  componentWillUnmount() {
    localStorage.username = $('#username').val();    
    localStorage.password = $('#password').val();
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
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.title}>满好营销通</p>
          <div className={styles.formcontent}>
            <Icon className={styles.formIcon} type="user" />
            <input id="username" className={styles.formInput} placeholder="请输入用户名" />
          </div>
          <div className={styles.formcontent}>
            <Icon className={styles.formIcon} type="unlock" />
            <input id="password" type="password" className={styles.formInput} placeholder="请输入密码" />
          </div>
          <div className={styles.loginbtn} onClick={this.onClickLogin}>登 录</div>
        </div>

      </div>
    );
  }
}

export default Login;