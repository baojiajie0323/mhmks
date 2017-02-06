import React from 'react';
import styles from './login.less';
import $ from 'jquery';
import RaisedButton from 'material-ui/RaisedButton';

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
        <RaisedButton label="Primary" primary={true} />
      </div>
    );
  }
}

export default Login;