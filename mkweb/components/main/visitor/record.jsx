import React from 'react';
import { Table, Button, Icon, Modal, Input, Tree, Popconfirm, message, DatePicker, Breadcrumb } from 'antd';
import styles from './visitor.less';
const TreeNode = Tree.TreeNode;

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signList: Store.getSignList()
    };

    this.onSignListChange = this.onSignListChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onClickQuery = this.onClickQuery.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.refreshMarker = this.refreshMarker.bind(this);
    this.map = null;
    this.queryData = "";
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
        <p className={styles.visitortitle}>拜访</p>
        <div className={styles.queryContainer}>
          <Input onChange={this.onTextChange} style={{ width: '200px', marginRight: '20px' }} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="工号" />
          <DatePicker style={{ width: '200px', marginRight: '20px' }} onChange={this.onDateChange} />
          <Button icon="search" onClick={this.onClickQuery} type="primary">查询</Button>
        </div>
        <div className={styles.resultContent}>
        </div>
      </div>
    );
  }
}

export default Record;