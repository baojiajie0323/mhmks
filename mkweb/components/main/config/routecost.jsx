import React from 'react';
import { Table, Button, Radio, Icon, Modal, Input, Popconfirm, message, Select, DatePicker } from 'antd';
import styles from './config.less';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { MonthPicker } = DatePicker;

class Routecost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      subsidy: Store.getSubsidy(),
      visible: false,
      modaltitle: "",
      modalvalue: '',
      department: Store.getDepartment(),
      monthDate: moment(),
      user: Store.getUser(),
      routeBasic: []
    };
    this.routetype = [{
      type: 1,
      name: "所辖门店"
    }, {
        type: 2,
        name: "稽核门店"
      }];
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onSubsidyChange = this.onSubsidyChange.bind(this);
    this.onDepartnameChange = this.onDepartnameChange.bind(this);
    this.onRouteTypeChange = this.onRouteTypeChange.bind(this);
    this.onDepartChange = this.onDepartChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);

    this.onModalvalueChange = this.onModalvalueChange.bind(this);
    this.onClickText = this.onClickText.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onUserTextChange = this.onUserTextChange.bind(this);
    this.onPathTextChange = this.onPathTextChange.bind(this);
    this.onClickQuery = this.onClickQuery.bind(this);

    this.userid = "";
    this.path = "";
    this.routetype = 1;
    this.depart = 0;
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_SUBSIDY, this.onSubsidyChange);
    Store.addChangeListener(StoreEvent.SE_DEPARTMENT, this.onDepartnameChange);
    Store.addChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Store.addChangeListener(StoreEvent.SE_ROUTEBASIC, this.onRouteBasicChange);

    Action.getUser();
    Action.getDepartment();
    Action.getSubsidy();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_SUBSIDY, this.onSubsidyChange);
    Store.removeChangeListener(StoreEvent.SE_DEPARTMENT, this.onDepartnameChange);
    Store.removeChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Store.removeChangeListener(StoreEvent.SE_ROUTEBASIC, this.onRouteBasicChange);
  }
  onUserChange() {
    this.setState({ user: Store.getUser() })
  }
  onRouteTypeChange(value) {
    this.routetype = value;
  }
  onDepartChange(value) {
    this.depart = value;
  }
  onMonthChange(date, dateString) {
    this.setState({
      monthDate: date
    })
    console.log(date, dateString);
  }

  onUserTextChange(e) {
    this.userid = e.target.value;
  }
  onPathTextChange(e) {
    this.path = e.target.value;
  }

  onRouteBasicChange(routeBasic) {
    this.setState({
      routeBasic
    })
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
    // 查询基础路线     
    if (this.userid != "") {
      var userInfo = this.checkUserId();
      if (!userInfo) {
        message.info("工号或姓名错误，请重新输入");
        return;
      }
      if (this.depart != 0 && userInfo.depart != this.depart) {
        message.info("员工不在该区域下，请重新选择");
        return;
      }
      if (this.routetype == 2 && userInfo.userid != userInfo.id){
        message.info("员工不是大区主管，没有稽核路线");
        return;
      }
    }

    var data = {
      path: this.path,
    };
    

    if (userInfo.userid == userInfo.id) {
      //用户为区域主管
      data.depart = userInfo.depart;
    } else {
      data.userid = userInfo.username;
    }
    console.log(data);
    Action.getRouteBasic(data);
    if (this.routetype == 1) { //所辖路线


    }
  }

  onSubsidyChange() {
    this.setState({
      subsidy: Store.getSubsidy(),
      loading: false,
    })
  }
  onDepartnameChange() {
    this.setState({
      department: Store.getDepartment(),
      loading: false,
    })
  }

  onModalvalueChange(e) {
    this.setState({
      modalvalue: e.target.value
    })
  }
  handleOk() {
    var data = {
      role_id: this._curRecord.id,
      key: this._cate,
      value: this.state.modalvalue,
    }
    console.log("updateSubsidy", data);
    Action.updateSubsidy(data);
  }
  handleCancel() {
    this.setState({ visible: false })
  }

  onClickText(text, record, cate) {
    this._curRecord = record;
    this._cate = cate;
    this.setState({
      visible: true,
      modaltitle: this.subsidyInfo[cate].name,
      modalvalue: text,
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
  getTableColumn() {
    var context = this;
    return [
      {
        title: <p style={{ textAlign: 'center' }}>区域</p>,
        dataIndex: 'departname',
        key: 'departname',
        width: 60,
        fixed: 'left'
      }, {
        title: <p style={{ textAlign: 'center' }}>姓名</p>,
        dataIndex: 'realname',
        key: 'realname',
        width: 60,
        fixed: 'left'
      }, {
        title: <p style={{ textAlign: 'center' }}>岗位</p>,
        dataIndex: 'rolename',
        key: 'rolename',
        width: 65,
        fixed: 'left'
      }, {
        title: <p style={{ textAlign: 'center' }}>路线</p>,
        dataIndex: 'Path_name',
        key: 'Path_name',
        width: 65,
        fixed: 'left'
      }, {
        title: <p style={{ textAlign: 'center' }}>门店名称</p>,
        dataIndex: 'Store_name',
        key: 'Store_name',
        width: 100,
        fixed: 'left'
      }, {
        title: <p style={{ textAlign: 'center' }}>门店等级</p>,
        dataIndex: 'Level',
        key: 'Level',
        width: 50,
      }, {
        title: <p style={{ textAlign: 'center' }}>省</p>,
        dataIndex: 'Province',
        key: 'Province',
        width: 60,
      }, {
        title: <p style={{ textAlign: 'center' }}>市</p>,
        dataIndex: 'City',
        key: 'City',
        width: 60,
      }, {
        title: <p style={{ textAlign: 'center' }}>区</p>,
        dataIndex: 'Area',
        key: 'Area',
        width: 60,
      }, {
        title: <p style={{ textAlign: 'center' }}>城市等级</p>,
        dataIndex: 'City_lev',
        key: 'City_lev',
        width: 50,
      }, {
        title: <p style={{ textAlign: 'center' }}>门店地址</p>,
        dataIndex: 'Address',
        key: 'Address',
        width: 120,
      }, {
        title: <p style={{ textAlign: 'center' }}>拜访性质</p>,
        dataIndex: 'nature',
        key: 'nature',
        width: 80,
      }, {
        title: <p style={{ textAlign: 'center' }}>工作地交通补贴</p>,
        dataIndex: 'gzdjt',
        key: 'gzdjt',
        width: 55,
      }, {
        title: <p style={{ textAlign: 'center' }}>误餐补贴</p>,
        dataIndex: 'gzdcf',
        key: 'gzdcf',
        width: 50,
      }, {
        title: <p style={{ textAlign: 'center' }}>通讯费</p>,
        dataIndex: 'txf',
        key: 'txf',
        width: 50,
      }, {
        title: <p style={{ textAlign: 'center' }}>路线描述</p>,
        dataIndex: 'routedes',
        key: 'routedes',
        width: 100,
      }, {
        title: <p style={{ textAlign: 'center' }}>交通工具</p>,
        dataIndex: 'jtgj',
        key: 'jtgj',
        width: 65,
      }, {
        title: <p style={{ textAlign: 'center' }}>交通班次</p>,
        dataIndex: 'jtbc',
        key: 'jtbc',
        width: 65,
      }, {
        title: <p style={{ textAlign: 'center' }}>出发时间</p>,
        dataIndex: 'starttime',
        key: 'starttime',
        width: 65,
      }, {
        title: <p style={{ textAlign: 'center' }}>到达时间</p>,
        dataIndex: 'arrivetime',
        key: 'arrivetime',
        width: 65,
      }, {
        title: <p style={{ textAlign: 'center' }}>出差地城市等级</p>,
        dataIndex: 'cc_city_level',
        key: 'cc_city_level',
        width: 55,
      }, {
        title: <p style={{ textAlign: 'center' }}>长途交通费</p>,
        dataIndex: 'ctjtf',
        key: 'ctjtf',
        width: 50,
      }, {
        title: <p style={{ textAlign: 'center' }}>出差地交通费</p>,
        dataIndex: 'ccjt',
        key: 'ccjt',
        width: 50,
      }, {
        title: <p style={{ textAlign: 'center' }}>出差补贴</p>,
        dataIndex: 'ccbt',
        key: 'ccbt',
        width: 50,
      }, {
        title: <p style={{ textAlign: 'center' }}>住宿费</p>,
        dataIndex: 'cczs',
        key: 'cczs',
        width: 50,
      }, {
        title: <p style={{ textAlign: 'center' }}>住宿酒店</p>,
        dataIndex: 'hotelname',
        key: 'hotelname',
        width: 100,
      }, {
        title: <p style={{ textAlign: 'center' }}>酒店地址</p>,
        dataIndex: 'hoteladdress',
        key: 'hoteladdress',
        width: 120,
      }, {
        title: <p style={{ textAlign: 'center' }}>酒店电话</p>,
        dataIndex: 'hotelphone',
        key: 'hotelphone',
        width: 80,
      }];
  }
  getTableData() {
    return [{
      departname: '苏皖区',
      realname: '李春香',
      rolename: '销售代表',
      Path_name: '合肥9-1',
      Store_name: '家乐福合肥肥西名邦店',
      Level: 'A',
      Province: '安徽省',
      City: '合肥市',
      Area: '肥西县',
      City_lev: '1级',
      Address: '安徽省合肥市肥西县巢湖路与站前路交叉口名邦广场',
      nature: '室内拜访',
      gzdjt: '40',
      gzdcf: '20',
      txf: '20',
      routedes: '合肥-肥西-合肥',
      jtgj: '高铁',
      jtbc: 'D5653',
      starttime: '9:20',
      arrivetime: '11:20',
      cc_city_level: '1级',
      ctjtf: '80',
      ccjt: '20',
      ccbt: '15',
      cczs: '200',
      hotelname: '锦江之星（蚌埠高铁站胜利路店）',
      hoteladdress: '蚌埠市蚌山区 胜利东路1200号，近蚌埠电视塔附近',
      hotelphone: '0552-3838777',
    }];
    this.state.subsidy.forEach((sa, i) => {
      sa.key = i.toString();
    })
    return this.state.subsidy;
  }
  rowClassName(record, index) {
    return styles.table_row;
  }
  render() {
    return (
      <div className={styles.configcontent}>
        <p className={styles.configtitle}>路线费用标准</p>
        <div className={styles.editcontent}>
          <MonthPicker value={this.state.monthDate} onChange={this.onMonthChange} placeholder="Select month" />
          <Select onChange={this.onRouteTypeChange} defaultValue={this.routetype} style={{ width: 120, margin: '0 10px' }}>
            {this.routetype.map((rt) => {
              return <Option value={rt.type}>{rt.name}</Option>
            }) }
          </Select>
          <Select onChange={this.onDepartChange} defaultValue={this.depart} style={{ width: 120, marginRight: '10px' }}>
            {this.getDepartOption() }
          </Select>
          <Input onChange={this.onUserTextChange} style={{ width: '120px', marginRight: '10px' }} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="工号/姓名" />
          <Input onChange={this.onPathTextChange} style={{ width: '120px', marginRight: '10px' }} prefix={<Icon type="share-alt" style={{ fontSize: 13 }} />} placeholder="路线编号/名称" />
          <Button icon="search" onClick={this.onClickQuery} type="primary">查询</Button>
        </div>
        <div className={styles.configtable}>
          <Table size="small" loading={this.state.loading} bordered pagination={false} scroll={{ x: 1900 }}
            rowClassName={this.rowClassName}
            columns={this.getTableColumn() } dataSource={this.getTableData() } />
        </div>
        <Modal width={350} title={this.state.modaltitle} visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
          >
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>标准</span>
            <div className={styles.form}>
              <Input value={this.state.modalvalue} onChange={this.onModalvalueChange} placeholder="请输入标准" />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Routecost;