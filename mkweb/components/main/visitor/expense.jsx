import React from 'react';
import { Table, Select, Button, Icon, Modal, Input, Popconfirm, message, DatePicker } from 'antd';
import styles from './visitor.less';
const { MonthPicker, RangePicker } = DatePicker;


class Expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saleActual: [],
      user: Store.getUser(),
      monthDate: moment(),
      loading: false,
    };
    this.onSaleActualChange = this.onSaleActualChange.bind(this);

    this.onClickQuery = this.onClickQuery.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);

    this.onUserChange = this.onUserChange.bind(this);
    this.onUserTextChange = this.onUserTextChange.bind(this);

    this.userid = "";
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_SALEACTUAL, this.onSaleActualChange);
    Store.addChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Action.getUser();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Store.removeChangeListener(StoreEvent.SE_SALEACTUAL, this.onSaleActualChange);
  }

  onSaleActualChange(saleActual) {
    this.setState({
      saleActual,
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
        <p className={styles.visitortitle}>报销费用审核</p>
        <div className={styles.queryContainer}>
          <MonthPicker value={this.state.monthDate} onChange={this.onMonthChange} style={{ width: 120, marginRight: '10px' }} placeholder="Select month" />
          <Select onChange={this.onUserTextChange} placeholder="请选择销售代表" style={{ width: 120, marginRight: '10px' }}>
            {this.getUserOption()}
          </Select>
          <Button icon="search" onClick={this.onClickQuery} type="primary">查询</Button>
        </div>
        <div className={styles.resultContent}>
          <Table loading={this.state.loading} pagination={false} scroll={{ y: scrolly }}
            size="small" columns={this.getTableColumn()} dataSource={this.getTableData()} />
        </div>
      </div >
    );
  }
}

export default Expense;