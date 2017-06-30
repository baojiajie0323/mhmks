import React from 'react';
import { Table, Tabs, Button, Icon, Modal, Tag, Input, Tree, Popconfirm, message, DatePicker, Breadcrumb } from 'antd';
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
      visitorChat: Store.getVisitorChat(),
      visitorImage: Store.getVisitorImage(),
      visitorMainshelf: Store.getVisitorMainshelf(),
      visitorStock: Store.getVisitorStock(),
      visitorShelfaway: Store.getVisitorShelfaway(),
      pagination_plan: {},
      pagination_chat: {},
      pagination_mainshelf: {},
      pagination_stock: {},
      pagination_shelfaway: {},
    };

    this.display = {
      "5":"挂条",
      "6":"网片",
      "7":"陈列架",
    }

    this.onVisitorPlanChange = this.onVisitorPlanChange.bind(this);
    this.onVisitorChatChange = this.onVisitorChatChange.bind(this);
    this.onVisitorMainshelfChange = this.onVisitorMainshelfChange.bind(this);
    this.onVisitorStockChange = this.onVisitorStockChange.bind(this);
    this.onVisitorShelfawayChange = this.onVisitorShelfawayChange.bind(this);
    this.onVisitorImageChange = this.onVisitorImageChange.bind(this);

    this.onDateChange = this.onDateChange.bind(this);
    this.onClickQuery = this.onClickQuery.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.map = null;
    this.userid = "";

    this.queryData = [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")];

    this.onClickShowPicture = this.onClickShowPicture.bind(this);
    this.onClickReSign = this.onClickReSign.bind(this);
    this.onClickDelPlan = this.onClickDelPlan.bind(this);
    this.handlePictureCancel = this.handlePictureCancel.bind(this);
    this.onClickPhoto = this.onClickPhoto.bind(this);
    this.handleCloseBigphoto = this.handleCloseBigphoto.bind(this);
    this.handleCloseMap = this.handleCloseMap.bind(this);
    this.onClickSignin = this.onClickSignin.bind(this);
    this.onClickSignout = this.onClickSignout.bind(this);
    this.handleTablePlanChange = this.handleTablePlanChange.bind(this);
    this.handleTableChatChange = this.handleTableChatChange.bind(this);
    this.handleTableMainshelfChange = this.handleTableMainshelfChange.bind(this);
    this.handleTableStockChange = this.handleTableStockChange.bind(this);
    this.handleTableShelfawayChange = this.handleTableShelfawayChange.bind(this);
  }
  componentDidMount() {
    this.map = new BMap.Map("allmap");
    console.log(this.map.getDistance);
    var point = new BMap.Point(116.404, 39.915);
    this.map.centerAndZoom(point, 15);
    //this.map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    this.map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的
    this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    Store.addChangeListener(StoreEvent.SE_VISITOR_PLANLIST, this.onVisitorPlanChange);
    Store.addChangeListener(StoreEvent.SE_VISITOR_CHATLIST, this.onVisitorChatChange);
    Store.addChangeListener(StoreEvent.SE_VISITOR_MAINSHELFLIST, this.onVisitorMainshelfChange);
    Store.addChangeListener(StoreEvent.SE_VISITOR_STOCKLIST, this.onVisitorStockChange);
    Store.addChangeListener(StoreEvent.SE_VISITOR_SHELFAWAYLIST, this.onVisitorShelfawayChange);
    Store.addChangeListener(StoreEvent.SE_VISITOR_IMAGE, this.onVisitorImageChange);
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_VISITOR_PLANLIST, this.onVisitorPlanChange);
    Store.removeChangeListener(StoreEvent.SE_VISITOR_CHATLIST, this.onVisitorChatChange);
    Store.removeChangeListener(StoreEvent.SE_VISITOR_MAINSHELFLIST, this.onVisitorMainshelfChange);
    Store.removeChangeListener(StoreEvent.SE_VISITOR_STOCKLIST, this.onVisitorStockChange);
    Store.removeChangeListener(StoreEvent.SE_VISITOR_SHELFAWAYLIST, this.onVisitorShelfawayChange);
    Store.removeChangeListener(StoreEvent.SE_VISITOR_IMAGE, this.onVisitorImageChange);

  }
  handleTablePlanChange(pagination, filters, sorter) {
    const pager = this.state.pagination_plan;
    pager.current = pagination.current;
    this.setState({
      pagination_plan: pager,
    });
  }
  handleTableChatChange(pagination, filters, sorter) {
    const pager = this.state.pagination_chat;
    pager.current = pagination.current;
    this.setState({
      pagination_chat: pager,
    });
  }
  handleTableMainshelfChange(pagination, filters, sorter) {
    const pager = this.state.pagination_mainshelf;
    pager.current = pagination.current;
    this.setState({
      pagination_mainshelf: pager,
    });
  }
  handleTableStockChange(pagination, filters, sorter) {
    const pager = this.state.pagination_stock;
    pager.current = pagination.current;
    this.setState({
      pagination_stock: pager,
    });
  }
  handleTableShelfawayChange(pagination, filters, sorter) {
    const pager = this.state.pagination_shelfaway;
    pager.current = pagination.current;
    this.setState({
      pagination_shelfaway: pager,
    });
  }
  onVisitorPlanChange() {
    this.setState({
      visitorPlan: Store.getVisitorPlan(),
    })
  }
  onVisitorChatChange() {
    this.setState({
      visitorChat: Store.getVisitorChat(),
    })
  }
  onVisitorMainshelfChange() {
    this.setState({
      visitorMainshelf: Store.getVisitorMainshelf(),
    })
  }
  onVisitorStockChange() {
    this.setState({
      visitorStock: Store.getVisitorStock(),
    })
  }
  onVisitorShelfawayChange() {
    this.setState({
      visitorShelfaway: Store.getVisitorShelfaway(),
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
    Action.getVisitorChat(data);
    Action.getVisitorMainshelf(data);
    Action.getVisitorStock(data);
    Action.getVisitorShelfaway(data);
  }

  onDateChange(date, dateString) {
    this.queryData = dateString;
    console.log("onDateChange", date, dateString);
  }

  onTextChange(e) {
    this.userid = e.target.value;
  }
  onTabChange(key) {
    console.log(key);
    // if(key == 1){

    // }else if(key == 2){

    // }
  }

  onClickShowPicture(record, pictype) {
    this.setState({
      showPicure: true,
      pictype: pictype,
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
  onClickReSign(record) {
    console.log("onClickReSign", record);
    Action.reSign({
      userid: record.userid,
      store_id: record.store_id,
      year: record.year,
      month: record.month,
      day: record.day
    });
  }
  onClickDelPlan(record) {
    console.log("onClickDelPlan", record);
    Action.delPlan({
      userid: record.userid,
      store_id: record.store_id,
      year: record.year,
      month: record.month,
      day: record.day
    });
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
          title: '操作',
          key: 'picture',
          render: function (text, record) {
            var operateDom = [
              <a onClick={function () {
                context.onClickShowPicture(record, -1);
              } }>照片</a>,
              <span className="ant-divider" />,
              <Popconfirm title="确定要重签这条记录吗?" onConfirm={function () {
                context.onClickReSign(record);
              } } >
                <a>重签</a>
              </Popconfirm>
            ];
            if (record.plan_type == 2) {
              operateDom.push(<span className="ant-divider" />);
              operateDom.push(<Popconfirm title="确定要删除这条记录吗?" onConfirm={function () {
                context.onClickDelPlan(record);
              } } >
                <a>删除</a>
              </Popconfirm>);
            }
            return operateDom;
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
        var pathname = plan.path_name;
        if(plan.plan_type == 2){
          pathname = "临时拜访";
        }else if(plan.plan_type == 3){
          pathname = "电话拜访";
          signin_distance = 0;
          signout_distance = 0;
        }

        tableData.push({
          plan_date: new Date(plan.plan_date).Format("yyyy-MM-dd"),
          Store_name: plan.Store_name,
          plan_type: plan.plan_type,
          Path_name: pathname,
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
    return <Table size="small" columns={getTableColumn() } pagination={this.state.pagination_plan} dataSource={getTableData() } />
  }
  getMainshelfPanel() {
    var context = this;
    var getTableColumn = function () {
      return [{
        title: '拜访时间',
        dataIndex: 'plan_date',
        key: 'plan_date',
        width: 100,
      }, {
          title: '门店名称',
          dataIndex: 'Store_name',
          key: 'Store_name',
          width: 150,
        }, {
          title: '拜访人',
          dataIndex: 'realname',
          key: 'realname',
          width: 80,
        }, {
          title: '主货架信息',
          dataIndex: 'mainshelfinfo',
          key: 'mainshelfinfo',
          render: function (text, record) {
            return text.map((ms) => {
              return <Tag>{ms.product_name} * {ms.count}</Tag>
            });
          }
        }, {
          title: '操作',
          key: 'picture',
          width: 80,
          render: function (text, record) {
            var operateDom = [
              <a onClick={function () {
                context.onClickShowPicture(record, 0);
              } }>照片</a>]
            return operateDom;
          }
        }];
    }
    var getTableData = function () {
      var tableData = [];
      var lastDate = "", lastStore_name = "";
      var mainshelf = [];
      for (var i = 0; i < context.state.visitorMainshelf.length; i++) {
        var plan = context.state.visitorMainshelf[i];
        var plan_date = new Date(plan.plan_date).Format("yyyy-MM-dd");

        if (plan_date != lastDate || plan.Store_name != lastStore_name) {
          mainshelf = [];
          tableData.push({
            plan_date: plan_date,
            Store_name: plan.Store_name,
            realname: plan.realname,
            userid: plan.user_id,
            year: plan.year,
            month: plan.month,
            day: plan.day,
            store_id: plan.store_id,
            mainshelfinfo: mainshelf
          })
          lastDate = plan_date;
          lastStore_name = plan.Store_name;
        }
        mainshelf.push({
          product_name: plan.product_name,
          count: plan.count
        })
      }
      return tableData;
    }
    return <Table size="small" columns={getTableColumn() } pagination={this.state.pagination_mainshelf} dataSource={getTableData() } />
  }
  getStockPanel() {
    var context = this;
    var getTableColumn = function () {
      return [{
        title: '拜访时间',
        dataIndex: 'plan_date',
        key: 'plan_date',
        width: 100,
      }, {
          title: '门店名称',
          dataIndex: 'Store_name',
          key: 'Store_name',
          width: 150,
        }, {
          title: '拜访人',
          dataIndex: 'realname',
          key: 'realname',
          width: 80,
        }, {
          title: '库存信息（库存量/在途量）',
          dataIndex: 'stockinfo',
          key: 'stockinfo',
          render: function (text, record) {
            return text.map((ms) => {
              return <Tag>{ms.product_name} ({ms.count}/{ms.onway}) </Tag>
            });
          }
        }, {
          title: '操作',
          key: 'picture',
          width: 80,
          render: function (text, record) {
            var operateDom = [
              <a onClick={function () {
                context.onClickShowPicture(record, 2);
              } }>照片</a>]
            return operateDom;
          }
        }];
    }
    var getTableData = function () {
      var tableData = [];
      var lastDate = "", lastStore_name = "";
      var stock = [];
      for (var i = 0; i < context.state.visitorStock.length; i++) {
        var plan = context.state.visitorStock[i];
        var plan_date = new Date(plan.plan_date).Format("yyyy-MM-dd");

        if (plan_date != lastDate || plan.Store_name != lastStore_name) {
          stock = [];
          tableData.push({
            plan_date: plan_date,
            Store_name: plan.Store_name,
            realname: plan.realname,
            userid: plan.user_id,
            year: plan.year,
            month: plan.month,
            day: plan.day,
            store_id: plan.store_id,
            stockinfo: stock
          })
          lastDate = plan_date;
          lastStore_name = plan.Store_name;
        }
        stock.push({
          product_name: plan.product_name,
          count: plan.count,
          onway: plan.onway,
        })
      }
      return tableData;
    }
    return <Table size="small" columns={getTableColumn() } pagination={this.state.pagination_stock} dataSource={getTableData() } />
  }
  getShelfawayPanel() {
    var context = this;
    var getTableColumn = function () {
      return [{
        title: '拜访时间',
        dataIndex: 'plan_date',
        key: 'plan_date',
        width: 100,
      }, {
          title: '门店名称',
          dataIndex: 'Store_name',
          key: 'Store_name',
          width: 150,
        }, {
          title: '拜访人',
          dataIndex: 'realname',
          key: 'realname',
          width: 80,
        }, {
          title: '离架信息',
          dataIndex: 'shelfawayinfo',
          key: 'shelfawayinfo',
          render: function (text, record) {
            return text.map((ms) => {
              return <Tag>{ms.product_name} ({context.display[ms.display_id]}) </Tag>
            });
          }
        }, {
          title: '操作',
          key: 'picture',
          width: 80,
          render: function (text, record) {
            var operateDom = [
              <a onClick={function () {
                context.onClickShowPicture(record, 2);
              } }>照片</a>]
            return operateDom;
          }
        }];
    }
    var getTableData = function () {
      var tableData = [];
      var lastDate = "", lastStore_name = "";
      var shelfaway = [];
      for (var i = 0; i < context.state.visitorShelfaway.length; i++) {
        var plan = context.state.visitorShelfaway[i];
        var plan_date = new Date(plan.plan_date).Format("yyyy-MM-dd");

        if (plan_date != lastDate || plan.Store_name != lastStore_name) {
          shelfaway = [];
          tableData.push({
            plan_date: plan_date,
            Store_name: plan.Store_name,
            realname: plan.realname,
            userid: plan.user_id,
            year: plan.year,
            month: plan.month,
            day: plan.day,
            store_id: plan.store_id,
            shelfawayinfo: shelfaway
          })
          lastDate = plan_date;
          lastStore_name = plan.Store_name;
        }
        shelfaway.push({
          product_name: plan.product_name,
          display_id: plan.display_id
        })
      }
      return tableData;
    }
    return <Table size="small" columns={getTableColumn() } pagination={this.state.pagination_shelfaway} dataSource={getTableData() } />
  }
  getChatPanel() {
    var context = this;
    var getTableColumn = function () {
      return [{
        title: '拜访时间',
        dataIndex: 'plan_date',
        key: 'plan_date',
        width: 100,
      }, {
          title: '门店名称',
          dataIndex: 'Store_name',
          key: 'Store_name',
        }, {
          title: '拜访人',
          dataIndex: 'realname',
          key: 'realname',
          width: 80,
        }, {
          title: '对接人',
          dataIndex: 'storeuser',
          key: 'storeuser',
          width: 100,
        }, {
          title: '洽谈内容',
          dataIndex: 'chatcontent',
          key: 'chatcontent',
        }, {
          title: '洽谈结果',
          dataIndex: 'chatresult',
          key: 'chatresult',
        }];
    }
    var getTableData = function () {
      var tableData = [];
      for (var i = 0; i < context.state.visitorChat.length; i++) {
        var plan = context.state.visitorChat[i];
        tableData.push({
          plan_date: new Date(plan.plan_date).Format("yyyy-MM-dd"),
          Store_name: plan.Store_name,
          realname: plan.realname,
          storeuser: plan.storeuser,
          chatcontent: plan.chatcontent,
          chatresult: plan.chatresult,
        })
      }
      return tableData;
    }
    return <Table size="small" columns={getTableColumn() } pagination={this.state.pagination_chat} dataSource={getTableData() } />
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
          <Tabs tabPosition="left" size="small" onChange={this.onTabChange} >
            <TabPane tab="门店总览" key="1">{this.getBasicPanel() }</TabPane>
            <TabPane tab="洽谈记录" key="2">{this.getChatPanel() }</TabPane>
            <TabPane tab="主货架陈列" key="3">{this.getMainshelfPanel() }</TabPane>
            <TabPane tab="离架陈列" key="4">{this.getShelfawayPanel() }</TabPane>
            <TabPane tab="库存采集" key="5">{this.getStockPanel() }</TabPane>
          </Tabs>
        </div>
        <Modal title="查看照片" width={800} wrapClassName={styles.pictureModal} footer={null} visible={this.state.showPicure}
          onCancel={this.handlePictureCancel} >
          <div className={styles.modalcontent}>
            {this.state.pictype < 0 || this.state.pictype == 0 ? <p className={styles.pictureTitle}>主货架陈列</p> : null}
            {this.state.pictype < 0 || this.state.pictype == 0 ? this.getPhotoDom(0) : null}

            {this.state.pictype < 0 || this.state.pictype == 1 ? <p className={styles.pictureTitle}>离架陈列</p> : null}
            {this.state.pictype < 0 || this.state.pictype == 1 ? this.getPhotoDom(1) : null }

            {this.state.pictype < 0 || this.state.pictype == 2 ? <p className={styles.pictureTitle}>库存采集</p> : null}
            {this.state.pictype < 0 || this.state.pictype == 2 ? this.getPhotoDom(2) : null}
            {this.state.pictype < 0 || this.state.pictype == 3 ? <p className={styles.pictureTitle}>促销陈列</p> : null}
            {this.state.pictype < 0 || this.state.pictype == 4 ? this.getPhotoDom(3) : null}
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