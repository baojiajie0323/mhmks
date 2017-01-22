import React from 'react';
import styles from './homepage.less';

class Homepage extends React.Component {
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
      首页
      </div>
    );
  }
}

export default Homepage;