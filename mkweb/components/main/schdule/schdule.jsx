import React from 'react';
import styles from './schdule.less';
import { Calendar } from 'antd';

class Schdule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monent: moment()
    };
    this.monthCellRender = this.monthCellRender.bind(this);
    this.onPanelChange = this.onPanelChange.bind(this);
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }
  getMonthType(year, month) {
    console.log(year, month);
    var nowDate = new Date();
    var curMonth = nowDate.getMonth();
    var curDate = nowDate.getDate();
    var curYear = nowDate.getFullYear();
    nowDate.setMonth(curMonth + 1);
    var nextMonth = nowDate.getMonth();

    console.log('curMonth', curMonth, 'curDate', curDate, 'curYear', curYear, 'nextMonth', nextMonth);

    if (year < curYear) {
      return 'past';
    } else if (year == curYear) {
      if (month < curMonth) {
        return 'past';
      } else if (month == curMonth) {
        return 'current';
      } else if (month == nextMonth && curDate <= 25) {
        return 'next';
      } else {
        return 'later';
      }
    } else {
      if (month == nextMonth && nextMonth == 0 && year == curYear + 1) {
        return 'next';
      }
    }
  }
  onPanelChange(date, mode) {
    this.setState({
      monent: date
    })
  }
  monthCellRender(value) {
    console.log(value);
    var monthStyle = [styles.monthcontainer];
    var monthType = this.getMonthType(value.year(), value.month());
    if (monthType == 'past') monthStyle.push(styles.past);
    else if (monthType == 'current') monthStyle.push(styles.current);
    else if (monthType == 'next') monthStyle.push(styles.next);
    else if (monthType == 'later') monthStyle.push(styles.later);

    return <div className={monthStyle.join(' ')}>
    </div>;
  }
  render() {
    return (
      <div className={styles.container}>
        <header>拜访计划表<span>注： 每月25日之前制定下月计划，每周五之前确定下周计划</span></header>
        <div className={styles.subheader}>
          <span>区域：</span>
          <p>苏皖区</p>
          <span>姓名：</span>
          <p>李春香</p>
          <span>岗位：</span>
          <p>销售代表</p>
          <span>大区主管：</span>
          <p>白焕霞</p>
          <div className={styles.markcontent}>
            <div className={[styles.markblock,styles.next].join(' ')}></div>
            <p>可排计划</p>
            <div className={[styles.markblock,styles.past].join(' ')}></div>
            <p>不可改</p>
          </div>
        </div>
        <div className={styles.content}>
          <Calendar value={this.state.monent} mode="year" onPanelChange={this.onPanelChange} monthCellRender={this.monthCellRender} />
        </div>
      </div>
    );
  }
}

export default Schdule;