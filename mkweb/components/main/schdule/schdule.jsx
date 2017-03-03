import React from 'react';
import styles from './schdule.less';
import { Calendar, Select, Table, Progress, Button, Modal, Tag } from 'antd';
const Option = Select.Option;
const confirm = Modal.confirm;

class Schdule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monent: moment(),
      mode: 'year',
      path: Store.getPath(),
      pathDetail: Store.getPathDetail(),
      storeBasic: Store.getStoreBasic(),
      plansumList: [],
      planList: [],
    };
    this.monthCellRender = this.monthCellRender.bind(this);
    this.dateCellRender = this.dateCellRender.bind(this);
    this.onPanelChange = this.onPanelChange.bind(this);
    this.onClickMonthContent = this.onClickMonthContent.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onPlanSumChange = this.onPlanSumChange.bind(this);
    this.onPlanChange = this.onPlanChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_PLANSUM, this.onPlanSumChange);
    Store.addChangeListener(StoreEvent.SE_PLAN, this.onPlanChange);

    Action.getPath_app({
      userid: localStorage.username
    });
    Action.getPathDetail();
    Action.getStoreBasic({
      username: localStorage.username
    });

    this.checkPlanSum(true);
    this.checkPlan(true);
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_PLANSUM, this.onPlanSumChange);
    Store.removeChangeListener(StoreEvent.SE_PLAN, this.onPlanChange);
  }
  checkPlanSum(ajax) {
    var curMonent = this.state.monent;
    var curYear = curMonent.year();
    var planSumList = Store.getPlanSum(curYear);
    if (ajax && planSumList.length == 0) {
      Action.getPlanSum({
        userid: localStorage.username,
        year: curYear
      })
    } else {
      this.setState({
        plansumList: planSumList,
      })
    }
  }
  checkPlan(ajax) {
    var curMonent = this.state.monent;
    var curYear = curMonent.year();
    var curMonth = curMonth.month();
    var planList = Store.getPlan(curYear, curMonth);
    if (ajax && planList.length == 0) {
      Action.getPlan({
        userid: localStorage.username,
        year: curYear,
        month: curMonth,
      })
    } else {
      this.setState({
        planList: planList,
      })
    }
  }
  onPlanSumChange() {
    this.checkPlanSum();
  }
  onPlanChange() {
    this.checkPlan();
  }
  getPlanSum(year, month) {
    for (var i = 0; i < this.state.plansumList.length; i++) {
      if (this.state.plansumList[i].year == year &&
        this.state.plansumList[i].month == month) {
        return this.state.plansumList[i];
      }
    }
    return null;
  }
  getPlan(year, month, day) {
    for (var i = 0; i < this.state.planList.length; i++) {
      if (this.state.planList[i].year == year &&
        this.state.planList[i].month == month &&
        this.state.planList[i].day == day) {
        return this.state.planList[i];
      }
    }
    return null;
  }

  onPathChange() {
    this.setState({
      path: Store.getPath()
    })
  }
  onStoreBasicChange() {
    this.setState({
      storeBasic: Store.getStoreBasic()
    })
  }

  onClickMonthContent(value) {
    if (!value) {
      return;
    }
    this.setState({
      mode: 'month',
      monent: value
    })
  }
  getMonthType(year, month) {
    //console.log(year, month);
    var nowDate = new Date();
    var curMonth = nowDate.getMonth();
    var curDate = nowDate.getDate();
    var curYear = nowDate.getFullYear();
    nowDate.setMonth(curMonth + 1);
    var nextMonth = nowDate.getMonth();

    //console.log('curMonth', curMonth, 'curDate', curDate, 'curYear', curYear, 'nextMonth', nextMonth);

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
    return 'later';
  }
  onPanelChange(monent, mode) {
    var context = this;
    this.setState({
      monent,
      mode
    }, function () {
      if (mode == 'year') {
        context.checkPlanSum();
      } else if (mode == 'month') {
        context.checkPlan();
      }
    })
  }
  monthCellRender(value) {
    //console.log(value);
    var monthStyle = [styles.monthcontainer];
    var monthType = this.getMonthType(value.year(), value.month());
    if (monthType == 'past') monthStyle.push(styles.past);
    else if (monthType == 'current') monthStyle.push(styles.current);
    else if (monthType == 'next') monthStyle.push(styles.next);
    else if (monthType == 'later') monthStyle.push(styles.later);

    var context = this;
    var planSum = this.getPlanSum(value.year(), value.month());
    return <div className={monthStyle.join(' ')}
      onClick={function () { context.onClickMonthContent(value) } }
      >
      {monthType == 'later' ? null :
        [<div className={styles.tableContent}>
          <p>计划月均拜访</p>
          <Tag color="#2db7f5">{'A类：' + (planSum ? planSum.storeA : '') + '次'}</Tag>
          <Tag color="#27b56e">{'B类：' + (planSum ? planSum.storeB : '') + '次'}</Tag>
          <Tag color="#7265E6">{'C类：' + (planSum ? planSum.storeC : '') + '次'}</Tag>
        </div>,
        <div className={styles.tableContent}>
          <p>计划覆盖率</p>
          <Progress percent={planSum ? planSum.cover : 0} strokeWidth={5} status="active" />
        </div>,
        <div style={{ height: '1px', backgroundColor: '#D2D2D2' }}></div>,
        <div className={styles.tableContent}>
          <p>执行完成率</p>
          <Progress percent={planSum ? planSum.complete : 0} strokeWidth={5} status="active" />
        </div>]
      }
    </div>;
  }

  getDateType(value) {
    var nowDate = moment();
    if (value.week() == nowDate.week() + 1 && nowDate.day() <= 5 && nowDate.day() > 0) {
      return 'next';
    }

    if (nowDate.date() <= 25 && value.month() == nowDate.month() + 1) {
      return 'next';
    }

    return 'past';
  }
  dateCellRender(value) {
    var dateStyle = [styles.datecontainer];
    var dateType = this.getDateType(value);
    if (dateType == 'past') dateStyle.push(styles.past);
    else if (dateType == 'next') dateStyle.push(styles.next);

    var getPathOption = function () {
      return this.state.path.map((pt) => {
        return <Option value={pt.Path_id}>{pt.Path_name}</Option>
      });
    }

    var plan
    return <div className={dateStyle.join(' ')}>
      <Select
        style={{ width: '100%' }}
        allowClear
        placeholder="选择一条路线"
        value={}
        disabled={dateType == 'past'} >
        {getPathOption()}
      </Select>
      <div className={styles.date_path_store_content}>
        <p title="大润发松江店"><span>A</span>大润发松江店</p>
        <p><span>C</span>家乐福徐泾店</p>
        <p><span>B</span>麦德龙青浦店</p>
      </div>
    </div>;
  }
  getTableColumn() {
    const columns = [{
      title: '门店级别',
      dataIndex: 'level',
      key: 'level',
    }, {
      title: '门店数量',
      dataIndex: 'count',
      key: 'count',
    }, {
      title: '月均拜访次数',
      dataIndex: 'percount',
      key: 'percount',
    }];
    return columns;
  }
  getTable2Column() {
    const columns = [{
      title: '门店名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '门店级别',
      dataIndex: 'level',
      key: 'level',
    }, {
      title: '所属路线',
      dataIndex: 'path',
      key: 'path',
    }];
    return columns;
  }
  getTableData() {

    const data = [{
      key: '1',
      level: 'A类',
      count: 20,
      percount: 4.2,
    }, {
      key: '2',
      level: 'B类',
      count: 16,
      percount: 2.1,
    }, {
      key: '3',
      level: 'C类',
      count: 4,
      percount: 1,
    }, {
      key: '4',
      level: '所有门店',
      count: 40,

    }];
    return data;
  }
  getTable2Data() {
    const data = [{
      key: '1',
      level: 'A类',
      name: '大润发松江店',
      path: '山东8',
    }, {
      key: '2',
      level: 'A类',
      name: '大润发松江店',
      path: '山东9',
    }, {
      key: '3',
      level: 'B类',
      name: '大润发松江店',
      path: '山东10',
    }, {
      key: '4',
      level: 'C类',
      name: '大润发松江店',
      path: '山东11',
    }];
    return data;
  }
  onClickSave() {
    confirm({
      title: '确定要保存并提交计划表吗？',
      content: '提交计划后请严格按照计划进行',
      onOk() {
        console.log('OK');
      },
      onCancel() { },
    });
  }
  render() {
    var userInfo = Store.getUserInfo();
    var curmonent = this.state.monent;
    var year = curmonent.year();
    var month = curmonent.month();
    return (
      <div className={styles.container}>
        <header>拜访计划表<span>注： 每月25日之前制定下月计划，每周五之前确定下周计划</span></header>
        <div className={styles.subheader}>
          <span>区域：</span>
          <p>{userInfo.departname}</p>
          <span>姓名：</span>
          <p>{userInfo.realname}</p>
          <span>岗位：</span>
          <p>{userInfo.post}</p>
          <span>大区主管：</span>
          <p>白焕霞</p>
          <div className={styles.markcontent}>
            <div className={[styles.markblock, styles.next].join(' ')}></div>
            <p>可排计划</p>
            <div className={[styles.markblock, styles.past].join(' ')}></div>
            <p>不可改</p>
          </div>
        </div>
        <div className={[styles.content, this.state.mode == 'month' ? styles.content_month : ''].join(' ')}>
          <Calendar value={this.state.monent}
            mode={this.state.mode}
            onPanelChange={this.onPanelChange}
            monthCellRender={this.monthCellRender}
            dateCellRender={this.dateCellRender} />
        </div>
        {this.state.mode == 'month' ?
          <div className={styles.planDetailContainer}>
            <p className={styles.planDetail_Title}>{year + '年' + month + '月计划分析统计'}</p>
            <div className={styles.detailContent}>
              <div style={{ padding: '0 5px', display: 'flex', margin: '10px 0' }}>
                <span style={{ width: '100px' }}>拜访覆盖率：</span>
                <Progress percent={85} strokeWidth={5} status="active" />
              </div>
              <Table pagination={false} columns={this.getTableColumn()} dataSource={this.getTableData()} />
              <p>未覆盖门店：</p>
              <Table pagination={false} columns={this.getTable2Column()} dataSource={this.getTable2Data()} />
              <Button onClick={this.onClickSave} style={{ marginTop: '20px', width: '100%' }} type="primary">保存并提交</Button>
            </div>
          </div> : null
        }

      </div>
    );
  }
}

export default Schdule;