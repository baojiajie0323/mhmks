import React from 'react';
import { Table, Button, Icon, Modal, Input, Popconfirm, message, Tag, Select, DatePicker } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
import styles from './visitor.less';


class OfflineSum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigPicture: [],
      storeArea: Store.getStoreArea(),
      shelfaway: [],
      promotionImage: [],
      monthDate: moment(),
    };
    this.onStoreAreaChange = this.onStoreAreaChange.bind(this);
    this.onShelfawayChange = this.onShelfawayChange.bind(this);
    this.onPromotionImageChange = this.onPromotionImageChange.bind(this);
    this.onAreaChange = this.onAreaChange.bind(this);

    this.onMonthChange = this.onMonthChange.bind(this);
    this.onClickQuery = this.onClickQuery.bind(this);


    this.handleCloseBigphoto = this.handleCloseBigphoto.bind(this);
    this.onClickPhoto = this.onClickPhoto.bind(this);
    this.onClickPhotoLeft = this.onClickPhotoLeft.bind(this);
    this.onClickPhotoRight = this.onClickPhotoRight.bind(this);

    this.areaid = "";
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_STOREAREA, this.onStoreAreaChange);
    Store.addChangeListener(StoreEvent.SE_SHELFAWAYLIST, this.onShelfawayChange);
    Store.addChangeListener(StoreEvent.SE_PROMOTIONIMAGE, this.onPromotionImageChange);

    Action.getStoreArea();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_STOREAREA, this.onStoreAreaChange);
    Store.removeChangeListener(StoreEvent.SE_SHELFAWAYLIST, this.onShelfawayChange);
    Store.removeChangeListener(StoreEvent.SE_PROMOTIONIMAGE, this.onPromotionImageChange);
  }

  onStoreAreaChange() {
    this.setState({
      storeArea: Store.getStoreArea()
    })
  }

  onMonthChange(date, dateString) {
    this.setState({
      monthDate: date
    })
    console.log(date, dateString);
  }

  onShelfawayChange(shelfaway) {
    shelfaway.forEach((ps, index) => {
      ps.sortIndex = index;
    })
    shelfaway.sort((a, b) => {
      return a.user_id - b.user_id || a.sortIndex - b.sortIndex;
    })
    this.setState({
      shelfaway
    })

    // if (shelfaway.length > 0) {
    //   var data = {
    //     areaid: this.areaid,
    //     begindate: new Date(promotionSum[0].Date3).Format("yyyy-MM-dd"),
    //     enddate: new Date(promotionSum[0].Date4).Format("yyyy-MM-dd"),
    //   };
    //   console.log(data);
    //   Action.getPromotionImage(data);

    //   var adjustData = {
    //     pro_id: promotionSum[0].Pro_id
    //   }

    //   console.log(adjustData);
    //   Action.getPromotionAdjust(adjustData);
    // }
  }
  onPromotionImageChange(promotionImage) {
    this.setState({
      promotionImage
    })
  }
  onAreaChange(e) {
    this.areaid = e;
  }
  onClickQuery() {
    if (this.areaid == "") {
      message.info("请输入查询条件！");
      return;
    }
    var data = {
      areaid: this.areaid,
      year: this.state.monthDate.year(),
      month: this.state.monthDate.month() + 1,
    };
    console.log(data);
    Action.getShelfaway(data);
  }

  getAreaOption() {
    return this.state.storeArea.map((sa) => {
      return <Option value={sa.Region_id}>{sa.Region_name}</Option>
    })
  }

  getImageDom(store_id) {
    var context = this;
    var { shelfaway } = this.state;
    var imageList = [];
    for (let i = 0; i < shelfaway.length; i++) {
      if (shelfaway[i].store_id == store_id) {
        //let productInfo = this.getProduct(store_id, promotionImage[i].product_id);
        //if (productInfo) {
        imageList.push(shelfaway[i]);
        //}
      }
    }
    var imageDom = imageList.map(function (imageInfo, index) {
      let imagepath = 'url("' + '../upload/' + imageInfo.filename + '.jpg")';
      return (
        <div onClick={function () { context.onClickPhoto(store_id, index) }}
          style={{ backgroundImage: imagepath }}
          className={styles.photocontent} >
        </div>
      )
    });

    return <div style={{ width: '1000px' }} className={styles.photocontainer}>
      {imageDom}
    </div >
  }

  handleCloseBigphoto() {
    this.setState({
      bigPicture: []
    })
  }
  onClickPhoto(store_id, index) {
    var {shelfaway} = this.state;
    var imageDom = [];
    for (let i = 0; i < shelfaway.length; i++) {
      if (shelfaway[i].store_id == store_id) {
        imageDom.push(shelfaway[i]);
      }
    }

    this.setState({
      bigPicture: imageDom,
      bigIndex: index
    })
  }
  onClickPhotoLeft() {
    var bigphotoSize = this.state.bigPicture.length;
    var bigIndex = this.state.bigIndex;
    if (bigIndex == 0) {
      message.info("已经是第一张了");
      return;
    }
    bigIndex--;
    this.setState({ bigIndex });
  }
  onClickPhotoRight() {
    var bigphotoSize = this.state.bigPicture.length;
    var bigIndex = this.state.bigIndex;
    if (bigIndex == bigphotoSize - 1) {
      message.info("已经是最后一张了");
      return;
    }
    bigIndex++;
    this.setState({ bigIndex });
  }
  getTableColumn() {
    var context = this;
    return [{
      title: <p style={{ textAlign: 'center' }}>业务员</p>,
      dataIndex: 'realname',
      key: 'realname',
      width: 80,
    }, {
      title: <p style={{ textAlign: 'center' }}>门店名称</p>,
      dataIndex: 'Store_name',
      key: 'Store_name',
      width: 150,
    }, {
      title: <p style={{ textAlign: 'center' }}>照片</p>,
      dataIndex: 'photo',
      key: 'photo',
      render: function (text, record, index) {
        if (text) {
          return text;
        }
        return context.getImageDom(record.store_id);
      }
    }];
  }
  getTableData() {
    var { shelfaway } = this.state;
    var shelfaway_data = [];
    var isExist = function (ps) {
      for (var i = 0; i < shelfaway_data.length; i++) {
        if (shelfaway_data[i].user_id == ps.user_id &&
          shelfaway_data[i].store_id == ps.store_id) {
          return true;
        }
      }
      return false;
    }

    var lastps = null;
    shelfaway.forEach((ps) => {
      if (!isExist(ps)) {
        shelfaway_data.push(ps);
      }
    })
    return shelfaway_data;
  }
  render() {
    var scrolly = 350;
    var height = document.body.clientHeight;
    if (height > 0) {
      scrolly = height - 370;
    }
    return (
      <div className={styles.visitorcontent}>
        <p className={styles.visitortitle}>离架陈列统计</p>
        <div className={styles.queryContainer}>
          <Select onChange={this.onAreaChange} placeholder="请选择系统区域" style={{ width: 140, marginRight: '10px' }}>
            {this.getAreaOption()}
          </Select>
          <MonthPicker value={this.state.monthDate} onChange={this.onMonthChange} style={{ width: 120, marginRight: '20px' }} placeholder="Select month" />
          <Button icon="search" onClick={this.onClickQuery} type="primary">查询</Button>
        </div>
        <div className={styles.resultContent}>
          <div className={styles.signList}>
            <Table size="small" pagination={false} scroll={{ y: scrolly }}
              columns={this.getTableColumn()} dataSource={this.getTableData()} />
          </div>
        </div>
        {this.state.bigPicture.length <= 0 ? null :
          <div style={{ backgroundImage: `url("../upload/${this.state.bigPicture[this.state.bigIndex].filename}.jpg")` }} className={styles.bigphoto}>
            <div onClick={this.onClickPhotoLeft} className={styles.bigphoto_left}>
              <Icon type="left" />
            </div>
            <div onClick={this.onClickPhotoRight} className={styles.bigphoto_right}>
              <Icon type="right" />
            </div>
            <Icon onClick={this.handleCloseBigphoto} style={{ position: 'absolute', right: '5px', top: '5px', fontSize: "50px" }} type="close-square" />
          </div>
        }
      </div>
    );
  }
}

export default OfflineSum;