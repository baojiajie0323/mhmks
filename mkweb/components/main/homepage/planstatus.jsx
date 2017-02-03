import React from 'react';
import echarts from 'echarts';
import styles from './homepage.less';

class Planstatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    this.initCharts();
  }
  componentWillUnmount() {
  }
  initCharts() {
    var myChart = echarts.init(document.getElementById('planstatus'));
    var option = {
      color: ['#3E8655', '#2DB7F5', '#c23531'],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        data: ['完成', '进行中', '未开始']
      },
      series: [
        {
          name: '当日计划',
          type: 'pie',
          radius: '70%',
          center: ['50%', '50%'],
          data: [
            { value: 30, name: '完成' },
            { value: 10, name: '进行中' },
            { value: 15, name: '未开始' },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }
  render() {
    return (
      <div className={[styles.block, styles.planstatus].join(' ') }>
        <div className={styles.blocktitle}>当日计划状态</div>
        <div id='planstatus' className={styles.blockcontent}></div>
      </div>
    );
  }
}

export default Planstatus;