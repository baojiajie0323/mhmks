import React from 'react';
import styles from './homepage.less';

class TodaySums extends React.Component {
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
      <div className={[styles.block,styles.sums].join(' ')}>
        <div className={styles.blocktitle}>今日概览</div>
        <div className={styles.blocksums}>
          <p>今日共排计划<span>15</span>个</p>
          <p>今日巡店业务员<span>8</span>人</p>
          <p>今日共巡门店<span>55</span>个</p>
        </div>
      </div>
    );
  }
}

export default TodaySums;