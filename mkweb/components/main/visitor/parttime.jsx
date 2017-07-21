import React from 'react';
import { Table, Button, Icon, Modal, Input, Tree, Popconfirm, message, DatePicker } from 'antd';
import styles from './visitor.less';

class Parttime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Store.getUser(),
      storeBasic: Store.getStoreBasic(),
      parttime: [],
    };

    this.userid = "";
    this.storeid = "";
    this.queryData = [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")];

    this.onUserChange = this.onUserChange.bind(this);
    this.onStoreBasicChange = this.onStoreBasicChange.bind(this);
    this.onParttimeChange = this.onParttimeChange.bind(this);

    this.onUserOptChange = this.onUserOptChange.bind(this);
    this.onStoreOptChange = this.onStoreOptChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_PARTTIME, this.onParttimeChange);
    Store.addChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Store.addChangeListener(StoreEvent.SE_STOREBASIC, this.onStoreBasicChange);
    Action.getStoreBasic();
    Action.getUser();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_PARTTIME, this.onParttimeChange);
    Store.removeChangeListener(StoreEvent.SE_STOREBASIC, this.onStoreBasicChange);
    Store.removeChangeListener(StoreEvent.SE_USER, this.onUserChange);
  }
  onParttimeChange(parttime) {
    this.setState({
      parttime
    })
  }
  onUserChange() {
    this.setState({ user: Store.getUser() })
  }
  onStoreBasicChange() {
    this.setState({
      storeBasic: Store.getStoreBasic()
    })
  }


  onStoreOptChange(e){
    this.storeid = e;
  }
  onUserOptChange(e){
    this.userid = e;
  }
  getUserOption() {
    var userlist = this.state.user;
    var userDom = [];
    userDom.push(<Option value={"0"}>所有人</Option>)
    for (var i = 0; i < userlist.length; i++) {
      if (userlist[i].enableapp == 1) {
        userDom.push(<Option value={userlist[i].username}>{userlist[i].realname}</Option>)
      }
    }
    return userDom;
  }
  getStoreOption() {
    var storelist = this.state.storeBasic;
    var storeDom = [];
    userDom.push(<Option value={"0"}>所有门店</Option>)
    for (var i = 0; i < storelist.length; i++) {
      if (this.userid == "" || this.userid == "0" || storelist[i].user_id == this.userid) {
        storeDom.push(<Option value={storelist[i].Store_id}>{storelist[i].Store_name}</Option>)
      }
    }
    return storeDom;
  }

  onClickQuery() {
    var data = {
      userid: this.userid == "0" ? "" : this.userid,
      storeid: this.storeid == "0" ? "" : this.storeid,
      begindate: this.queryData[0],
      enddate: this.queryData[1],
    };
    console.log(data);
    Action.getParttime(data);
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
      title: '时间',
      dataIndex: 'signtime',
      key: 'signtime',
    }];
  }
  getTableData() {
    return this.state.signList;
  }
  render() {
    return (
      <div className={styles.visitorcontent}>
        <p className={styles.visitortitle}>门店兼促人员信息</p>
        <div className={styles.queryContainer}>
          <RangePicker defaultValue={[moment(), moment()]} style={{ marginRight: '20px' }} onChange={this.onDateChange} />
          <Select onChange={this.onUserOptChange} placeholder="请选择销售代表" style={{ width: 120, marginRight: '20px' }}>
            {this.getUserOption()}
          </Select>
          <Select onChange={this.onStoreOptChange} placeholder="请选择门店" style={{ width: 180, marginRight: '20px' }}>
            {this.getStoreOption()}
          </Select>
          <Button icon="search" onClick={this.onClickQuery} type="primary">查询</Button>
        </div>
        <div className={styles.resultContent}>
          <Table size="small" columns={this.getTableColumn()} dataSource={this.getTableData()} />
        </div>
      </div>
    );
  }
}

export default Plan;