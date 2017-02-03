import React from 'react';
import echarts from 'echarts';
import styles from './homepage.less';

class PlanpercentMonth extends React.Component {
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
    var myChart = echarts.init(document.getElementById('planpercent_month'));
    var option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['0201', '0202', '0203', '0204', '0205', '0206', '0207',
            '0208', '0209', '0210', '0211', '0212', '0213', '0214',
            '0215', '0216', '0217', '0218', '0219', '0220', '0221'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '计划完成数',
          type: 'bar',
          barWidth: '60%',
          data: [30, 35, 33, 34, 40, 33, 31, 30, 35, 33, 34, 40, 33, 31, 30, 35, 33, 34, 40, 33, 31],
          animationDelay: function (idx) {
            return idx * 10;
          }
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };
    myChart.setOption(option);
  }
  render() {
    return (
      <div className={[styles.block, styles.planpercent_month].join(' ') }>
        <div className={styles.blocktitle}>当月每日计划完成数</div>
        <div id='planpercent_month' className={styles.blockcontent}></div>

      </div>
    );
  }
}

export default PlanpercentMonth;