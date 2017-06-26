import React from 'react';
import { Table, Select, Button, Icon, Modal, Input, Popconfirm, message, DatePicker } from 'antd';
import styles from './visitor.less';
const { MonthPicker, RangePicker } = DatePicker;

function percentNum(num, num2) {
  if (num2 == 0) {
    return '0';
  }
  return Math.round(num / num2 * 10000) / 100.00; //小数点后两位百分比
}

class SaleActualSum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saleActual: [],
      department: Store.getDepartment(),
      user: Store.getUser(),
      monthDate: moment(),
      mainshelfImage: [],
      loading: false,
    };
    this.onSaleActualChange = this.onSaleActualChange.bind(this);

    this.onClickQuery = this.onClickQuery.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);

    this.onDepartChange = this.onDepartChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onDepartnameChange = this.onDepartnameChange.bind(this);
    this.onUserTextChange = this.onUserTextChange.bind(this);
    this.onMainshelfImageChange = this.onMainshelfImageChange.bind(this);

    this.userid = "";
    this.depart = 0;

  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_DEPARTMENT, this.onDepartnameChange);
    Store.addChangeListener(StoreEvent.SE_SALEACTUAL, this.onSaleActualChange);
    Store.addChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Store.addChangeListener(StoreEvent.SE_MAINSHELFIMAGE, this.onMainshelfImageChange);
    Action.getUser();
    Action.getDepartment();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_DEPARTMENT, this.onDepartnameChange);
    Store.removeChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Store.removeChangeListener(StoreEvent.SE_SALEACTUAL, this.onSaleActualChange);
    Store.removeChangeListener(StoreEvent.SE_MAINSHELFIMAGE, this.onMainshelfImageChange);
  }

  onSaleActualChange(saleActual) {
    this.setState({
      saleActual,
      loading: false
    })

    // if (saleActual.length > 0) {
    //   var data = {
    //     userid: this.userid,
    //     begindate: this.state.monthDate.startOf('month').format("YYYY-MM-DD"),
    //     enddate: this.state.monthDate.endOf('month').format("YYYY-MM-DD"),
    //   };
    //   console.log(data);
    //   Action.getMainshelfImage(data);
    // }
  }
  onMainshelfImageChange(mainshelfImage) {
    this.setState({
      mainshelfImage
    })
  }

  onUserChange() {
    this.setState({ user: Store.getUser() })
  }
  onDepartChange(value) {
    this.depart = value;
    this.setState({
      user: Store.getUser()
    })

  }
  onUserTextChange(e) {
    this.userid = e;
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
  getUserOption() {
    var userlist = this.state.user;
    var userDom = [];
    for (var i = 0; i < userlist.length; i++) {
      if (this.depart == 0 || userlist[i].depart == this.depart) {
        if (userlist[i].enableapp == 1) {
          userDom.push(<Option value={userlist[i].username}>{userlist[i].realname}</Option>)
        }
      }
    }
    return userDom;
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
    var data = {
      year: this.state.monthDate.year(),
      month: this.state.monthDate.month() + 1,
      //userid: this.userid
    };

    console.log(data);
    Action.getSaleActual(data);
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
      title: '大区',
      dataIndex: 'departname',
      key: 'departname',
      width: 80,
    }, {
        title: '销售负责',
        dataIndex: 'realname',
        key: 'realname',
        width: 100,
      }, {
        title: 'SKU上架动销率',
        dataIndex: 'sku_percent',
        key: 'sku_percent',
        render: function (text, record) {
          return text + '%';
        },
        width: 80,
      }, {
        title: '大区排名',
        dataIndex: 'depart_rank',
        key: 'depart_rank',
        width: 80,
      }];
  }
  getTableData() {
    var context = this;
    var saleActualSum = [];
    var getsaleSum = function (user_id) {
      for (var i = 0; i < saleActualSum.length; i++) {
        if (saleActualSum[i].user_id == user_id) {
          return saleActualSum[i];
        }
      }
    }

    var tableData = [];

    var saleActual = this.state.saleActual;
    for (var i = 0; i < saleActual.length; i++) {
      var saleSum = getsaleSum(saleActual[i].user_id);
      if (!saleSum) {
        saleSum = {
          user_id: saleActual[i].user_id,
          realname: saleActual[i].realname,
          departname: saleActual[i].departname,
          allproduct: 0,
          dxproduct: 0
        }
        if (saleSum.departname) {
          saleActualSum.push(saleSum);
        }
      }
      if (saleActual[i].sum > 0) {
        saleSum.dxproduct++;
      }
      saleSum.allproduct++;
    }

    saleActualSum.forEach((as, index) => {
      as.sku_percent = percentNum(as.dxproduct, as.allproduct);
      as.sortIndex = index;
    })

    saleActualSum.sort((a, b) => {
       if (a.departname === b.departname) {
         return b.sku_percent - a.sku_percent || a.sortIndex - b.sortIndex;
       } else {
        return (a.departname > b.departname ? 1 : -1) || a.sortIndex - b.sortIndex;
      }
    })

    var rank = 1;
    var lastdepartname = "";
    saleActualSum.forEach((as) => {
      if (lastdepartname != as.departname) {
        rank = 1;
        lastdepartname = as.departname;
      }
      as.depart_rank = rank;
      rank++;
    })

    console.log("saleActualSum", saleActualSum);

    return saleActualSum;
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
        <p className={styles.visitortitle}>动销汇总</p>
        <div className={styles.queryContainer}>
          <MonthPicker value={this.state.monthDate} onChange={this.onMonthChange} style={{ width: 120, marginRight: '10px' }} placeholder="Select month" />
          <Button icon="search" onClick={this.onClickQuery} type="primary">查询</Button>
        </div>
        <div className={styles.resultContent}>
          <Table loading={this.state.loading} pagination={false} scroll={{ y: scrolly }}
            size="small" columns={this.getTableColumn() } dataSource={this.getTableData() } />
        </div>
      </div >
    );
  }
}

export default SaleActualSum;