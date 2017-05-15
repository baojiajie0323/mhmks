import React from 'react';
import styles from './schdule.less';
import $ from 'jquery';
import { Calendar, Select, Table, Progress, Button, Modal, Tag, Icon } from 'antd';
const Option = Select.Option;
const confirm = Modal.confirm;

const NOPATH = '选择一条路线';
function getMonthWeek(today) {
  var a = today.getFullYear();
  var b = today.getMonth() + 1;
  var c = today.getDate();
  /* 
  a = d = 当前日期 
  b = 6 - w = 当前周的还有几天过完(不算今天) 
  a + b 的和在除以7 就是当天是当前月份的第几周 
  */
  var date = new Date(a, parseInt(b) - 1, c), w = date.getDay(), d = date.getDate();
  if(w == 0){
    w = 7;
  }
  return Math.ceil(
    (d + 7 - w) / 7
  );
};

class Schdule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monent: moment(),
      mode: 'year',
      path: Store.getPath(),
      storeBasic: Store.getStoreBasic(),
      plansumList: [],
      planList: [],
      showPlanCount: false,

    };
    this.needUpdateMonent = [];
    this.monthCellRender = this.monthCellRender.bind(this);
    this.dateCellRender = this.dateCellRender.bind(this);
    this.onPanelChange = this.onPanelChange.bind(this);
    this.onClickMonthContent = this.onClickMonthContent.bind(this);
    this.onClickDateContent = this.onClickDateContent.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onPlanSumChange = this.onPlanSumChange.bind(this);
    this.onPlanChange = this.onPlanChange.bind(this);
    this.onPathSelChange = this.onPathSelChange.bind(this);
    this.onPathChange = this.onPathChange.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
    this.onPlanUpdate = this.onPlanUpdate.bind(this);
    this.onClickShowPlanCount = this.onClickShowPlanCount.bind(this);
    this.handlePlanCountCancel = this.handlePlanCountCancel.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_PLANSUM, this.onPlanSumChange);
    Store.addChangeListener(StoreEvent.SE_PLAN, this.onPlanChange);
    Store.addChangeListener(StoreEvent.SE_PATH, this.onPathChange);
    Store.addChangeListener(StoreEvent.SE_STOREBASIC, this.onStoreChange);
    Store.addChangeListener(StoreEvent.SE_PLAN_UPDATE, this.onPlanUpdate);


    //Action.getPathDetail();

    var storedata;
    var pathdata;
    var userInfo = Store.getUserInfo();
    if (userInfo.userid == userInfo.id) {
      //用户为区域主管
      storedata = {
        depart: userInfo.depart
      };
      pathdata = {
        depart: userInfo.depart
      };
    } else {
      storedata = {
        username: userInfo.username
      };
      pathdata = {
        userid: userInfo.username
      };
    }
    console.log(storedata);
    Action.getPath_app(pathdata);
    Action.getStoreBasic(storedata);

    this.checkPlanSum(true);
    this.checkPlan(true);
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_PLANSUM, this.onPlanSumChange);
    Store.removeChangeListener(StoreEvent.SE_PLAN, this.onPlanChange);
    Store.removeChangeListener(StoreEvent.SE_PATH, this.onPathChange);
    Store.removeChangeListener(StoreEvent.SE_STOREBASIC, this.onStoreChange);
    Store.removeChangeListener(StoreEvent.SE_PLAN_UPDATE, this.onPlanUpdate);
  }
  onClickShowPlanCount() {
    this.setState({ showPlanCount: true })
  }
  handlePlanCountCancel() {
    this.setState({ showPlanCount: false })
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
    var curMonth = curMonent.month() + 1;
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
  onPathChange() {
    this.setState({
      path: Store.getPath()
    })
  }
  onStoreChange() {
    this.setState({
      storeBasic: Store.getStoreBasic()
    })
  }
  onPlanUpdate() {
    this.needUpdateMonent = [];
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
    var planlist = []
    for (var i = 0; i < this.state.planList.length; i++) {
      if (this.state.planList[i].year == year &&
        this.state.planList[i].month == month &&
        this.state.planList[i].day == day) {
        planlist.push(this.state.planList[i]);
      }
    }
    return planlist;
  }
  getPlanPath(planlist) {
    for (var i = 0; i < planlist.length; i++) {
      if (planlist[i].plan_type == 1) {
        return planlist[i].path_id;
      }
    }
  }
  updatePlan(year, month, day, path) {
    this.needUpdateMonent.push(day);
    for (var i = 0; i < this.state.planList.length;) {
      if (this.state.planList[i].year == year &&
        this.state.planList[i].month == month + 1 &&
        this.state.planList[i].day == day) {
        this.state.planList.splice(i, 1);
        continue;
      }
      i++;
    }
    if (path) {
      var pathDetail = Store.getPathDetail(path);
      for (var i = 0; i < pathDetail.length; i++) {
        this.state.planList.push({
          userid: localStorage.username,
          year: year,
          month: month + 1,
          day: day,
          plan_type: 1,
          path_id: path,
          Path_Name:pathDetail[i].Path_name,
          store_id: pathDetail[i].Store_id
        })
      }
    }
    this.setState({
      planList: this.state.planList
    })
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
    var context = this;
    this.setState({
      mode: 'month',
      monent: value
    }, function () {
      context.checkPlan(true);
    })
  }
  onClickDateContent(value) {
    var context = this;
    var curMonent = this.state.monent;
    if (value.month() != curMonent.month()) {
      value.date(15);
      if (this.needUpdateMonent.length > 0) {
        confirm({
          title: '由于您修改了当月计划，请先保存提交计划！',
          content: '点击"确定"停留在此月，点击"取消"放弃保存',
          onOk() {
          },
          onCancel() {
            context.setState({
              mode: 'month',
              monent: value
            })
          },
        });
        return;
      }
      this.setState({
        mode: 'month',
        monent: value
      }, function () {
        context.checkPlan();
      })
    }
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
    console.log('onPanelChange', monent, mode)
    var context = this;
    var doChange = function () {
      console.log('onPanelChange', monent, mode)
      context.setState({
        monent,
        mode
      }, function () {
        if (mode == 'year') {
          context.checkPlanSum(true);
        } else if (mode == 'month') {
          context.checkPlan(true);
        }
      })
    }
    var curMonent = this.state.monent;
    if (this.state.mode == 'month' && (mode == "year" || monent.month() != curMonent.month())) {
      if (this.needUpdateMonent.length > 0) {
        confirm({
          title: '由于您修改了当月计划，请先保存提交计划！',
          content: '点击"确定"停留在此月，点击"取消"放弃保存',
          onOk() {
          },
          onCancel() {
            doChange();
          },
        });
        return;
      }
    }
    doChange();
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
    var planSum = this.getPlanSum(value.year(), value.month() + 1);
    var cover = 0, complete = 0;
    if (planSum && planSum.cover) {
      cover = planSum.cover;
    }
    if (planSum && planSum.complete) {
      complete = planSum.complete;
    }
    return <div className={monthStyle.join(' ') }
      onClick={function () { context.onClickMonthContent(value) } }
      >
      {monthType == 'later' ? null :
        [<div className={styles.tableContent}>
          <p>计划月均拜访</p>
          <Tag color="#2db7f5">{'A类：' + (planSum ? planSum.storeA : '0') + '次'}</Tag>
          <Tag color="#27b56e">{'B类：' + (planSum ? planSum.storeB : '0') + '次'}</Tag>
          <Tag color="#7265E6">{'C类：' + (planSum ? planSum.storeC : '0') + '次'}</Tag>
        </div>,
          <div className={styles.tableContent}>
            <p>计划覆盖率</p>
            <Progress percent={cover} strokeWidth={5} status="active" />
          </div>,
          <div style={{ height: '1px', backgroundColor: '#D2D2D2' }}></div>,
          <div className={styles.tableContent}>
            <p>执行完成率</p>
            <Progress percent={complete} strokeWidth={5} status="active" />
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

    var context = this;
    var getPathOption = function () {
      return context.state.path.map((pt) => {
        if (pt) {
          return <Option value={pt.Path_id}>{pt.Path_name}</Option>
        }
      });
    }

    var planlist = this.getPlan(value.year(), value.month() + 1, value.date());
    //console.log('planlist', planlist, this.state.planList);
    var storelist = [];
    var path_id = NOPATH;
    for (var i = 0; i < planlist.length; i++) {
      var plan = planlist[i];
      if (plan.plan_type == 1) {
        path_id = plan.path_id;
      }
      var store_id = plan.store_id;
      var storeBasic = Store.getStoreBasicById(store_id);
      if (storeBasic) {
        storelist.push(<p title={storeBasic.Store_name}>
          <span className={styles.storeIcon}>
            {plan.plan_type == 2 ? <Icon type="exclamation-circle" /> : null}
          </span>
          <span className={styles.storeLevel}>{storeBasic.Level}</span>
          {storeBasic.Store_name}</p>)
      }
    }

    return <div className={dateStyle.join(' ') }
      onClick={function () { context.onClickDateContent(value) } }
      >
      <Select
        style={{ width: '100%' }}
        allowClear
        value={path_id}
        notFoundContent='没有路线'
        onChange={function (path) {
          context.onPathSelChange(value, path);
        } }
        disabled={dateType == 'past'} >
        {getPathOption() }
      </Select>
      <div className={styles.date_path_store_content}>
        {storelist}
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
  unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
      if (!hash[elem]) {
        result.push(elem);
        hash[elem] = true;
      }
    }
    return result;
  }
  getSumInfo() {
    var planlist = this.state.planList;
    var storelist = this.state.storeBasic;
    var noplanList = [];
    var storeACount = 0, storeBCount = 0, storeCCount = 0, storeA = 0, storeB = 0, storeC = 0, cover = 0, complete = 0;
    var storeCount = storelist.length;

    for (var i = 0; i < storelist.length; i++) {
      noplanList.push(storelist[i].Store_id);
      if (storelist[i].Level == 'A') {
        storeACount++;
      } else if (storelist[i].Level == 'B') {
        storeBCount++;
      } else if (storelist[i].Level == 'C') {
        storeCCount++;
      }
    }

    var curMonent = this.state.monent;
    var nowMonent = moment();
    var planSum = this.getPlanSum(curMonent.year(), curMonent.month() + 1);
    if (planSum && (nowMonent.month() > curMonent.month() || nowMonent.year() > curMonent.year())) {
      storeCount = planSum.storeCount;
      storeACount = planSum.storeACount;
      storeBCount = planSum.storeBCount;
      storeCCount = planSum.storeCCount;
    }

    var planStoreACount = 0, planStoreBCount = 0, planStoreCCount = 0, completeCount = 0;
    var planStoreList = [];
    for (var i = 0; i < planlist.length; i++) {
      var plan = planlist[i];
      if (plan.plan_type == 1) {
        var store_id = plan.store_id;
        planStoreList.push(store_id);
        var findIndex = noplanList.indexOf(store_id);
        if (findIndex >= 0) {
          noplanList.splice(findIndex, 1);
        }

        var storeBasic = Store.getStoreBasicById(store_id);
        if (storeBasic) {
          if (storeBasic.Level == 'A') {
            planStoreACount++;
          } else if (storeBasic.Level == 'B') {
            planStoreBCount++;
          } else if (storeBasic.Level == 'C') {
            planStoreCCount++;
          }
          if (plan.isfinish) {
            completeCount++;
          }
        }
      }
    }
    planStoreList = this.unique(planStoreList);


    storeA = planStoreACount / storeACount;
    storeA = parseFloat(storeA.toFixed(1));
    storeB = planStoreBCount / storeBCount;
    storeB = parseFloat(storeB.toFixed(1));
    storeC = planStoreCCount / storeCCount;
    storeC = parseFloat(storeC.toFixed(1));
    complete = parseInt(completeCount / planlist.length * 100);
    cover = parseInt(planStoreList.length / storeCount * 100);


    return {
      storeACount,
      storeBCount,
      storeCCount,
      storeA,
      storeB,
      storeC,
      cover,
      complete,
      storeCount,
      noplanList
    }
  }
  getTableData(sumInfo) {
    const data = [{
      key: '1',
      level: 'A类',
      count: sumInfo.storeACount + '家',
      percount: sumInfo.storeA + '次',
    }, {
        key: '2',
        level: 'B类',
        count: sumInfo.storeBCount + '家',
        percount: sumInfo.storeB + '次',
      }, {
        key: '3',
        level: 'C类',
        count: sumInfo.storeCCount + '家',
        percount: sumInfo.storeC + '次',
      }, {
        key: '4',
        level: '所有门店',
        count: sumInfo.storeCount + '家',

      }];
    return data;
  }
  getTable2Data(noPlanList) {
    var context = this;
    const data = noPlanList.map((st, index) => {
      var storeInfo = Store.getStoreBasicById(st);
      if (storeInfo) {
        var path_id = '';
        var path_name = '无路线';
        var planDetail = Store.getPathDetail();
        for (var i = 0; i < planDetail.length; i++) {
          if (planDetail[i].Store_id == st) {
            path_id = planDetail[i].Path_id;
            break;
          }
        }

        for (var i = 0; i < context.state.path.length; i++) {
          if (context.state.path[i].Path_id == path_id) {
            path_name = context.state.path[i].Path_name;
            break;
          }
        }

        return {
          key: index,
          level: storeInfo.Level + '类',
          name: storeInfo.Store_name,
          path: path_name,
        }
      }
    })
    return data;
  }
  onPathSelChange(value, path) {
    // console.log(value,path);
    // var planlist = this.getPlan(value.year(),value.month(),value.date());
    // var path_id = this.getPlanPath(planlist);
    // if(path_id == path){
    //   return;
    // }
    console.log(path);
    this.updatePlan(value.year(), value.month(), value.date(), path);
  }
  onClickSave() {
    var context = this;
    confirm({
      title: '确定要保存并提交计划表吗？',
      content: '提交计划后请严格按照计划进行',
      onOk() {
        context.onSavePlan();
      },
      onCancel() { },
    });
  }
  onSavePlan() {
    var sumInfo = this.getSumInfo();
    var curmonent = this.state.monent;
    var year = curmonent.year();
    var month = curmonent.month() + 1;
    var modifyData = {};
    this.needUpdateMonent = this.unique(this.needUpdateMonent);

    for (var i = 0; i < this.needUpdateMonent.length; i++) {
      var planlist = this.getPlan(year, month, this.needUpdateMonent[i]);
      modifyData[this.needUpdateMonent[i]] = planlist;
    }

    var data = {
      userid: localStorage.username,
      year,
      month,
      sumInfo: JSON.stringify(sumInfo),
      modifyData: JSON.stringify(modifyData),
    }
    Action.updatePlan(data);
  }
  getPlanCountTableColumn() {
    var context = this;
    return [{
      title: '大区',
      dataIndex: 'Region_name',
      key: 'Region_name',
      width: 80,
    }, {
        title: '代表',
        dataIndex: 'realname',
        key: 'realname',
        width: 50,
      }, {
        title: '门店名称',
        dataIndex: 'Store_name',
        key: 'Store_name',
        width: 130,
      }, {
        title: '门店地址',
        dataIndex: 'Address',
        key: 'Address',
        width: 240
      }, {
        title: '类型',
        dataIndex: 'Level',
        key: 'Level',
        width: 50,
      }, {
        title: '路线',
        dataIndex: 'Path_name',
        key: 'Path_name',
        width: 70,
      }, {
        //   title: '时间',
        //   dataIndex: 'visitor_date',
        //   key: 'visitor_date',
        //   width: 56,
        // }, {
        title: '总次数',
        dataIndex: 'visitor_count',
        key: 'visitor_count',
        width: 50,
      }, {
        title: '第一周',
        dataIndex: 'visitor_count1',
        key: 'visitor_count1',
        width: 50,
      }, {
        title: '第二周',
        dataIndex: 'visitor_count2',
        key: 'visitor_count2',
        width: 50,
      }, {
        title: '第三周',
        dataIndex: 'visitor_count3',
        key: 'visitor_count3',
        width: 50,
      }, {
        title: '第四周',
        dataIndex: 'visitor_count4',
        key: 'visitor_count4',
        width: 50,
      }, {
        title: '第五周',
        dataIndex: 'visitor_count5',
        key: 'visitor_count5',
        width: 50,
      }];
  }

  getStoreBasic(store_id) {
    for (var i = 0; i < this.state.storeBasic.length; i++) {
      if (this.state.storeBasic[i].Store_id == store_id) {
        return this.state.storeBasic[i];
      }
    }
    return null;
  }


  getPlanCountTableData() {
    var tableData = [];
    this.state.storeBasic.forEach((sb) => {
      sb.visitor_count = null;
      sb.visitor_count1 = null;
      sb.visitor_count2 = null;
      sb.visitor_count3 = null;
      sb.visitor_count4 = null;
      sb.visitor_count5 = null;
    })
    //console.log("getPlanCountTableData", this.state.planList);
    for (var i = 0; i < this.state.planList.length; i++) {
      var plan = this.state.planList[i];
      if (plan.plan_type != 1) {
        continue;
      }
      var storeInfo = this.getStoreBasic(plan.store_id);
      if (storeInfo) {
        storeInfo.Path_name = plan.Path_Name;
        if (storeInfo.visitor_count == null) {
          storeInfo.visitor_count = 0;
        }
        if (storeInfo.visitor_count1 == null) {
          storeInfo.visitor_count1 = 0;
        }
        if (storeInfo.visitor_count2 == null) {
          storeInfo.visitor_count2 = 0;
        }
        if (storeInfo.visitor_count3 == null) {
          storeInfo.visitor_count3 = 0;
        }
        if (storeInfo.visitor_count4 == null) {
          storeInfo.visitor_count4 = 0;
        }
        if (storeInfo.visitor_count5 == null) {
          storeInfo.visitor_count5 = 0;
        }

        storeInfo.visitor_count++;
        var weekIndex = getMonthWeek(new Date(plan.plan_date));
        if (weekIndex == 1) {
          storeInfo.visitor_count1++;
        } else if (weekIndex == 2) {
          storeInfo.visitor_count2++;
        } else if (weekIndex == 3) {
          storeInfo.visitor_count3++;
        } else if (weekIndex == 4) {
          storeInfo.visitor_count4++;
        } else if (weekIndex == 5) {
          storeInfo.visitor_count5++;
        }

      }
    }
    var storelist = this.state.storeBasic;
    storelist.sort(function (a, b) {
      var counta = a.visitor_count || -1;
      var counta1 = a.visitor_count1 || -1;
      var counta2 = a.visitor_count2 || -1;
      var counta3 = a.visitor_count3 || -1;
      var counta4 = a.visitor_count4 || -1;
      var counta5 = a.visitor_count5 || -1;

      var countb = b.visitor_count || -1;
      var countb1 = b.visitor_count1 || -1;
      var countb2 = b.visitor_count2 || -1;
      var countb3 = b.visitor_count3 || -1;
      var countb4 = b.visitor_count4 || -1;
      var countb5 = b.visitor_count5 || -1;

      //return counta < countb;

      if (counta == countb) {
        if (counta1 == countb1) {
          if (counta2 == countb2) {
            if (counta3 == countb3) {
              if (counta4 == countb4) {
                return countb5 - counta5 || storelist.indexOf(b) - storelist.indexOf(a);
              } else {
                return countb4 - counta4
              }
            } else {
              return countb3 - counta3;
            }
          } else {
            return countb2 - counta2
          }
        } else {
          return countb1 - counta1;
        }
      } else {
        return countb - counta;
      }
    });
    return storelist;
  }
  render() {
    var userInfo = Store.getUserInfo();
    var curmonent = this.state.monent;
    var year = curmonent.year();
    var month = curmonent.month() + 1;

    var sumInfo = this.getSumInfo();
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
          <p></p>
          <div className={styles.markcontent}>
            <div className={[styles.markblock, styles.next].join(' ') }></div>
            <p>可排计划</p>
            <div className={[styles.markblock, styles.past].join(' ') }></div>
            <p>不可改</p>
          </div>
        </div>
        <div className={[styles.content, this.state.mode == 'month' ? styles.content_month : ''].join(' ') }>
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
                <Progress percent={sumInfo.cover} strokeWidth={5} status="active" />
              </div>
              <Table pagination={false} columns={this.getTableColumn() } dataSource={this.getTableData(sumInfo) } />
              <Button onClick={this.onClickShowPlanCount} style={{ marginTop: '20px', width: '100%', background: '#4DCEB6', color: 'white' }} type="primary">门店拜访频次</Button>
              <Button onClick={this.onClickSave} style={{ marginTop: '5px', width: '100%' }} type="primary">保存提交计划</Button>
              <p>{'未覆盖门店(' + sumInfo.noplanList.length + '家) ：'}</p>
              <Table pagination={false} columns={this.getTable2Column() } dataSource={this.getTable2Data(sumInfo.noplanList) } />
            </div>
          </div> : null
        }

        <Modal title="门店拜访频次" width={1200} height={600} footer={null} visible={this.state.showPlanCount}
          onCancel={this.handlePlanCountCancel} >
          <Table pagination={false} scroll={{ y: 450 }} size="small" columns={this.getPlanCountTableColumn() } dataSource={this.getPlanCountTableData() } />
        </Modal>

      </div>
    );
  }
}

export default Schdule;