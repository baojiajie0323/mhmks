import React from 'react';
import { Table, Select, Button, Icon, Modal, Input, Popconfirm, message, DatePicker } from 'antd';
import styles from './visitor.less';
const { MonthPicker, RangePicker } = DatePicker;

function percentNum(num, num2) {
  if (num2 == 0) {
    return '0%';
  }
  return (Math.round(num / num2 * 10000) / 100.00 + "%"); //小数点后两位百分比
}

class PlanCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkPlan: [],
      department: Store.getDepartment(),
      user: Store.getUser(),
    };
    this.onCheckPlanChange = this.onCheckPlanChange.bind(this);
    this.handleTablePlanChange = this.handleTablePlanChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onClickQuery = this.onClickQuery.bind(this);

    this.onDepartChange = this.onDepartChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onDepartnameChange = this.onDepartnameChange.bind(this);
    this.onUserTextChange = this.onUserTextChange.bind(this);

    this.userid = "";
    this.depart = 0;

    this.queryData = [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")];
  }
  componentDidMount() {
    this.map = new BMap.Map("allmap");

    Store.addChangeListener(StoreEvent.SE_DEPARTMENT, this.onDepartnameChange);
    Store.addChangeListener(StoreEvent.SE_CHECKPLAN, this.onCheckPlanChange);
    Store.addChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Action.getUser();
    Action.getDepartment();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_DEPARTMENT, this.onDepartnameChange);
    Store.removeChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Store.removeChangeListener(StoreEvent.SE_CHECKPLAN, this.onCheckPlanChange);

  }
  handleTablePlanChange(pagination, filters, sorter) {
    const pager = this.state.pagination_plan;
    pager.current = pagination.current;
    this.setState({
      pagination_plan: pager,
    });
  }
  onCheckPlanChange(checkPlan) {
    this.setState({
      checkPlan
    })
  }
  onUserChange() {
    this.setState({ user: Store.getUser() })
  }
  onDepartChange(value) {
    this.depart = value;
  }
  onUserTextChange(e) {
    this.userid = e.target.value;
  }
  onDepartnameChange() {
    this.setState({
      department: Store.getDepartment(),
    })
  }
  getDepartOption() {
    var departlist = this.state.department;
    var isLowestDepart = function (id) {
      for (var i = 0; i < departlist.length; i++) {
        if (departlist[i].parentid == id) {
          return true;
        }
      }
      return false;
    }
    var departDom = [<Option value={0}>不限区域</Option>];
    for (var i = 0; i < departlist.length; i++) {
      if (!isLowestDepart(departlist[i].id)) {
        departDom.push(<Option value={departlist[i].id}>{departlist[i].name}</Option>)
      }
    }
    return departDom;
  }
  getDepartName(userid) {
    var userlist = this.state.user;
    for (var i = 0; i < userlist.length; i++) {
      var userInfo = userlist[i];
      if (userInfo.username == userid) {
        for (var i = 0; i < this.state.department.length; i++) {
          if (this.state.department[i].id == userInfo.depart) {
            return this.state.department[i].name;
          }
        }
      }
    }
    return "";
  }
  getDepart(depart) {
    for (var i = 0; i < this.state.department.length; i++) {
      if (this.state.department[i].id == depart) {
        return this.state.department[i];
      }
    }
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
    if (this.userid != "" && !userInfo) {
      message.info("工号或姓名错误，请重新输入");
      return;
    }

    if (this.userid == "" && this.depart == 0) {
      message.info("请选择条件进行查询");
      return;
    }

    var data = {
      begindate: this.queryData[0],
      enddate: this.queryData[1],
    };
    if (this.userid != "") {
      data.userid = this.userid;
    } else {
      data.depart = this.depart;
    }
    console.log(data);
    Action.getCheckPlan(data);
  }

  onDateChange(date, dateString) {
    this.queryData = dateString;
    console.log("onDateChange", date, dateString);
  }

  getPhotoDom(image_type) {
    var context = this;
    var photoList = [];
    for (var i = 0; i < this.state.visitorImage.length; i++) {
      var imageInfo = this.state.visitorImage[i];
      if (imageInfo.type == image_type) {
        photoList.push(imageInfo);
      }
    }

    var photoDom = [];
    for (var i = 0; i < photoList.length; i++) {
      let imageInfo = photoList[i];
      let imagepath = 'url("' + '../upload/' + imageInfo.filename + '.jpg")';
      photoDom.push(<div style={{ backgroundImage: imagepath }} onClick={function () { context.onClickPhoto(imagepath) } } className={styles.photo}></div>);
    }
    return photoDom;
  }

  getTableColumn() {
    var context = this;
    return [{
      title: '大区',
      dataIndex: 'departname',
      key: 'departname',
      width: 80
    }, {
        title: '销售代表',
        dataIndex: 'realname',
        key: 'realname',
        width: 80
      }, {
        title: '日期',
        dataIndex: 'plan_date',
        key: 'plan_date',
        width: 100
      }, {
        title: '计划访店名称',
        dataIndex: 'Store_name_plan',
        key: 'Store_name_plan',
        width: 150
      }, {
        title: '实际访店名称',
        dataIndex: 'Store_name_real',
        key: 'Store_name_real',
        width: 150
      }, {
        title: '签到时间',
        dataIndex: 'signin_time',
        key: 'signin_time',
        width: 80
      }, {
        title: '签退时间',
        dataIndex: 'signout_time',
        key: 'signout_time',
        width: 80
      }, {
        title: '逗留时间',
        dataIndex: 'stay_time',
        key: 'stay_time',
        width: 100
      }, {
        title: '签到偏差',
        dataIndex: 'signin_distance',
        key: 'signin_distance',
        width: 80
      }, {
        title: '签退偏差',
        dataIndex: 'signout_distance',
        key: 'signout_distance',
        width: 80
      }, {
        title: '计划拜访率',
        dataIndex: 'percent',
        key: 'percent',
        width: 80
      }];
  }
  getTableData() {
    var context = this;
    var tableData = [];

    var plan_count = 0;
    var real_count = 0;
    var finish_count = 0;
    var lastuserid = "";
    var lastrealname = "";
    for (var i = 0; i < context.state.checkPlan.length; i++) {
      var plan = context.state.checkPlan[i];
      if (i == 0) {
        lastuserid = plan.userid;
      }
      if (lastuserid != plan.userid) {
        tableData.push({
          mark: 1,
          Store_name_plan: plan_count,
          Store_name_real: real_count,
          percent: percentNum(finish_count, plan_count),
          realname: lastrealname,
          departname: "小计"
        })
        plan_count = 0;
        real_count = 0;
        finish_count = 0;
        lastuserid = plan.userid;
      }

      lastrealname = plan.realname;
      var gps_x = plan.Gps_x;
      var gps_y = plan.Gps_y;
      var pointStore = new BMap.Point(gps_x, gps_y);
      var signin_distance = -1;
      var signout_distance = -1;
      if (plan.signin_gps_x && plan.signin_gps_y && context.map) {
        var pointSignin = new BMap.Point(plan.signin_gps_x, plan.signin_gps_y);
        signin_distance = parseInt(context.map.getDistance(pointStore, pointSignin));
      }
      if (plan.signout_gps_x && plan.signout_gps_y && context.map) {
        var pointSignout = new BMap.Point(plan.signout_gps_x, plan.signout_gps_y);
        signout_distance = parseInt(context.map.getDistance(pointStore, pointSignout));
      }

      var stay_time = "";
      if (plan.signin_time && plan.signout_time) {
        var date1 = new Date(plan.signin_time);
        var date2 = new Date(plan.signout_time);
        var date3 = date2.getTime() - date1.getTime()  //时间差的毫秒数
        var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000))
        var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000))
        if (hours == 0) {
          stay_time = minutes + '分钟';
        } else {
          stay_time = hours + '小时' + minutes + '分钟';
        }
      }

      var Store_name_plan = "";
      var Store_name_real = "";
      if (plan.plan_type == 1) {
        plan_count++;
        Store_name_plan = plan.Store_name;
        if (plan.signin_gps_x) {
          finish_count++;
          real_count++;
          Store_name_real = plan.Store_name;
        }
      } else {
        Store_name_real = plan.Store_name;
        real_count++;
      }

      tableData.push({
        plan_date: new Date(plan.plan_date).Format("yyyy-MM-dd"),
        departname: context.getDepartName(plan.userid),
        Store_name_plan: Store_name_plan,
        Store_name_real: Store_name_real,
        plan_type: plan.plan_type,
        Path_name: plan.path_name == null ? "临时拜访" : plan.path_name,
        signin_time: plan.signin_time == null ? "未签到" : plan.signin_time.substr(11),
        signin_distance: signin_distance < 0 ? "" : (signin_distance + "米"),
        signout_time: plan.signout_time == null ? "未签退" : plan.signout_time.substr(11),
        signout_distance: signout_distance < 0 ? "" : (signout_distance + "米"),
        stay_time: stay_time,
        gps_x: gps_x,
        gps_y: gps_y,
        signin_gps_x: plan.signin_gps_x,
        signin_gps_y: plan.signin_gps_y,
        signout_gps_x: plan.signout_gps_x,
        signout_gps_y: plan.signout_gps_y,
        userid: plan.userid,
        year: plan.year,
        month: plan.month,
        day: plan.day,
        store_id: plan.store_id,
        realname: plan.realname
      })
    }

    tableData.push({
      mark: 1,
      Store_name_plan: plan_count,
      Store_name_real: real_count,
      percent: percentNum(finish_count, plan_count),
      realname: lastrealname,
      departname: "小计"
    })

    return tableData;
  }
  rowClassName(record, index) {
    var style = [styles.table_row];
    if (record.mark == 1) {
      style.push(styles.path_cell);
    }
    return style.join(' ');
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
        <p className={styles.visitortitle}>销售代表路线稽核</p>
        <div className={styles.queryContainer}>
          <Select onChange={this.onDepartChange} defaultValue={this.depart} style={{ width: 120, marginRight: '10px' }}>
            {this.getDepartOption() }
          </Select>
          <Input onChange={this.onUserTextChange} style={{ width: '120px', marginRight: '10px' }} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="工号/姓名" />
          <RangePicker defaultValue={[moment(), moment()]} style={{ marginRight: '20px' }} onChange={this.onDateChange} />
          <Button icon="search" onClick={this.onClickQuery} type="primary">查询</Button>
        </div>
        <div className={styles.resultContent}>
          <Table pagination={false} scroll={{ y: scrolly }}
            rowClassName={this.rowClassName} size="small" columns={this.getTableColumn() } dataSource={this.getTableData() } />
        </div>
        <div id="allmap" style={{ visibility: 'hidden' }} className={styles.allmap}></div>
      </div>
    );
  }
}

export default PlanCheck;