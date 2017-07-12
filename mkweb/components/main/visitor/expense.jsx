import React from 'react';
import { Table, Select, Button, Icon, Modal, Input, Popconfirm, message, DatePicker } from 'antd';
import styles from './visitor.less';
const { MonthPicker, RangePicker } = DatePicker;


class Expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Store.getUser(),
      monthDate: moment(),
      loading: false,
      visitorPlan: Store.getVisitorPlan(),
      subsidy: Store.getSubsidy(),
      routeCost: Store.getRouteCost(),
    };
    this.onVisitorPlanChange = this.onVisitorPlanChange.bind(this);

    this.onClickQuery = this.onClickQuery.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);

    this.onUserChange = this.onUserChange.bind(this);
    this.onUserTextChange = this.onUserTextChange.bind(this);
    this.onRouteCostChange = this.onRouteCostChange.bind(this);

    this.userid = "";

    this.expenseType = [
      { type: 'wcbt', name: '误餐费' },
      { type: 'snjt', name: '市内交通费' },
      { type: 'ccdsnjt', name: '出差地市内交通费' },
      { type: 'ctjt', name: '长途交通费' },
      { type: 'ccbt', name: '出差补贴' },
      { type: 'zsbt', name: '住宿补贴' },
    ]
    this._routeNature = [{
      nature: "1",
      name: "市内拜访"
    }, {
      nature: "2",
      name: "出差住宿"
    }, {
      nature: "3",
      name: "出差不住宿"
    }, {
      nature: "4",
      name: "电话拜访"
    }]
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_SUBSIDY, this.onSubsidyChange);
    Store.addChangeListener(StoreEvent.SE_VISITOR_PLANLIST, this.onVisitorPlanChange);
    Store.addChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Store.addChangeListener(StoreEvent.SE_ROUTECOST, this.onRouteCostChange);
    Action.getUser();
    Action.getSubsidy();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Store.removeChangeListener(StoreEvent.SE_SUBSIDY, this.onSubsidyChange);
    Store.removeChangeListener(StoreEvent.SE_VISITOR_PLANLIST, this.onVisitorPlanChange);
    Store.removeChangeListener(StoreEvent.SE_ROUTECOST, this.onRouteCostChange);
  }

  onVisitorPlanChange(saleActual) {
    this.setState({
      visitorPlan: Store.getVisitorPlan(),
      loading: false
    })
  }

  onSubsidyChange() {
    this.setState({
      subsidy: Store.getSubsidy()
    })
  }

  onRouteCostChange() {
    this.setState({
      routeCost: Store.getRouteCost()
    })
  }

  onUserChange() {
    this.setState({ user: Store.getUser() })
  }

  onUserTextChange(e) {
    this.userid = e;
  }

  getUserOption() {
    var userlist = this.state.user;
    var userDom = [];
    for (var i = 0; i < userlist.length; i++) {
      if (userlist[i].enableapp == 1) {
        userDom.push(<Option value={userlist[i].username}>{userlist[i].realname}</Option>)
      }
    }
    return userDom;
  }

  getUserInfo(userid) {
    for (var i = 0; i < this.state.user.length; i++) {
      if (this.state.user[i].username == userid) {
        return this.state.user[i];
      }
    }
  }

  getRouteInfo(plan_date) {
    var pathid = this.getPlanPath(plan_date);
    if (pathid) {
      for (var i = 0; i < this.state.routeCost.length; i++) {
        var routeInfo = this.state.routeCost[i];
        if (routeInfo.path_id == pathid) {
          return routeInfo;
        }
      }
    }
  }

  getPlanPath(plan_date) {
    for (var i = 0; i < this.state.visitorPlan.length; i++) {
      var planInfo = this.state.visitorPlan[i];
      if (new Date(planInfo.plan_date).Format("yyyy-MM-dd") == plan_date && planInfo.plan_type == 1) {
        return planInfo.path_id;
      }
    }
  }

  getNatureName(nature){
    for(var i = 0; i < this._routeNature.length; i++){
      if(_routeNature[i].nature == nature){
        return _routeNature[i].name;
      }
    }
    return `未知(${nature})`;
  }
  onClickQuery() {
    if (this.userid == "") {
      message.info("请选择销售代表");
      return;
    }
    var begindate = this.state.monthDate.startOf('month').format("YYYY-MM-DD");
    var enddate = this.state.monthDate.endOf('month').format("YYYY-MM-DD");
    var data = {
      userid: this.userid,
      begindate,
      enddate,
    };

    console.log(data);
    Action.getVisitorPlan(data);
    var routedata = {
      routedate: this.state.monthDate.format("YYYY-MM"),
    }

    console.log("getRouteCost", routedata);
    Action.getRouteCost(routedata);

    this.setState({
      loading: true
    })
  }

  onMonthChange(date, dateString) {
    this.setState({
      monthDate: date
    })
    console.log(date, dateString);
  }


  getTableColumn() {
    var context = this;
    return [{
      title: '销售代表',
      dataIndex: 'realname',
      key: 'realname',
      width: 100,
      render: function (text, record) {
        const obj = {
          children: text,
          props: {},
        };
        if (record.btnr == context.expenseType[0].name) {
          obj.props.rowSpan = 6;
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      }
    }, {
      title: '日期',
      dataIndex: 'plandate',
      key: 'plandate',
      width: 100,
      render: function (text, record) {
        const obj = {
          children: text,
          props: {},
        };
        if (record.btnr == context.expenseType[0].name) {
          obj.props.rowSpan = 6;
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      }
    }, {
      title: '计划类型',
      dataIndex: 'plannature',
      key: 'plannature',
      width: 80,
      render: function (text, record) {
        const obj = {
          children: text,
          props: {},
        };
        if (record.btnr == context.expenseType[0].name) {
          obj.props.rowSpan = 6;
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      }
    }, {
      title: '实际类型',
      dataIndex: 'realnature',
      key: 'realnature',
      width: 80,
      render: function (text, record) {
        const obj = {
          children: text,
          props: {},
        };
        if (record.btnr == context.expenseType[0].name) {
          obj.props.rowSpan = 6;
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      }
    }, {
      title: '补贴内容',
      dataIndex: 'btnr',
      key: 'btnr',
      width: 80,
    }, {
      title: '补贴标准',
      dataIndex: 'depart_rank',
      key: 'depart_rank',
      width: 80,
    }, {
      title: '实际上报',
      dataIndex: 'depart_rank',
      key: 'depart_rank',
      width: 80,
    }, {
      title: '发票数量',
      dataIndex: 'depart_rank',
      key: 'depart_rank',
      width: 80,
    }, {
      title: '发票照片',
      key: 'fpphoto',
      width: 80,
      render: function (text, record) {
        var operateDom = [
          <a onClick={function () {
            context.onClickShowPicture(record, -1);
          }}>查看</a>
        ];
        return operateDom;
      }
    }, {
      title: '备注说明',
      dataIndex: 'depart_rank',
      key: 'depart_rank',
      width: 80,
    }, {
      title: '调整金额',
      dataIndex: 'depart_rank',
      key: 'depart_rank',
      width: 80,
    }, {
      title: '调整说明',
      dataIndex: 'depart_rank',
      key: 'depart_rank',
      width: 80,
    }, {
      title: '拜访情况',
      key: 'planinfo',
      width: 100,
      render: function (text, record) {
        var operateDom = [
          <a onClick={function () {
            context.onClickShowPicture(record, -1);
          }}>查看详情</a>
        ];
        return operateDom;
      }
    }];
  }
  getTableData() {
    var context = this;

    var planData = [];
    var visitorPlan = this.state.visitorPlan;

    visitorPlan.sort((a, b) => {
      return new Date(a.plan_date).getTime() - new Date(b.plan_date).getTime();
    })
    var lastPlandate = "";
    for (var i = 0; i < visitorPlan.length; i++) {
      var plandate = new Date(visitorPlan[i].plan_date).Format("yyyy-MM-dd");
      if (plandate != lastPlandate) {
        var routeInfo = this.getRouteInfo(plandate);
        var plannature = "无计划";
        if(routeInfo){
          plannature = this.getNatureName(routeInfo.nature);
        }
        for (var j = 0; j < this.expenseType.length; j++) {
          planData.push({
            plandate,
            plannature,
            realname: visitorPlan[i].realname,
            btnr: this.expenseType[j].name,
            
          })
        }
        lastPlandate = plandate;
      }
    }

    // var saleActual = this.state.saleActual;
    // for (var i = 0; i < saleActual.length; i++) {
    //   var saleSum = getsaleSum(saleActual[i].user_id);
    //   if (!saleSum) {
    //     saleSum = {
    //       user_id: saleActual[i].user_id,
    //       realname: saleActual[i].realname,
    //       departname: saleActual[i].departname,
    //       allproduct: 0,
    //       dxproduct: 0
    //     }
    //     if (saleSum.departname) {
    //       saleActualSum.push(saleSum);
    //     }
    //   }
    //   if (saleActual[i].sum > 0) {
    //     saleSum.dxproduct++;
    //   }
    //   saleSum.allproduct++;
    // }

    // saleActualSum.forEach((as, index) => {
    //   as.sku_percent = percentNum(as.dxproduct, as.allproduct);
    //   as.sortIndex = index;
    // })

    // saleActualSum.sort((a, b) => {
    //   if (a.departname === b.departname) {
    //     return b.sku_percent - a.sku_percent || a.sortIndex - b.sortIndex;
    //   } else {
    //     return (a.departname > b.departname ? 1 : -1) || a.sortIndex - b.sortIndex;
    //   }
    // })

    // var rank = 1;
    // var lastdepartname = "";
    // saleActualSum.forEach((as) => {
    //   if (lastdepartname != as.departname) {
    //     rank = 1;
    //     lastdepartname = as.departname;
    //   }
    //   as.depart_rank = rank;
    //   rank++;
    // })

    return planData;
  }

  render() {
    var context = this;
    var scrolly = 350;
    var height = document.body.clientHeight;
    if (height > 0) {
      scrolly = height - 290;
    };
    return (
      <div className={styles.visitorcontent}>
        <p className={styles.visitortitle}>报销费用审核</p>
        <div className={styles.queryContainer}>
          <MonthPicker value={this.state.monthDate} onChange={this.onMonthChange} style={{ width: 120, marginRight: '10px' }} placeholder="Select month" />
          <Select onChange={this.onUserTextChange} placeholder="请选择销售代表" style={{ width: 120, marginRight: '10px' }}>
            {this.getUserOption()}
          </Select>
          <Button icon="search" onClick={this.onClickQuery} type="primary">查询</Button>
        </div>
        <div className={styles.resultContent}>
          <Table loading={this.state.loading} bordered pagination={false} scroll={{ y: scrolly }}
            size="small" columns={this.getTableColumn()} dataSource={this.getTableData()} />
        </div>
      </div >
    );
  }
}

export default Expense;