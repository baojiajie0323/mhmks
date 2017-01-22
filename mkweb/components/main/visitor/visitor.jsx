import React from 'react';
import styles from './visitor.less';

class Visitor extends React.Component {
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
      拜访
      </div>
    );
  }
}

export default Visitor;