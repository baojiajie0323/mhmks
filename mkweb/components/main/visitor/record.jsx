import React from 'react';
import { Table, Tabs, Button, Icon, Modal, Input, Tree, Popconfirm, message, DatePicker, Breadcrumb } from 'antd';
import styles from './visitor.less';
const TreeNode = Tree.TreeNode;
const { MonthPicker, RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;


class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicture: false,
      bigPicture: "",
      signList: Store.getSignList()
    };

    this.onSignListChange = this.onSignListChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onClickQuery = this.onClickQuery.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.refreshMarker = this.refreshMarker.bind(this);
    this.map = null;
    this.queryData = "";

    this.onClickShowPicture = this.onClickShowPicture.bind(this);
    this.handlePictureCancel = this.handlePictureCancel.bind(this);
    this.onClickPhoto = this.onClickPhoto.bind(this);
    this.handleCloseBigphoto = this.handleCloseBigphoto.bind(this);
  }
  componentDidMount() {
    // this.map = new BMap.Map("signmap");
    // var point = new BMap.Point(116.404, 39.915);
    // this.map.centerAndZoom(point, 15);
    // this.map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    // this.map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的
    // this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    Store.addChangeListener(StoreEvent.SE_SIGNLIST, this.onSignListChange);
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_SIGNLIST, this.onSignListChange);

  }
  onSignListChange() {
    var context = this;
    this.setState({
      signList: Store.getSignList()
    }, function () {
      context.refreshMarker();
    })
  }

  onClickQuery() {
    var data = {
      signtime: this.queryData,
      userid: this.userid
    };
    console.log(data);
    Action.getSignList(data);
  }

  refreshMarker() {
    if (this.map) {
      var context = this;
      this.map.clearOverlays();
      var addMarker = function (point) {
        var marker = new BMap.Marker(point);
        context.map.addOverlay(marker);
      }


      for (var i = 0; i < this.state.signList.length; i++) {
        var signInfo = this.state.signList[i];
        var point = new BMap.Point(signInfo.gps_x, signInfo.gps_y);
        addMarker(point);
        this.map.centerAndZoom(point, 15);
      }
    }
  }

  onDateChange(date, dateString) {
    this.queryData = dateString;
    console.log("onDateChange", date, dateString);
  }

  onTextChange(e) {
    this.userid = e.target.value;
  }

  onClickShowPicture(record) {
    this.setState({
      showPicure: true
    })
  }
  handlePictureCancel() {
    this.setState({
      showPicure: false
    })
  }

  onClickPhoto(src) {
    this.setState({
      bigPicture: src
    })
  }
  handleCloseBigphoto() {
    this.setState({
      bigPicture: ""
    })
  }

  getBasicPanel() {
    var context = this;
    var getTableColumn = function () {
      return [{
        title: '拜访时间',
        dataIndex: 'plandate',
        key: 'plandate',
      }, {
          title: '门店名称',
          dataIndex: 'Store_name',
          key: 'Store_name',
        }, {
          title: '拜访路线',
          dataIndex: 'Path_name',
          key: 'Path_name',
        }, {
          title: '签到时间',
          dataIndex: 'signin_time',
          key: 'signin_time',
        }, {
          title: '签到偏差',
          dataIndex: 'signin_distance',
          key: 'signin_distance',
          render: function (text, record) {
            return <a>{text}<Icon type="environment-o" /></a>
          }
        }, {
          title: '签退时间',
          dataIndex: 'signout_time',
          key: 'signout_time',
        }, {
          title: '签退偏差',
          dataIndex: 'signout_distance',
          key: 'signout_distance',
          render: function (text, record) {
            return <a>{text}<Icon type="environment-o" /></a>
          }
        }, {
          title: '现场照片',
          key: 'picture',
          render: function (text, record) {
            return <a onClick={function () {
              context.onClickShowPicture(record);
            } }>查看</a>
          }
        }];
    }
    var getTableData = function () {
      var testlist = [];
      for (var i = 0; i < 50; i++) {
        testlist.push({
          plandate: '2017-4-26',
          Store_name: '大润发松江店',
          Path_name: '上海14',
          signin_time: '2017-04-26 10:30:24',
          signin_distance: '1203米',
          signout_time: '2017-04-26 11:33:41',
          signout_distance: '522米',
        })
      }

      return testlist;
    }
    return <Table size="small" columns={getTableColumn() } dataSource={getTableData() } />
  }
  render() {
    var context = this;
    return (
      <div className={styles.visitorcontent}>
        <p className={styles.visitortitle}>拜访</p>
        <div className={styles.queryContainer}>
          <Input onChange={this.onTextChange} style={{ width: '100px', marginRight: '20px' }} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="工号/姓名" />
          <RangePicker style={{ marginRight: '20px' }} onChange={this.onDateChange} />
          <Button icon="search" onClick={this.onClickQuery} type="primary">查询</Button>
        </div>
        <div className={styles.resultContent}>
          <Tabs tabPosition="left" size="small" >
            <TabPane tab="门店总览" key="1">{this.getBasicPanel() }</TabPane>
            <TabPane tab="主货架陈列" key="2">Content of Tab 2</TabPane>
            <TabPane tab="离架陈列" key="3">Content of Tab 3</TabPane>
            <TabPane tab="库存采集" key="4">Content of Tab 3</TabPane>
            <TabPane tab="促销陈列" key="5">Content of Tab 3</TabPane>
          </Tabs>
        </div>
        <Modal title="大润发松江店" width={800} wrapClassName={styles.pictureModal} footer={null} visible={this.state.showPicure}
          onCancel={this.handlePictureCancel} >
          <div className={styles.modalcontent}>
            <p className={styles.pictureTitle}>主货架陈列</p>
            <div onClick={function () { context.onClickPhoto("11") } } className={styles.photo}></div>
            <div className={styles.photo}></div>
            <div className={styles.photo}></div>
            <div className={styles.photo}></div>
            <div className={styles.photo}></div>
            <div className={styles.photo}></div>
            <div className={styles.photo}></div>
            <div className={styles.photo}></div>
            <div className={styles.photo}></div>
            <div className={styles.photo}></div>
            <div className={styles.photo}></div>
            <div className={styles.photo}></div>
            <div className={styles.photo}></div>
            <p className={styles.pictureTitle}>离架陈列</p>
            <p className={styles.pictureTitle}>库存采集</p>
            <p className={styles.pictureTitle}>促销陈列</p>
            {this.state.bigPicture == "" ? null :
              <div className={styles.bigphoto}>
                <Icon onClick={this.handleCloseBigphoto} style={{ position: 'absolute', right: '5px', top: '5px',fontSize:"20px" }} type="close-square" />
              </div>
            }
          </div>
        </Modal>
      </div>
    );
  }
}

export default Record;