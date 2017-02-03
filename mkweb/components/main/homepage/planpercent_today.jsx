import React from 'react';
import { Progress } from 'antd';
import styles from './homepage.less';

class PlanpercentToday extends React.Component {
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
      <div className={[styles.block, styles.planpercent_today].join(' ') }>
        <div className={styles.blocktitle}>当日计划完成率</div>
        <div className={styles.blockcontent}>
          <Progress width={200} strokeWidth={8} status='active' type="circle" percent={80} />
        </div>
      </div>
    );
  }
}

export default PlanpercentToday;