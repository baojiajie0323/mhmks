import React from 'react';
import { Table, Button, Icon, Modal, Input, Select, Tree, Popconfirm, message, DatePicker } from 'antd';
import styles from './visitor.less';
const { MonthPicker, RangePicker } = DatePicker;

class Parttime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Store.getUser(),
      storeBasic: Store.getStoreBasic(),
      parttime: [],
      showPicture: false,
      bigPicture: ""
    };

    this.userid = "";
    this.storeid = "";
    this.queryData = [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")];

    this.onDateChange = this.onDateChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onStoreBasicChange = this.onStoreBasicChange.bind(this);
    this.onParttimeChange = this.onParttimeChange.bind(this);
    this.onClickQuery = this.onClickQuery.bind(this);

    this.onClickCardid = this.onClickCardid.bind(this);
    this.onClickBankcard = this.onClickBankcard.bind(this);

    this.onUserOptChange = this.onUserOptChange.bind(this);
    this.onStoreOptChange = this.onStoreOptChange.bind(this);
    this.handlePictureCancel = this.handlePictureCancel.bind(this);
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


  onStoreOptChange(e) {
    this.storeid = e;
  }
  onUserOptChange(e) {
    this.userid = e;
    this.setState({
      user: Store.getUser()
    })
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
    storeDom.push(<Option value={"0"}>所有门店</Option>)
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

  onClickCardid(record) {
    if (record.cardidfile) {
      this.setState({
        showPicture: true,
        bigPicture: 'url("' + '../upload/' + record.cardidfile + '.jpg")'
      })
    } else {
      message.info("没有照片")
    }
  }

  onClickBankcard(record) {
    if (record.bankcardfile) {
      this.setState({
        showPicture: true,
        bigPicture: 'url("' + '../upload/' + record.bankcardfile + '.jpg")'
      })
    } else {
      message.info("没有照片")
    }
  }

  getTableColumn() {
    var context = this;
    return [{
      title: '销售代表',
      dataIndex: 'realname',
      key: 'realname',
    }, {
      title: '门店名称',
      dataIndex: 'store_name',
      key: 'store_name',
    }, {
      title: '兼促姓名',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: function(text,record){
        if(text == 1){
          return '男'
        }else{
          return '女'
        }
      }
    }, {
      title: '身份证',
      dataIndex: 'cardid',
      key: 'cardid',
      render: function (text, record) {
        return <a onClick={function(){context.onClickCardid(record)}}>{text}</a>
      }
    }, {
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '本职工作',
      dataIndex: 'work',
      key: 'work',
    }, {
      title: '银行卡号',
      dataIndex: 'bankcard',
      key: 'bankcard',
      render: function (text, record) {
        return <a onClick={function(){context.onClickBankcard(record)}}>{text}</a>
      }
    }, {
      title: '入职日期',
      dataIndex: 'entrytime',
      key: 'entrytime',
      render: function (text, record) {
        return new Date(text).Format('yyyy-MM-dd');
      }
    }, {
      title: '离职日期',
      dataIndex: 'quittime',
      key: 'quittime',
      render: function (text, record) {
        if (text) {
          return new Date(text).Format('yyyy-MM-dd');
        } else {
          return null
        }

      }
    }];
  }
  getTableData() {
    return this.state.parttime;
  }
  handlePictureCancel() {
    console.log('handlePictureCancel');
    this.setState({
      showPicture: false,
      bigPicture: ""
    })
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
        <div style={{
          backgroundImage: this.state.bigPicture,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          visibility: this.state.showPicture ? "visible" : "hidden",
          position: 'absolute',
          backgroundColor: '#ccc',
          top: 0,
          height: '100%',
          width: '100%',
        }}>
          <Icon onClick={this.handlePictureCancel} style={{ position: 'absolute', right: '5px', top: '5px', fontSize: "20px" }} type="close-square" />
        </div>
      </div>
    );
  }
}

export default Parttime;