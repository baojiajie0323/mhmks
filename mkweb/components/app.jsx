import React from 'react';
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
  componentDidMount(){
    Store.addChangeListener(StoreEvent.SE_LOGIN,this.onLoginChange)
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