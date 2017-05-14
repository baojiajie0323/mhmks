import React from 'react';
import { Table, Tabs, Button, Icon, Modal, Input, Tree, Popconfirm, message, DatePicker, Breadcrumb } from 'antd';
import styles from './visitor.less';
const TreeNode = Tree.TreeNode;
const { MonthPicker, RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;


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

  getTableColumn() {
    var context = this;
    return [{
      title: '大区',
      dataIndex: 'Region_name',
      key: 'Region_name',
      width: 56,
    }, {
        title: '代表',
        dataIndex: 'realname',
        key: 'realname',
        width: 50,
      }, {
        title: '门店名称',
        dataIndex: 'Store_name',
        key: 'Store_name',
        width: 140,
      }, {
        title: '门店地址',
        dataIndex: 'Address',
        key: 'Address',
        width:280
      }, {
        title: '类型',
        dataIndex: 'Level',
        key: 'Level',
        width: 50,
      }, {
        title: '路线',
        dataIndex: 'Path_name',
        key: 'Path_name',
        width: 60,
      }, {
        title: '时间',
        dataIndex: 'visitor_date',
        key: 'visitor_date',
        width: 56,
      }, {
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
    this.state.storeBasic.forEach((sb) => {
      sb.Path_name = "上海二区1"
    })
    return this.state.storeBasic;
  }
  render() {
    var context = this;
    var scrolly = 350;
    var height = document.body.clientHeight;
    if(height > 0){
      scrolly = height - 285;
    }
    console.log('storesum render',document.body,height);
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