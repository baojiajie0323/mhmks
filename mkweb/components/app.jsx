import React from 'react';
import Login from './login/login';
import Main from './main/main';
import styles from './app.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginSuccess: true
    };
    this.onLoginChange = this.onLoginChange.bind(this);
  }
  componentDidMount(){
    document.addEventListener("keypress",this.onKeyPress, true);
    Store.addChangeListener(StoreEvent.SE_LOGIN,this.onLoginChange);
  }
  onKeyPress(e){
    Store.emit(StoreEvent.SE_KEYPRESS,e.keyCode);
  }
  onLoginChange(loginSuccess){
    this.setState({loginSuccess});
  }
  render() {
    return (
      <div className={styles.container}>
        {!this.state.loginSuccess ? 
          <Login /> :
          <Main />
        }        
      </div>
    );
  }
}

export default App;