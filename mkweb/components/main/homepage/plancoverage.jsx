import React from 'react';
import { Progress } from 'antd';
import styles from './homepage.less';

class Plancoverage extends React.Component {
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
      <div className={[styles.block, styles.plancoverage].join(' ') }>
        <div className={styles.blocktitle}>当月拜访门店覆盖率</div>
        <div className={styles.blockcontent}>
          <Progress width={200} strokeWidth={8} status='active' type="circle" percent={25} />
        </div>
      </div>
    );
  }
}

export default Plancoverage;