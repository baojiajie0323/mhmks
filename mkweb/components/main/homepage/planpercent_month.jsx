import React from 'react';
import styles from './homepage.less';

class PlanpercentMonth extends React.Component {
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
      <div className={[styles.block,styles.planpercent_month].join(' ')}>
        <div className={styles.blocktitle}>当月计划概览</div>
        
      </div>
    );
  }
}

export default PlanpercentMonth;