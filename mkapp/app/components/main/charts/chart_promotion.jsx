import React from 'react';
var echarts = require('echarts');
import moment from 'moment';
import styles from './charts.less';

class Chart_promotion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartpromotion_user: Store.getChartpromotion_user(),
        };
        this.chart1 = null;
        this.myChart1 = null;
        this.beginMoment = null;
        this.endMoment = null;
        this.onChartPromotionChange = this.onChartPromotionChange.bind(this);
    }
    componentDidMount() {
        Store.addChangeListener(StoreEvent.SE_CHARTPROMOTION_USER, this.onChartPromotionChange);

        this.myChart1 = echarts.init(this.chart1);

        var nowMoment = moment();

        this.beginMoment = moment(moment().startOf('month'));
        this.queryMoment = moment(moment().add(-1, 'd'));
        this.endMoment = moment(moment().endOf('month'));

        var userInfo = Store.getUserInfo();
        var data = {
            begindate: this.beginMoment.format('YYYY-MM-DD'),
            enddate: this.endMoment.format('YYYY-MM-DD'),
            querydate: this.queryMoment.format('YYYY-MM-DD'),
            // begindate: '2017-06-01',
            // enddate: '2017-06-30',
            // querydate: '2017-06-10',
            depart: userInfo.depart,
        }
        console.log('querychart data', data);

       if (this.state.chartpromotion_user.length <= 0) {
            this.myChart1.showLoading('default', { text: '', color: 'rgb(0, 188, 212)' });
            data.system_id = 'RTM';
            Action.getChartsPromotion_user(data);
        } else {
            this.myChart1.setOption(this.getOption(this.state.chartpromotion_user, '大润发促销目标达成率'));
        }

    }
    componentWillUnmount() {
        Store.removeChangeListener(StoreEvent.SE_CHARTPROMOTION_USER, this.onChartPromotionChange);
    }
    onChartPromotionChange() {
        var chartData = Store.getChartpromotion_user();
        this.myChart1.hideLoading();
        this.myChart1.setOption(this.getOption(chartData, '大润发促销目标达成率'));
    }
    getOption(chartData, title) {
        var option = {
            color: ['rgb(0, 188, 212)'],
            title: {
                text: title,
                subtext: `数据时间：${this.queryMoment.format('YYYY-MM-DD')}`
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
                    data: chartData.map((cd) => { return cd.key }),
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
                    data: chartData.map((cd) => { return cd.value })
                }
            ]
        };
        return option;
    }
    render() {
        return (
            <div>
                <div className={styles.chart} ref={(c) => { this.chart1 = c }}></div>
            </div >
        );
    }
}

export default Chart_promotion;