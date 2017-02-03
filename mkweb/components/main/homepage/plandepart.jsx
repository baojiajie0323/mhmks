import React from 'react';
import styles from './homepage.less';

class Plandepart extends React.Component {
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
      <div className={[styles.block,styles.plandepart].join(' ')}>
        <div className={styles.blocktitle}>部门当日计划</div>
      </div>
    );
  }
}

export default Plandepart;