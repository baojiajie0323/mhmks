import React from 'react';
import Login from './login/login';
import styles from './app.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className={styles.container}>
        <Login /> 
      </div>
    );
  }
}

export default App;