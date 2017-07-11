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
    };
    this.onVisitorPlanChange = this.onVisitorPlanChange.bind(this);

    this.onClickQuery = this.onClickQuery.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);

    this.onUserChange = this.onUserChange.bind(this);
    this.onUserTextChange = this.onUserTextChange.bind(this);

    this.userid = "";

    this.expenseType = [
      { type: 'wcbt', name: '误餐费' },
      { type: 'snjt', name: '市内交通费' },
      { type: 'ccdsnjt', name: '出差地市内交通费' },
      { type: 'ctjt', name: '长途交通费' },
      { type: 'ccbt', name: '出差补贴' },
      { type: 'zsbt', name: '住宿补贴' },
    ]
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_VISITOR_PLANLIST, this.onVisitorPlanChange);
    Store.addChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Action.getUser();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Store.removeChangeListener(StoreEvent.SE_VISITOR_PLANLIST, this.onVisitorPlanChange);
  }

  onVisitorPlanChange(saleActual) {
    this.setState({
      visitorPlan: Store.getVisitorPlan(),
      loading: false
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
      dataIndex: 'sku_percent',
      key: 'sku_percent',
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
      dataIndex: 'depart_rank',
      key: 'depart_rank',
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
      title: '操作',
      key: 'picture',
      width: 100,
      render: function (text, record) {
        var operateDom = [
          <a onClick={function () {
            context.onClickShowPicture(record, -1);
          }}>发票</a>,
          <span className="ant-divider" />,
          <Popconfirm title="确定要重签这条记录吗?" onConfirm={function () {
            context.onClickReSign(record);
          }} >
            <a>拜访情况</a>
          </Popconfirm>
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
        for (var j = 0; j < this.expenseType.length; j++) {
          planData.push({
            plandate,
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

  getDXpercent() {
    var num1 = 0;
    var num2 = 0;
    var tableData = this.state.saleActual;
    for (var i = 0; i < tableData.length; i++) {
      if (tableData[i].sum > 0) {
        num1++;
      }
    }
    num2 = tableData.length;
    return percentNum(num1, num2)
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