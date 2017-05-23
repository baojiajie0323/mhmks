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
      showMap: false,
      visitorPlan: Store.getVisitorPlan(),
      visitorImage: Store.getVisitorImage(),
      pagination: {}
    };

    this.onVisitorPlanChange = this.onVisitorPlanChange.bind(this);
    this.onVisitorImageChange = this.onVisitorImageChange.bind(this);

    this.onDateChange = this.onDateChange.bind(this);
    this.onClickQuery = this.onClickQuery.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.map = null;
    this.userid = "";

    this.queryData = [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")];

    this.onClickShowPicture = this.onClickShowPicture.bind(this);
    this.handlePictureCancel = this.handlePictureCancel.bind(this);
    this.onClickPhoto = this.onClickPhoto.bind(this);
    this.handleCloseBigphoto = this.handleCloseBigphoto.bind(this);
    this.handleCloseMap = this.handleCloseMap.bind(this);
    this.onClickSignin = this.onClickSignin.bind(this);
    this.onClickSignout = this.onClickSignout.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }
  componentDidMount() {
    this.map = new BMap.Map("allmap");
    var point = new BMap.Point(116.404, 39.915);
    this.map.centerAndZoom(point, 15);
    //this.map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    this.map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的
    this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    Store.addChangeListener(StoreEvent.SE_VISITOR_PLANLIST, this.onVisitorPlanChange);
    Store.addChangeListener(StoreEvent.SE_VISITOR_IMAGE, this.onVisitorImageChange);
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_VISITOR_PLANLIST, this.onVisitorPlanChange);
    Store.removeChangeListener(StoreEvent.SE_VISITOR_IMAGE, this.onVisitorImageChange);

  }
  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
  }
  onVisitorPlanChange() {
    this.setState({
      visitorPlan: Store.getVisitorPlan(),
    })
  }
  onVisitorImageChange() {
    this.setState({
      visitorImage: Store.getVisitorImage(),
    })
  }

  onClickQuery() {
    var data = {
      userid: this.userid == "" ? "0" : this.userid,
      begindate: this.queryData[0],
      enddate: this.queryData[1],
    };
    console.log(data);
    Action.getVisitorPlan(data);
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
      showPicure: true,
      visitorImage: []
    })
    Action.getVisitorImage({
      userid: record.userid,
      year: record.year,
      month: record.month,
      day: record.day,
      store_id: record.store_id,
    })
  }
  handlePictureCancel() {
    this.setState({
      showPicure: false,
      bigPicture: ""
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
  handleCloseMap() {
    this.setState({
      showMap: false,
    })
  }
  onClickSignin(record) {
    this.setState({
      showMap: true,
    })
    this.initSignMap({ x: record.gps_x, y: record.gps_y }, { x: record.signin_gps_x, y: record.signin_gps_y });

  }
  onClickSignout(record) {
    this.setState({
      showMap: true,
    })

    this.initSignMap({ x: record.gps_x, y: record.gps_y }, { x: record.signout_gps_x, y: record.signout_gps_y });
  }

  initSignMap(storeGps, signGps) {
    var storePoint = new BMap.Point(storeGps.x, storeGps.y);
    var point = new BMap.Point(signGps.x, signGps.y);
    this.map.centerAndZoom(point, 17);
    this.map.clearOverlays();
    var marker = new BMap.Marker(point);  // 创建标注
    var storeMarker = new BMap.Marker(storePoint);
    this.map.addOverlay(marker);               // 将标注添加到地图中
    this.map.addOverlay(storeMarker);

    var polyline = new BMap.Polyline([storePoint, point], { strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5 });  //定义折线
    this.map.addOverlay(polyline);     //添加折线到地图上

    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
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

  getBasicPanel() {
    var context = this;
    var getTableColumn = function () {
      return [{
        title: '拜访时间',
        dataIndex: 'plan_date',
        key: 'plan_date',
      }, {
          title: '门店名称',
          dataIndex: 'Store_name',
          key: 'Store_name',
        }, {
          title: '拜访人',
          dataIndex: 'realname',
          key: 'realname',
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
            if (text == "") {
              return null
            }
            return <a onClick={function () { context.onClickSignin(record) } }>{text}<Icon type="environment-o" /></a>
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
            if (text == "") {
              return null
            }
            return <a onClick={function () { context.onClickSignout(record) } }>{text}<Icon type="environment-o" /></a>
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
      var tableData = [];
      for (var i = 0; i < context.state.visitorPlan.length; i++) {
        var plan = context.state.visitorPlan[i];
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

        tableData.push({
          plan_date: new Date(plan.plan_date).Format("yyyy-MM-dd"),
          Store_name: plan.Store_name,
          Path_name: plan.path_name == null ? "临时拜访" : plan.path_name,
          signin_time: plan.signin_time == null ? "未签到" : plan.signin_time,
          signin_distance: signin_distance < 0 ? "" : (signin_distance + "米"),
          signout_time: plan.signout_time == null ? "未签退" : plan.signout_time,
          signout_distance: signout_distance < 0 ? "" : (signout_distance + "米"),
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

      return tableData;
    }
    return <Table size="small" columns={getTableColumn() } pagination={this.state.pagination}  dataSource={getTableData() } />
  }
  render() {
    var context = this;
    return (
      <div className={styles.visitorcontent}>
        <p className={styles.visitortitle}>拜访</p>
        <div className={styles.queryContainer}>
          <Input onChange={this.onTextChange} style={{ width: '100px', marginRight: '20px' }} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="工号/姓名" />
          <RangePicker defaultValue={[moment(), moment()]} style={{ marginRight: '20px' }} onChange={this.onDateChange} />
          <Button icon="search" onClick={this.onClickQuery} type="primary">查询</Button>
        </div>
        <div className={styles.resultContent}>
          <Tabs tabPosition="left" size="small" >
            <TabPane tab="门店总览" key="1">{this.getBasicPanel() }</TabPane>
            <TabPane tab="主货架陈列" key="2">主货架陈列</TabPane>
            <TabPane tab="离架陈列" key="3">离架陈列</TabPane>
            <TabPane tab="库存采集" key="4">库存采集</TabPane>
            <TabPane tab="促销陈列" key="5">促销陈列</TabPane>
          </Tabs>
        </div>
        <Modal title="查看照片" width={800} wrapClassName={styles.pictureModal} footer={null} visible={this.state.showPicure}
          onCancel={this.handlePictureCancel} >
          <div className={styles.modalcontent}>
            <p className={styles.pictureTitle}>主货架陈列</p>
            {this.getPhotoDom(0) }
            <p className={styles.pictureTitle}>离架陈列</p>
            {this.getPhotoDom(1) }
            <p className={styles.pictureTitle}>库存采集</p>
            {this.getPhotoDom(2) }
            <p className={styles.pictureTitle}>促销陈列</p>
            {this.getPhotoDom(3) }
            {this.state.bigPicture == "" ? null :
              <div style={{ backgroundImage: this.state.bigPicture }} className={styles.bigphoto}>
                <Icon onClick={this.handleCloseBigphoto} style={{ position: 'absolute', right: '5px', top: '5px', fontSize: "20px" }} type="close-square" />
              </div>
            }
          </div>
        </Modal>
        <div style={{ visibility: this.state.showMap ? 'visible' : 'hidden' }} className={styles.mapModal}>
          <p className={styles.maptitle}>定位点</p>
          <Icon onClick={this.handleCloseMap} style={{ position: 'absolute', right: '5px', top: '5px', fontSize: "24px", cursor: 'pointer' }} type="close-square" />
          <div id="allmap" className={styles.allmap}>
          </div>
        </div>
      </div>
    );
  }
}

export default Record;