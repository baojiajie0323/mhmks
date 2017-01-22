import React from 'react';
import styles from './config.less';

class Config extends React.Component {
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
      配置
      </div>
    );
  }
}

export default Config;