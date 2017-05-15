import React from 'react';
import { Table, Tabs, Button, Icon, Modal, Input, Tree, Popconfirm, message, DatePicker, Breadcrumb } from 'antd';
import styles from './visitor.less';
const TreeNode = Tree.TreeNode;
const { MonthPicker, RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;

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
  if (w == 0) {
    w = 7;
  }
  return Math.ceil(
    (d + 7 - w) / 7
  );
};


class StoreSum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Store.getUser(),
      visitorPlan: Store.getVisitorPlan(),
      storeBasic: [],
    };
    this.onUserChange = this.onUserChange.bind(this);
    this.onVisitorPlanChange = this.onVisitorPlanChange.bind(this);
    this.onStorebasicChange = this.onStorebasicChange.bind(this);

    this.onDateChange = this.onDateChange.bind(this);
    this.onClickQuery = this.onClickQuery.bind(this);
    this.onTextChange = this.onTextChange.bind(this);

    this.userid = "";
    this.queryData = [moment().startOf('month').format("YYYY-MM-DD"), moment().endOf('month').format("YYYY-MM-DD")];

  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_VISITOR_PLANLIST, this.onVisitorPlanChange);
    Store.addChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Store.addChangeListener(StoreEvent.SE_STOREBASIC, this.onStorebasicChange);

    Action.getUser();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_VISITOR_PLANLIST, this.onVisitorPlanChange);
    Store.removeChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Store.removeChangeListener(StoreEvent.SE_STOREBASIC, this.onStorebasicChange);
  }

  onVisitorPlanChange() {
    this.setState({
      visitorPlan: Store.getVisitorPlan(),
    })
  }

  onUserChange() {
    this.setState({ user: Store.getUser() })
  }
  onStorebasicChange() {
    this.setState({ storeBasic: Store.getStoreBasic() })
  }

  checkUserId() {
    var userlist = this.state.user;
    for (var i = 0; i < userlist.length; i++) {
      var userInfo = userlist[i];
      if (userInfo.username == this.userid || userInfo.realname == this.userid) {
        return userInfo;
      }
    }
    return null;
  }

  onClickQuery() {
    var userInfo = this.checkUserId();
    if (!userInfo) {
      message.info("工号或姓名错误，请重新输入");
      return;
    }

    if (moment(this.queryData[0]).month() != moment(this.queryData[1]).month()) {
      message.info("日期选择不能跨月");
      return;
    }

    this.setState({
      storeBasic: [],
      visitorPlan: [],
    })

    var plandata = {
      userid: userInfo.username,
      begindate: this.queryData[0],
      enddate: this.queryData[1],
    };
    console.log(plandata);
    Action.getVisitorPlan(plandata);

    var storedata;
    if (userInfo.userid == userInfo.id) {
      //用户为区域主管
      storedata = {
        depart: userInfo.depart
      };
    } else {
      storedata = {
        username: userInfo.username
      };
    }
    console.log(storedata);
    Action.getStoreBasic(storedata);

  }

  onDateChange(date, dateString) {
    this.queryData = dateString;
    console.log("onDateChange", date, dateString);
  }

  onTextChange(e) {
    this.userid = e.target.value;
  }

  getStoreBasic(store_id) {
    for (var i = 0; i < this.state.storeBasic.length; i++) {
      if (this.state.storeBasic[i].Store_id == store_id) {
        return this.state.storeBasic[i];
      }
    }
    return null;
  }

  getTableColumn() {
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


  getTableData() {
    var tableData = [];
    for (var i = 0; i < this.state.visitorPlan.length; i++) {
      var plan = this.state.visitorPlan[i];
      if (plan.plan_type != 1) {
        continue;
      }
      var storeInfo = this.getStoreBasic(plan.store_id);
      if (storeInfo) {
        storeInfo.Path_name = plan.path_name;
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
    console.log("storeBasic_1", storelist);
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
    console.log("storeBasic_2", storelist);
    return storelist;
  }
  render() {
    var context = this;
    var scrolly = 350;
    var height = document.body.clientHeight;
    if (height > 0) {
      scrolly = height - 285;
    }
    console.log('storesum render', document.body, height);
    return (
      <div className={styles.visitorcontent}>
        <p className={styles.visitortitle}>门店拜访频次</p>
        <div className={styles.queryContainer}>
          <Input onChange={this.onTextChange} style={{ width: '100px', marginRight: '20px' }} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="工号/姓名" />
          <RangePicker defaultValue={[moment().startOf('month'), moment().endOf('month')]} style={{ marginRight: '20px' }} onChange={this.onDateChange} />
          <Button icon="search" onClick={this.onClickQuery} type="primary">查询</Button>
        </div>
        <div className={styles.resultContent}>
          <Table pagination={false} scroll={{ y: scrolly }} size="small" columns={this.getTableColumn() } dataSource={this.getTableData() } />
        </div>
      </div>
    );
  }
}

export default StoreSum;