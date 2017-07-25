import React from 'react';
var echarts = require('echarts');
import moment from 'moment';
import styles from './charts.less';

class Chart_actual extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartactual_rtm: Store.getChartactual_rtm(),
            chartactual_lot: Store.getChartactual_lot(),
            chartactual_wal: Store.getChartactual_wal(),
        };
        this.chart1 = null;
        this.chart2 = null;
        this.chart3 = null;
        this.myChart1 = null;
        this.myChart2 = null;
        this.myChart3 = null;
        this.beginMoment = null;
        this.endMoment = null;
        this.queryMonent = null;
        this.onChartActualRtmChange = this.onChartActualRtmChange.bind(this);
        this.onChartActualLotChange = this.onChartActualLotChange.bind(this);
        this.onChartActualWalChange = this.onChartActualWalChange.bind(this);
    }
    componentDidMount() {
        Store.addChangeListener(StoreEvent.SE_CHARTACTUAL_RTM, this.onChartActualRtmChange);
        Store.addChangeListener(StoreEvent.SE_CHARTACTUAL_LOT, this.onChartActualLotChange);
        Store.addChangeListener(StoreEvent.SE_CHARTACTUAL_WAL, this.onChartActualWalChange);

        this.myChart1 = echarts.init(this.chart1);
        this.myChart2 = echarts.init(this.chart2);
        this.myChart3 = echarts.init(this.chart3);

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

        if (this.state.chartactual_rtm.length <= 0) {
            this.myChart1.showLoading('default', { text: '', color: 'rgb(0, 188, 212)' });
            data.system_id = 'RTM';
            Action.getChartsActual_rtm(data);
        } else {
            this.myChart1.setOption(this.getOption(this.state.chartactual_rtm, '大润发销售目标达成率'));
        }
        if (this.state.chartactual_lot.length <= 0) {
            this.myChart2.showLoading('default', { text: '', color: 'rgb(0, 188, 212)' });
            data.system_id = 'LOT';
            Action.getChartsActual_lot(data);
        } else {
            this.myChart2.setOption(this.getOption(this.state.chartactual_lot, '易初莲花销售目标达成率'));
        }
        if (this.state.chartactual_wal.length <= 0) {
            this.myChart3.showLoading('default', { text: '', color: 'rgb(0, 188, 212)' });
            data.system_id = 'WAL';
            Action.getChartsActual_wal(data);
        } else {
            this.myChart3.setOption(this.getOption(this.state.chartactual_wal, '沃尔玛销售目标达成率'));
        }


    }
    componentWillUnmount() {
        Store.removeChangeListener(StoreEvent.SE_CHARTACTUAL_RTM, this.onChartActualRtmChange);
        Store.removeChangeListener(StoreEvent.SE_CHARTACTUAL_LOT, this.onChartActualLotChange);
        Store.removeChangeListener(StoreEvent.SE_CHARTACTUAL_WAL, this.onChartActualWalChange);
    }
    onChartActualRtmChange() {
        var chartData = Store.getChartactual_rtm();
        this.myChart1.hideLoading();
        this.myChart1.setOption(this.getOption(chartData, '大润发销售目标达成率'));
    }
    onChartActualLotChange() {
        var chartData = Store.getChartactual_lot();
        this.myChart2.hideLoading();
        this.myChart2.setOption(this.getOption(chartData, '易初莲花销售目标达成率'));
    }
    onChartActualWalChange() {
        var chartData = Store.getChartactual_wal();
        this.myChart3.hideLoading();
        this.myChart3.setOption(this.getOption(chartData, '沃尔玛销售目标达成率'));
    }
    getOption(chartData, title) {
        var adjustpercent = this.endMoment.date() / this.queryMoment.date();
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
                    data: chartData.map((cd) => { return (cd.value).toFixed(2) })
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
                <div className={styles.chart} ref={(c) => { this.chart3 = c }}></div>
            </div >
        );
    }
}

export default Chart_actual;