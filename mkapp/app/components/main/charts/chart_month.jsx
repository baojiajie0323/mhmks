import React from 'react';
var echarts = require('echarts');
import styles from './charts.less';

class Chart_month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.chart1 = null;
    this.chart2 = null;
  }
  componentDidMount() {
    var option = {
    color:['rgb(0, 188, 212)'],
    title:{
        text:'销售代表目标达成率',
        subtext:'数据时间：2017-05-01至2017-05-31'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['钱玲', '陆叶青', '何晓娜', '刘红柳'],
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'目标达成率',
            type:'bar',
            barWidth: '50%',
            data:[85, 82, 80, 77]
        }
    ]
};

    var myChart1 = echarts.init(this.chart1);
    var myChart2 = echarts.init(this.chart2);
    myChart1.setOption(option);
    myChart2.setOption(option);

  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div>
        <div className={styles.chart} ref={(c) => { this.chart1 = c }}></div>
        <div className={styles.chart} ref={(c) => { this.chart2 = c }}></div>
      </div >
    );
  }
}

export default Chart_month;