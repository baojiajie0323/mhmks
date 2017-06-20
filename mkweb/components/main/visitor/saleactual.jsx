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

class SaleActual extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saleActual: [],
      department: Store.getDepartment(),
      user: Store.getUser(),
      monthDate: moment(),
      loading:false,
    };
    this.onSaleActualChange = this.onSaleActualChange.bind(this);
    
    this.onClickQuery = this.onClickQuery.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);

    this.onDepartChange = this.onDepartChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onDepartnameChange = this.onDepartnameChange.bind(this);
    this.onUserTextChange = this.onUserTextChange.bind(this);

    this.userid = "";
    this.depart = 0;

  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_DEPARTMENT, this.onDepartnameChange);
    Store.addChangeListener(StoreEvent.SE_SALEACTUAL, this.onSaleActualChange);
    Store.addChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Action.getUser();
    Action.getDepartment();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_DEPARTMENT, this.onDepartnameChange);
    Store.removeChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Store.removeChangeListener(StoreEvent.SE_SALEACTUAL, this.onSaleActualChange);

  }
  
  onSaleActualChange(saleActual) {
    this.setState({
      saleActual,
      loading:false
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
      year: this.state.monthDate.year(),
      month: this.state.monthDate.month()
    };
    if (this.userid != "") {
      data.userid = this.userid;
    } else {
      data.depart = this.depart;
    }
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
      title: '系统',
      dataIndex: 'area_name',
      key: 'area_name',
      width: 100
    }, {
      title: '门店名称',
      dataIndex: 'store_name',
      key: 'store_name',
      width: 150
    }, {
      title: '品牌',
      dataIndex: 'brand_name',
      key: 'brand_name',
      width: 80
    }, {
      title: '产品系列',
      dataIndex: 'series_name',
      key: 'series_name',
      width: 80
    }, {
      title: '产品号',
      dataIndex: 'serial_no',
      key: 'serial_no',
      width: 100
    }, {
      title: '产品名称',
      dataIndex: 'Product_name',
      key: 'Product_name',
      width: 200
    }, {
      title: '月实销量',
      dataIndex: 'sum',
      key: 'sum',
      width: 80
    }];
  }
  getTableData() {
    var context = this;
    var tableData = this.state.saleActual;
    return tableData;
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
        <p className={styles.visitortitle}>销售代表月SKU上架动销</p>
        <div className={styles.queryContainer}>
          <MonthPicker value={this.state.monthDate} onChange={this.onMonthChange} style={{ width: 120, marginRight: '10px' }}placeholder="Select month" />
          <Select onChange={this.onDepartChange} defaultValue={this.depart} style={{ width: 120, marginRight: '10px' }}>
            {this.getDepartOption()}
          </Select>
          <Input onChange={this.onUserTextChange} style={{ width: '120px', marginRight: '10px' }} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="工号/姓名" />
          <Button icon="search" onClick={this.onClickQuery} type="primary">查询</Button>
        </div>
        <div className={styles.resultContent}>
          <Table loading={this.state.loading} pagination={false} scroll={{ y: scrolly }}
            size="small" columns={this.getTableColumn()} dataSource={this.getTableData()} />
        </div>
        <div id="allmap" style={{ visibility: 'hidden' }} className={styles.allmap}></div>
      </div>
    );
  }
}

export default SaleActual;