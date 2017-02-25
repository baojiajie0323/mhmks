import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './login/login';
import Main from './main/main';
import styles from './app.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginSuccess: false
    };
    this.onLoginChange = this.onLoginChange.bind(this);
  }
  onDeviceReady() {
    alert(11)
    document.addEventListener("backbutton", function () { Store.back() }, false);
  }
  componentDidMount() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    Store.addChangeListener(StoreEvent.SE_LOGIN, this.onLoginChange);
  }
  onLoginChange(loginSuccess) {
    var context = this;
    setTimeout(function () {
      context.setState({ loginSuccess });
    }, 400);
  }
  render() {
    return (
      <MuiThemeProvider>
        {!this.state.loginSuccess ?
          <Login /> :
          <Main />
        }
      </MuiThemeProvider>
    );
  }
}

export default App;