import React from 'react';
import Header from './header/header';
import styles from './main.less';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div className={styles.container}>
        <Header />
      </div>
    );
  }
}

export default Main;