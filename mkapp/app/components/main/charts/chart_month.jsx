import React from 'react';
var echarts = require('echarts');
import moment from 'moment';
import styles from './charts.less';

class Chart_month extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartmonth_user: Store.getChartmonth_user(),
            chartmonth_system: Store.getChartmonth_system(),
        };
        this.chart1 = null;
        this.chart2 = null;
        this.myChart1 = null;
        this.myChart2 = null;
        this.beginMoment = null;
        this.endMoment = null;
        this.onChartMonthUserChange = this.onChartMonthUserChange.bind(this);
        this.onChartMonthSystemChange = this.onChartMonthSystemChange.bind(this);
    }
    componentDidMount() {
        Store.addChangeListener(StoreEvent.SE_CHARTMONTH_USER, this.onChartMonthUserChange);
        Store.addChangeListener(StoreEvent.SE_CHARTMONTH_SYSTEM, this.onChartMonthSystemChange);

        this.myChart1 = echarts.init(this.chart1);
        this.myChart2 = echarts.init(this.chart2);

        var nowMoment = moment();
        console.log(nowMoment);
        if (nowMoment.date() >= 20) {
            this.beginMoment = moment(moment().add(-1, 'M').startOf('month'));
            console.log(this.beginMoment);
            this.endMoment = moment(moment().add(-1, 'M').endOf('month'));
            console.log(this.endMoment);
        } else {
            this.beginMoment = moment(moment().add(-2, 'M').startOf('month'));
            console.log(this.beginMoment);
            this.endMoment = moment(moment().add(-2, 'M').endOf('month'));
            console.log(this.endMoment);
        }
        var userInfo = Store.getUserInfo();
        var data = {
            begindate: this.beginMoment.format('YYYY-MM-DD'),
            enddate: this.endMoment.format('YYYY-MM-DD'),
            depart: userInfo.depart,
        }
        console.log('querychart data', data);
        if (this.state.chartmonth_user.length <= 0) {
            this.myChart1.showLoading('default', { text: '', color: 'rgb(0, 188, 212)' });
            Action.getChartsMonth_user(data);
        } else {
            this.myChart1.setOption(this.getOption(this.state.chartmonth_user,'销售代表目标达成率'));
        }
        if (this.state.chartmonth_system.length <= 0) {
            this.myChart2.showLoading('default', { text: '', color: 'rgb(0, 188, 212)' });
            Action.getChartsMonth_system(data);
        } else {
            this.myChart2.setOption(this.getOption(this.state.chartmonth_system,'系统目标达成率'));
        }


    }
    componentWillUnmount() {
        Store.removeChangeListener(StoreEvent.SE_CHARTMONTH_USER, this.onChartMonthUserChange);
        Store.removeChangeListener(StoreEvent.SE_CHARTMONTH_SYSTEM, this.onChartMonthSystemChange);
    }
    onChartMonthUserChange() {
        var chartData = Store.getChartmonth_user();
        this.myChart1.hideLoading();
        this.myChart1.setOption(this.getOption(chartData,'销售代表目标达成率'));
    }
    onChartMonthSystemChange() {
        var chartData = Store.getChartmonth_system();
        this.myChart2.hideLoading();
        this.myChart2.setOption(this.getOption(chartData,'系统目标达成率'));
    }
    getOption(chartData,title) {
        var option = {
            color: ['rgb(0, 188, 212)'],
            title: {
                text: title,
                subtext: `数据时间：${this.beginMoment.format('YYYY-MM-DD')}至${this.endMoment.format('YYYY-MM-DD')}`
            },
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
                    data: chartData.map((cd)=>{return cd.key}),
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '目标达成率',
                    type: 'bar',
                    barWidth: '50%',
                    data: chartData.map((cd)=>{return cd.value})
                }
            ]
        };
        return option;
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