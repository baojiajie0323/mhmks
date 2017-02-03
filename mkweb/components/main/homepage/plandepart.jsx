import React from 'react';
import echarts from 'echarts';
import styles from './homepage.less';

class Plandepart extends React.Component {
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
    var myChart = echarts.init(document.getElementById('plandepart'));
    var option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        data: ['华中区', '华南区', '华北区', '东北区', '沪浙区', '苏皖区']
      },
      series: [
        {
          name: '当日计划数',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 12, name: '华中区' },
            { value: 7, name: '华南区' },
            { value: 8, name: '华北区' },
            { value: 4, name: '东北区' },
            { value: 18, name: '沪浙区' },
            { value: 16, name: '苏皖区' },
          ]
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
      <div className={[styles.block, styles.plandepart].join(' ') }>
        <div className={styles.blocktitle}>部门当日计划</div>
        <div id='plandepart' className={styles.blockcontent}></div>
      </div>
    );
  }
}

export default Plandepart;