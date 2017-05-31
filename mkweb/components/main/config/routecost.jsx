import React from 'react';
import { Table, Button, Radio, Icon, Modal, Input, Popconfirm, message, Select, DatePicker } from 'antd';
import styles from './config.less';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Option = Select.Option;
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
      routeBasic: [],
      routeCost: Store.getRouteCost(),
    };
    this._routetype = [{
      type: 1,
      name: "所辖门店"
    }, {
        type: 2,
        name: "稽核门店"
      }];

    this._routeNature = [{
      nature: "1",
      name: "室内拜访"
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

    this._routeCostTable = {
      nature: {
        name: '拜访性质',
        key: '拜访性质：',
        selectoption: this._routeNature.map((rn) => {
          return {
            key: rn.nature,
            value: rn.name
          }
        }),
        selectmode: 'select',
      },
      routedes: {
        name: '路线描述',
        key: '路线描述：',
        selectmode: 'text',
      },
      jtgj: {
        name: '交通工具',
        key: '交通工具：',
        selectmode: 'text',
      },
      jtbc: {
        name: '交通班次',
        key: '交通班次：',
        selectmode: 'text',
      }
    }
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onSubsidyChange = this.onSubsidyChange.bind(this);
    this.onDepartnameChange = this.onDepartnameChange.bind(this);
    this.onRouteTypeChange = this.onRouteTypeChange.bind(this);
    this.onDepartChange = this.onDepartChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onRouteBasicChange = this.onRouteBasicChange.bind(this);
    this.onRouteCostChange = this.onRouteCostChange.bind(this);

    this.onModalvalueChange = this.onModalvalueChange.bind(this);
    this.onClickText = this.onClickText.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onUserTextChange = this.onUserTextChange.bind(this);
    this.onPathTextChange = this.onPathTextChange.bind(this);
    this.onClickQuery = this.onClickQuery.bind(this);

    this.userid = "Z00001";
    this.path = "";
    this.routetype = 1;
    this.depart = 0;
    this.noValue = " ";
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_SUBSIDY, this.onSubsidyChange);
    Store.addChangeListener(StoreEvent.SE_DEPARTMENT, this.onDepartnameChange);
    Store.addChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Store.addChangeListener(StoreEvent.SE_ROUTEBASIC, this.onRouteBasicChange);
    Store.addChangeListener(StoreEvent.SE_ROUTECOST, this.onRouteCostChange);

    Action.getUser();
    Action.getDepartment();
    Action.getSubsidy();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_SUBSIDY, this.onSubsidyChange);
    Store.removeChangeListener(StoreEvent.SE_DEPARTMENT, this.onDepartnameChange);
    Store.removeChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Store.removeChangeListener(StoreEvent.SE_ROUTEBASIC, this.onRouteBasicChange);
    Store.removeChangeListener(StoreEvent.SE_ROUTECOST, this.onRouteCostChange);
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
    var context = this;
    this.setState({
      routeBasic
    }, function () {
      var pathList = context.getRoutePath();
      var data = {
        routedate: this.state.monthDate.format("YYYY-MM"),
        pathlist: pathList.map((pl) => {
          return pl.Path_id;
        })
      }
      data.pathlist = JSON.stringify(data.pathlist);

      console.log("getRouteCost", data);
      Action.getRouteCost(data);
    })

  }

  onRouteCostChange() {
    this.setState({
      routeCost: Store.getRouteCost(),
      visible: false
    })
  }

  getNaure(nature) {
    for (var i = 0; i < this._routeNature.length; i++) {
      if (this._routeNature[i].nature == nature) {
        return this._routeNature[i];
      }
    }
    return null;
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
    // 查询基础路线     
    if (this.userid != "") {
      if (!userInfo) {
        message.info("工号或姓名错误，请重新输入");
        return;
      }
      if (this.depart != 0 && userInfo.depart != this.depart) {
        message.info("员工不在该区域下，请重新选择");
        return;
      }
      if (this.routetype == 2 && userInfo.userid != userInfo.id) {
        message.info("员工不是大区主管，没有稽核路线");
        return;
      }
    }

    if (this.userid == "" && this.depart == 0 && this.path == "") {
      message.info("请选择条件进行查询");
      return;
    }

    var data = {
      path: this.path,
    };

    if (this.routetype == 1) { //所辖路线
      if (userInfo) {
        data.userid = userInfo.username;
      }
      if (this.depart != 0) {
        data.depart = this.depart;
      }
    } else { //稽核路线
      if (this.depart != 0) {
        data.depart = this.depart;
      } else if (userInfo) {
        data.depart = userInfo.depart;
      }
    }
    console.log("onClickQuery", data);
    Action.getRouteBasic(data);
  }

  onSubsidyChange() {
    this.setState({
      subsidy: Store.getSubsidy(),
      loading: false,
    })
  }
  getSubsidyInfo(role_id) {
    for (var i = 0; i < this.state.subsidy.length; i++) {
      if (this.state.subsidy[i].role_id == role_id) {
        return this.state.subsidy[i];
      }
    }
  }
  onDepartnameChange() {
    this.setState({
      department: Store.getDepartment(),
      loading: false,
    })
  }

  onModalvalueChange(e) {
    this.setState({
      modalvalue: this.state.modalselectmode == "select" ? e : e.target.value
    })
  }
  handleOk() {
    var data = {
      routedate: this.state.monthDate.format("YYYY-MM"),
      routetype: this.routetype,
      routemark: this._record.routemark,
      path_id: this._record.Path_id,
      store_id: this._record.Store_id,
      key: this._cate,
      value: this.state.modalvalue,
    }
    console.log("updateRouteCost", data);
    Action.updateRouteCost(data);
  }
  handleCancel() {
    this.setState({ visible: false })
  }

  onClickText(text, record, cate) {
    this._curRecord = record;
    this._cate = cate;
    this._record = record;
    this.setState({
      visible: true,
      modaltitle: this._routeCostTable[cate].name,
      modalselectmode: this._routeCostTable[cate].selectmode,
      modalselectoption: this._routeCostTable[cate].selectoption,
      modalkey: this._routeCostTable[cate].key,
      modalvalue: text.toString(),
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
        fixed: 'left',
        render: function (text, record, index) {
          if (record.routemark == 1) {
            return text;
          }
        }
      }, {
        title: <p style={{ textAlign: 'center' }}>路线</p>,
        dataIndex: 'Path_name',
        key: 'Path_name',
        width: 85,
        fixed: 'left',
        render: function (text, record, index) {
          if (record.routemark == 1) {
            return text;
          }
        }
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
        dataIndex: 'province',
        key: 'province',
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
        render: function (text, record, index) {
          if (record.routemark == 2) {
            return text + "级";
          }
        }
      }, {
        title: <p style={{ textAlign: 'center' }}>门店地址</p>,
        dataIndex: 'Address',
        key: 'Address',
        width: 150,
      }, {
        title: <p style={{ textAlign: 'center' }}>拜访性质</p>,
        dataIndex: 'nature',
        key: 'nature',
        width: 80,
        render: function (text, record) {
          if (record.routemark == 1) {
            var nature = context.getNaure(text);
            var natureValue = "未选择";
            if (nature) {
              natureValue = nature.name;
            }
            return <p style={{ whiteSpace: 'pre-wrap', color: "rgb(16,142,233)", cursor: 'pointer' }}
              onClick={function () { context.onClickText(text, record, 'nature') } } >{natureValue}</p>
          }
        }
      }, {
        title: <p style={{ textAlign: 'center' }}>工作地交通补贴</p>,
        dataIndex: 'gzdjt',
        key: 'gzdjt',
        width: 55,
        render: function (text, record) {
          if (record.routemark == 1) {
            var subsidyInfo = context.getSubsidyInfo(record.role_id);
            if (record.nature == 1 || record.nature == 4) {
              if (record.citylev == 1) {
                return subsidyInfo.gzdjt1;
              } else if (record.citylev == 2) {
                return subsidyInfo.gzdjt2;
              } else {
                return subsidyInfo.gzdjt3;
              }
            } else {
              return "/";
            }
          }
        }
      }, {
        title: <p style={{ textAlign: 'center' }}>误餐补贴</p>,
        dataIndex: 'gzdcf',
        key: 'gzdcf',
        width: 50,
        render: function (text, record) {
          if (record.routemark == 1) {
            var subsidyInfo = context.getSubsidyInfo(record.role_id);
            if (record.citylev == 1) {
              return subsidyInfo.gzdcf1;
            } else if (record.citylev == 2) {
              return subsidyInfo.gzdcf2;
            } else {
              return subsidyInfo.gzdcf3;
            }
          }
        }
      }, {
        title: <p style={{ textAlign: 'center' }}>通讯费</p>,
        dataIndex: 'txf',
        key: 'txf',
        width: 50,
        render: function (text, record) {
          if (record.routemark == 1) {
            var subsidyInfo = context.getSubsidyInfo(record.role_id);
            return subsidyInfo.txf;
          }
        }
      }, {
        title: <p style={{ textAlign: 'center' }}>路线描述</p>,
        dataIndex: 'routedes',
        key: 'routedes',
        width: 100,
        render: function (text, record) {
          if (record.routemark == 1) {
            var textvalue = text;
            if (textvalue == "") {
              textvalue = context.noValue;
            }
            return <p style={{ whiteSpace: 'pre-wrap', color: "rgb(16,142,233)", cursor: 'pointer' }}
              onClick={function () { context.onClickText(text, record, 'routedes') } } >{textvalue}</p>
          }
        }
      }, {
        title: <p style={{ textAlign: 'center' }}>交通工具</p>,
        dataIndex: 'jtgj',
        key: 'jtgj',
        width: 65,
        render: function (text, record) {
          if (record.routemark == 2) {
            var textvalue = text;
            if (textvalue == "") {
              textvalue = context.noValue;
            }
            return <p style={{ whiteSpace: 'pre-wrap', color: "rgb(16,142,233)", cursor: 'pointer' }}
              onClick={function () { context.onClickText(text, record, 'jtgj') } } >{textvalue}</p>
          }
        }
      }, {
        title: <p style={{ textAlign: 'center' }}>交通班次</p>,
        dataIndex: 'jtbc',
        key: 'jtbc',
        width: 65,
        render: function (text, record) {
          if (record.routemark == 2) {
            var textvalue = text;
            if (textvalue == "") {
              textvalue = context.noValue;
            }
            return <p style={{ whiteSpace: 'pre-wrap', color: "rgb(16,142,233)", cursor: 'pointer' }}
              onClick={function () { context.onClickText(text, record, 'jtbc') } } >{textvalue}</p>
          }
        }
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
        render: function (text, record) {
          if (record.routemark == 1) {
            var subsidyInfo = context.getSubsidyInfo(record.role_id);
            if (record.nature == 2 || record.nature == 3) {
              if (record.citylev == 1) {
                return subsidyInfo.ccjt1;
              } else if (record.citylev == 2) {
                return subsidyInfo.ccjt2;
              } else {
                return subsidyInfo.ccjt3;
              }
            } else {
              return "/";
            }
          }
        }
      }, {
        title: <p style={{ textAlign: 'center' }}>出差补贴</p>,
        dataIndex: 'ccbt',
        key: 'ccbt',
        width: 50,
        render: function (text, record) {
          if (record.routemark == 1) {
            var subsidyInfo = context.getSubsidyInfo(record.role_id);
            if (record.nature == 2 || record.nature == 3) {
              if (record.citylev == 1) {
                return subsidyInfo.ccbt1;
              } else if (record.citylev == 2) {
                return subsidyInfo.ccbt2;
              } else {
                return subsidyInfo.ccbt3;
              }
            } else {
              return "/";
            }
          }
        }
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
  getUserInfo(userid) {
    for (var i = 0; i < this.state.user.length; i++) {
      if (this.state.user[i].username == userid) {
        return this.state.user[i];
      }
    }
  }
  getDepartName(depart) {
    for (var i = 0; i < this.state.department.length; i++) {
      if (this.state.department[i].id == depart) {
        return this.state.department[i].name;
      }
    }
  }
  getRouteCostInfo(routemark, path_id, store_id) {
    var routeCost = this.state.routeCost;
    store_id = store_id || "";
    for (var i = 0; i < routeCost.length; i++) {
      if (routeCost[i].routemark == routemark &&
        routeCost[i].path_id == path_id &&
        routeCost[i].store_id == store_id) {
        return routeCost[i];
      }
    }
  }
  getRoutePath() {
    var context = this;
    var routebasic = this.state.routeBasic;

    var path = [];
    var isExist = function (Path_id) {
      for (var i = 0; i < path.length; i++) {
        if (path[i].Path_id == Path_id) {
          return true;
        }
      }
      return false;
    }
    routebasic.forEach((rb) => {
      if (!isExist(rb.Path_id)) {
        var userInfo = context.getUserInfo(rb.user_id);
        var routeCostInfo = context.getRouteCostInfo(1, rb.Path_id, null);
        path.push({
          routemark: 1,
          Path_id: rb.Path_id,
          Path_name: rb.Path_name,
          rolename: rb.rolename,
          role_id: rb.role_id,
          realname: userInfo ? userInfo.realname : "",
          departname: userInfo ? context.getDepartName(userInfo.depart) : "",
          nature: routeCostInfo ? routeCostInfo.nature : "",
          routedes: routeCostInfo && routeCostInfo.routedes ? routeCostInfo.routedes : "",
        })
      }
    });
    return path;
  }
  getTableData() {
    var routebasic = this.state.routeBasic;
    var tableData = [];
    var routePath = this.getRoutePath();
    for (var i = 0; i < routePath.length; i++) {
      var PathInfo = routePath[i];
      tableData.push(PathInfo);
      var citylev = 3;
      for (var j = 0; j < routebasic.length; j++) {
        if (routebasic[j].Path_id == PathInfo.Path_id) {
          var routeCostInfo = this.getRouteCostInfo(2, routebasic[j].Path_id, routebasic[j].Store_id);
          routebasic[j].routemark = 2;
          routebasic[j].jtgj = routeCostInfo && routeCostInfo.jtgj ? routeCostInfo.jtgj : "";
          routebasic[j].jtbc = routeCostInfo && routeCostInfo.jtbc ? routeCostInfo.jtbc : "";
          if (routebasic[j].City_lev < citylev) {
            citylev = routebasic[j].City_lev;
          }
          tableData.push(routebasic[j]);
        }
      }
      PathInfo.citylev = citylev;
    }

    // return [{
    //   departname: '苏皖区',
    //   realname: '李春香',
    //   rolename: '销售代表',
    //   Path_name: '合肥9-1',
    //   Store_name: '家乐福合肥肥西名邦店',
    //   Level: 'A',
    //   province: '安徽省',
    //   City: '合肥市',
    //   Area: '肥西县',
    //   City_lev: '1级',
    //   Address: '安徽省合肥市肥西县巢湖路与站前路交叉口名邦广场',
    //   nature: '室内拜访',
    //   gzdjt: '40',
    //   gzdcf: '20',
    //   txf: '20',
    //   routedes: '合肥-肥西-合肥',
    //   jtgj: '高铁',
    //   jtbc: 'D5653',
    //   starttime: '9:20',
    //   arrivetime: '11:20',
    //   cc_city_level: '1级',
    //   ctjtf: '80',
    //   ccjt: '20',
    //   ccbt: '15',
    //   cczs: '200',
    //   hotelname: '锦江之星（蚌埠高铁站胜利路店）',
    //   hoteladdress: '蚌埠市蚌山区 胜利东路1200号，近蚌埠电视塔附近',
    //   hotelphone: '0552-3838777',
    // }];
    tableData.forEach((sa, i) => {
      sa.key = i.toString();
    })
    return tableData;
  }
  rowClassName(record, index) {
    var style = [styles.table_row];
    if (record.routemark == 1) {
      style.push(styles.path_cell);
    }
    return style.join(' ');
  }
  render() {
    var scrolly = 350;
    var height = document.body.clientHeight;
    if (height > 0) {
      scrolly = height - 280;
    }
    return (
      <div className={styles.configcontent}>
        <p className={styles.configtitle}>路线费用标准</p>
        <div className={styles.editcontent}>
          <MonthPicker value={this.state.monthDate} onChange={this.onMonthChange} placeholder="Select month" />
          <Select onChange={this.onRouteTypeChange} defaultValue={this.routetype} style={{ width: 120, margin: '0 10px' }}>
            {this._routetype.map((rt) => {
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
          <Table size="small" loading={this.state.loading} bordered pagination={false} scroll={{ x: 1950, y: scrolly }}
            rowClassName={this.rowClassName}
            columns={this.getTableColumn() } dataSource={this.getTableData() } />
        </div>
        <Modal width={350} title={this.state.modaltitle} visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
          >
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>{this.state.modalkey}</span>
            <div className={styles.form}>
              {this.state.modalselectmode == "select" ?
                <Select style={{ width: '100%' }} value={this.state.modalvalue} onChange={this.onModalvalueChange} placeholder="请选择" >
                  {this.state.modalselectoption.map((so) => {
                    return <Option value={so.key}>{so.value}</Option>
                  }) }
                </Select> :
                <Input value={this.state.modalvalue} onChange={this.onModalvalueChange} placeholder="请输入" />
              }

            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Routecost;