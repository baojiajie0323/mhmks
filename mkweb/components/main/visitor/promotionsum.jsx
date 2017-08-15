import React from 'react';
import { Table, Button, Icon, Modal, Input, Popconfirm, message, Tag, Select } from 'antd';
import styles from './visitor.less';


function percentNum(num, num2) {
  if (num2 == 0) {
    return '0%';
  }
  return (Math.round(num / num2 * 10000) / 100.00 + "%"); //小数点后两位百分比
}

class PromotionSum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigPicture: [],
      storeArea: Store.getStoreArea(),
      promotionSum: Store.getPromotionSum(),
      promotionAdjust: Store.getPromotionAdjust(),
      promotionImage: []
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onStoreAreaChange = this.onStoreAreaChange.bind(this);
    this.onPromotionSumChange = this.onPromotionSumChange.bind(this);
    this.onPromotionAdjustChange = this.onPromotionAdjustChange.bind(this);
    this.onPromotionImageChange = this.onPromotionImageChange.bind(this);
    this.onAreaChange = this.onAreaChange.bind(this);
    this.onClickText = this.onClickText.bind(this);
    this.onModalvalueChange = this.onModalvalueChange.bind(this);

    this.onClickQuery = this.onClickQuery.bind(this);
    this.onTextChange = this.onTextChange.bind(this);


    this.handleCloseBigphoto = this.handleCloseBigphoto.bind(this);
    this.onClickPhoto = this.onClickPhoto.bind(this);
    this.onClickPhotoLeft = this.onClickPhotoLeft.bind(this);
    this.onClickPhotoRight = this.onClickPhotoRight.bind(this);

    this.noValue = " ";
    this.areaid = "";
    this.schedule = "";

    this._promotionSumTable = {
      ip_adjust: {
        name: 'IP调整量',
        key: '调整量：',
        selectmode: 'text',
      },
      hb_adjust: {
        name: '海报调整量',
        key: '调整量：',
        selectmode: 'text',
      }
    }
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_STOREAREA, this.onStoreAreaChange);
    Store.addChangeListener(StoreEvent.SE_PROMOTIONSUM, this.onPromotionSumChange);
    Store.addChangeListener(StoreEvent.SE_PROMOTIONADJUST, this.onPromotionAdjustChange);
    Store.addChangeListener(StoreEvent.SE_PROMOTIONIMAGE, this.onPromotionImageChange);

    Action.getStoreArea();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_STOREAREA, this.onStoreAreaChange);
    Store.removeChangeListener(StoreEvent.SE_PROMOTIONSUM, this.onPromotionSumChange);
    Store.removeChangeListener(StoreEvent.SE_PROMOTIONADJUST, this.onPromotionAdjustChange);
    Store.removeChangeListener(StoreEvent.SE_PROMOTIONIMAGE, this.onPromotionImageChange);
  }

  onStoreAreaChange() {
    this.setState({
      storeArea: Store.getStoreArea()
    })
  }
  onPromotionAdjustChange() {
    this.setState({
      promotionAdjust: Store.getPromotionAdjust(),
      visible: false,
    })
  }

  checkPromotion() {
    var promotionSum = Store.getPromotionSum();
    var pro_name = "";
    for (var i = 0; i < promotionSum.length; i++) {
      if (i == 0) {
        pro_name = promotionSum[i].Pro_name;
      } else {
        if (pro_name != promotionSum[i].Pro_name) {
          return false;
        }
      }
    }

    if (pro_name != "") {
      this.schedule = pro_name;
      this.refs.schedule.refs.input.value = pro_name;
    }

    return true;
  }

  getAllProduct() {
    var promotionSum = Store.getPromotionSum();
    var product_hb = [];
    var product_ip = [];
    for (var i = 0; i < promotionSum.length; i++) {
      var product = promotionSum[i];
      var product_name = product.product_name;
      if (product.Promotion_type == "002") { //海报促销
        if (product_hb.indexOf(product_name) < 0) {
          product_hb.push(product_name);
        }
      } else {
        if (product_ip.indexOf(product_name) < 0) {
          product_ip.push(product_name);
        }
      }
    }
    console.log("getAllProduct", product_hb, product_ip);
    return {
      product_hb,
      product_ip
    }
  }

  getProductDom() {
    var product = this.getAllProduct();
    var product_hb_dom = <div className={styles.productcontent} >
      <span style={{ width: '80px', display: 'inline-block' }}>{"海报产品(" + product.product_hb.length + ")"}</span>
      {product.product_hb.map((pro) => {
        return <Tag color="rgb(98, 132, 108)">{pro || "未知产品"}</Tag>
      })}
    </div>


    var product_ip_dom = <div className={styles.productcontent} >
      <span style={{ width: '80px', display: 'inline-block' }}>{"IP产品(" + product.product_ip.length + ")"}</span>
      {product.product_ip.map((pro) => {
        return <Tag color="rgb(98, 132, 108)">{pro || "未知产品"}</Tag>
      })}
    </div>
    return [
      product_hb_dom,
      product_ip_dom
    ]
  }

  onPromotionSumChange() {
    if (!this.checkPromotion()) {
      message.info("该条件有多个促销，请确认条件后重新查询");
      return;
    }
    var promotionSum = Store.getPromotionSum();
    promotionSum.forEach((ps, index) => {
      ps.sortIndex = index;
    })
    promotionSum.sort((a, b) => {
      return a.user_id - b.user_id || a.sortIndex - b.sortIndex;
    })
    this.setState({
      promotionSum
    })

    if (promotionSum.length > 0) {
      var data = {
        areaid: this.areaid,
        begindate: new Date(promotionSum[0].Date3).Format("yyyy-MM-dd"),
        enddate: new Date(promotionSum[0].Date4).Format("yyyy-MM-dd"),
      };
      console.log(data);
      Action.getPromotionImage(data);

      var adjustData = {
        pro_id: promotionSum[0].Pro_id
      }

      console.log(adjustData);
      Action.getPromotionAdjust(adjustData);
    }
  }
  onPromotionImageChange(promotionImage) {
    this.setState({
      promotionImage
    })
  }
  onAreaChange(e) {
    this.areaid = e;
  }
  onModalvalueChange(e) {
    this.setState({
      modalvalue: e.target.value
    })
  }

  onClickQuery() {
    if (this.areaid == "" || this.schedule == "") {
      message.info("请输入查询条件！");
      return;
    }
    var data = {
      areaid: this.areaid,
      schedule: this.schedule,
    };
    console.log(data);
    Action.getPromotionSum(data);

  }

  onTextChange(e) {
    this.schedule = e.target.value;
  }

  getAreaOption() {
    return this.state.storeArea.map((sa) => {
      return <Option value={sa.Region_id}>{sa.Region_name}</Option>
    })
  }

  getproductCount(store_id, hb) {
    var promotionSum = this.state.promotionSum;
    var productCount = 0;
    for (var i = 0; i < promotionSum.length; i++) {
      if (promotionSum[i].Store_id == store_id &&
        ((hb && promotionSum[i].Promotion_type == "002") ||
          (!hb && promotionSum[i].Promotion_type != "002"))) {
        productCount++;
      }
    }
    return productCount;
  }

  getproductCountAll(user_id, hb) {
    var promotionSum = this.state.promotionSum;
    var productCount = 0;
    for (var i = 0; i < promotionSum.length; i++) {
      if (promotionSum[i].user_id == user_id &&
        ((hb && promotionSum[i].Promotion_type == "002") ||
          (!hb && promotionSum[i].Promotion_type != "002"))) {
        productCount++;
      }
    }
    return productCount;
  }

  getProduct(store_id, product_id) {
    var promotionSum = this.state.promotionSum;
    var productCount = 0;
    for (var i = 0; i < promotionSum.length; i++) {
      if (promotionSum[i].Store_id == store_id &&
        promotionSum[i].Product_id == product_id) {
        return promotionSum[i];
      }
    }
  }

  getStoreByUserId(user_id) {
    var promotionSum = this.state.promotionSum;
    var storelist = [];
    for (var i = 0; i < promotionSum.length; i++) {
      if (promotionSum[i].user_id == user_id) {
        storelist.push(promotionSum[i].Store_id);
      }
    }
    return storelist;
  }

  getAdjustCount(store_id, hb) {
    var promotionAdjust = this.state.promotionAdjust;
    for (var i = 0; i < promotionAdjust.length; i++) {
      if (promotionAdjust[i].store_id == store_id) {
        if (hb) {
          return promotionAdjust[i].hb_adjust;
        } else {
          return promotionAdjust[i].ip_adjust;
        }
      }
    }
  }

  getAdjustCountAll(user_id, hb) {
    var promotionAdjust = this.state.promotionAdjust;
    var storelist = this.getStoreByUserId(user_id);
    var hb_adjust = 0;
    var ip_adjust = 0;
    for (var i = 0; i < promotionAdjust.length; i++) {
      if (storelist.indexOf(promotionAdjust[i].store_id) >= 0) {
        if (hb) {
          hb_adjust += parseInt(promotionAdjust[i].hb_adjust);
          //return promotionAdjust[i].hb_adjust;
        } else {
          ip_adjust += parseInt(promotionAdjust[i].ip_adjust);
          //return promotionAdjust[i].ip_adjust;
        }
      }
    }
    if (hb) {
      return hb_adjust;
    } else {
      return ip_adjust;
    }
  }

  getImageCount(store_id, hb) {
    var promotionImage = this.state.promotionImage;
    var productCount = 0;
    for (var i = 0; i < promotionImage.length; i++) {
      if (promotionImage[i].store_id == store_id) {
        var productInfo = this.getProduct(store_id, promotionImage[i].product_id);
        if (productInfo &&
          ((hb && productInfo.Promotion_type == "002") ||
            (!hb && productInfo.Promotion_type != "002"))) {
          productCount++;
        }
      }
    }
    return productCount;
  }

  getImageCountAll(user_id, hb) {
    var promotionImage = this.state.promotionImage;
    var storelist = this.getStoreByUserId(user_id);
    var productCount = 0;
    for (var i = 0; i < promotionImage.length; i++) {
      if (storelist.indexOf(promotionImage[i].store_id) >= 0) {
        var productInfo = this.getProduct(promotionImage[i].store_id, promotionImage[i].product_id);
        if (productInfo &&
          ((hb && productInfo.Promotion_type == "002") ||
            (!hb && productInfo.Promotion_type != "002"))) {
          productCount++;
        }
      }
    }
    return productCount;
  }

  getImageDom(store_id) {
    var context = this;
    var promotionImage = this.state.promotionImage;
    var imageList = [];
    for (let i = 0; i < promotionImage.length; i++) {
      if (promotionImage[i].store_id == store_id) {
        let productInfo = this.getProduct(store_id, promotionImage[i].product_id);
        if (productInfo) {
          imageList.push(promotionImage[i]);
        }
      }
    }
    var imageDom = imageList.map(function (imageInfo, index) {
      let imagepath = 'url("' + '../upload/' + imageInfo.filename + '.jpg")';
      return (
        <div onClick={function () { context.onClickPhoto(store_id, index) }}
          style={{ backgroundImage: imagepath }}
          className={styles.photocontent} >
          <div title={imageInfo.product_name}>{imageInfo.product_name}</div>
        </div>
      )
    });

    return <div className={styles.photocontainer}>
      {imageDom}
    </div >
  }

  onClickText(text, record, cate) {
    this._cate = cate;
    this._record = record;
    this.setState({
      visible: true,
      modaltitle: this._promotionSumTable[cate].name,
      modalkey: this._promotionSumTable[cate].key,
      modalvalue: text.toString(),
    })
  }
  handleOk() {
    var data = {
      pro_id: this._record.Pro_id,
      store_id: this._record.Store_id,
      key: this._cate,
      value: parseInt(this.state.modalvalue),
    }
    console.log("updatePromotionAdjust", data);
    Action.updatePromotionAdjust(data);
  }
  handleCancel() {
    this.setState({ visible: false })
  }
  handleCloseBigphoto() {
    this.setState({
      bigPicture: []
    })
  }
  onClickPhoto(store_id, index) {
    var promotionImage = this.state.promotionImage;
    var imageDom = [];
    for (let i = 0; i < promotionImage.length; i++) {
      if (promotionImage[i].store_id == store_id) {
        imageDom.push(promotionImage[i]);
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
      fixed: 'left'
    }, {
      title: <p style={{ textAlign: 'center' }}>门店名称</p>,
      dataIndex: 'store_name',
      key: 'store_name',
      width: 150,
    }, {
      title: <p style={{ textAlign: 'center' }}>海报产品</p>,
      dataIndex: 'hb_count',
      key: 'hb_count',
      width: 50,
    }, {
      title: <p style={{ textAlign: 'center' }}>IP产品</p>,
      dataIndex: 'ip_count',
      key: 'ip_count',
      width: 50
    }, {
      title: <p style={{ textAlign: 'center' }}>照片</p>,
      dataIndex: 'photo',
      key: 'photo',
      width: 600,
      render: function (text, record, index) {
        if (text) {
          return text;
        }
        return context.getImageDom(record.Store_id);
      }
    }, {
      title: <p style={{ textAlign: 'center' }}>海报陈列</p>,
      dataIndex: 'hb_image',
      key: 'hb_image',
      width: 50
    }, {
      title: <p style={{ textAlign: 'center' }}>IP陈列</p>,
      dataIndex: 'ip_image',
      key: 'ip_image',
      width: 50
    }, {
      title: <p style={{ textAlign: 'center' }}>海报调整</p>,
      dataIndex: 'hb_adjust',
      key: 'hb_adjust',
      width: 50,
      render: function (text, record) {
        if (!text) {
          text = context.noValue;
        }
        return <p style={{ whiteSpace: 'pre-wrap', textAlign: "center", color: "rgb(16,142,233)", cursor: 'pointer' }}
          onClick={function () { context.onClickText(text, record, 'hb_adjust') }} >{text}</p>
      }
    }, {
      title: <p style={{ textAlign: 'center' }}>IP调整</p>,
      dataIndex: 'ip_adjust',
      key: 'ip_adjust',
      width: 50,
      render: function (text, record) {
        if (!text) {
          text = context.noValue;
        }
        return <p style={{ whiteSpace: 'pre-wrap', textAlign: "center", color: "rgb(16,142,233)", cursor: 'pointer' }}
          onClick={function () { context.onClickText(text, record, 'ip_adjust') }} >{text}</p>
      }
    }, {
      title: <p style={{ textAlign: 'center' }}>海报陈列率</p>,
      key: 'hb_percent',
      width: 60,
      render: function (text, record) {
        var hbcount = record.hb_adjust;
        if (!hbcount) {
          hbcount = record.hb_image;
        }
        return percentNum(hbcount, record.hb_count);
      }
    }, {
      title: <p style={{ textAlign: 'center' }}>IP陈列率</p>,
      key: 'ip_percent',
      width: 60,
      render: function (text, record) {
        var ipcount = record.ip_adjust;
        if (!ipcount) {
          ipcount = record.ip_image;
        }
        return percentNum(ipcount, record.ip_count);
      }
    }, {
      title: <p style={{ textAlign: 'center' }}>合计陈列率</p>,
      key: 'all_percent',
      width: 60,
      render: function (text, record) {
        var ipcount = record.ip_adjust;
        if (!ipcount) {
          ipcount = record.ip_image;
        }
        var hbcount = record.hb_adjust;
        if (!hbcount) {
          hbcount = record.hb_image;
        }
        return percentNum(parseInt(ipcount) + parseInt(hbcount), parseInt(record.ip_count) + parseInt(record.hb_count));
      }
    }];
  }
  getTableData() {
    var context = this;

    var promotionSum = this.state.promotionSum;
    var promotionSum_data = [];
    var isExist = function (ps) {
      for (var i = 0; i < promotionSum_data.length; i++) {
        if (promotionSum_data[i].user_id == ps.user_id &&
          promotionSum_data[i].Store_id == ps.Store_id) {
          return true;
        }
      }
      return false;
    }

    var lastps = null;
    promotionSum.forEach((ps) => {
      if (!isExist(ps)) {
        ps.hb_image = context.getImageCount(ps.Store_id, true);
        ps.ip_image = context.getImageCount(ps.Store_id, false);
        ps.hb_adjust = context.getAdjustCount(ps.Store_id, true);
        ps.ip_adjust = context.getAdjustCount(ps.Store_id, false);
        ps.hb_count = context.getproductCount(ps.Store_id, true);
        ps.ip_count = context.getproductCount(ps.Store_id, false);

        if (lastps && lastps.user_id != ps.user_id) {
          //换了一个业务员，此时需要添加上一个业务员的统计数据
          var data = {
            mark: 1,
            photo: "小计",
            user_id: lastps.user_id,
            realname: lastps.realname,
            store_name: lastps.store_name,
            Store_id: lastps.Store_id,
            hb_count: context.getproductCountAll(lastps.user_id, true),
            ip_count: context.getproductCountAll(lastps.user_id, false),
            hb_adjust: context.getAdjustCountAll(lastps.user_id, true),
            ip_adjust: context.getAdjustCountAll(lastps.user_id, false),
            hb_image: context.getImageCountAll(lastps.user_id, true),
            ip_image: context.getImageCountAll(lastps.user_id, false),
          }
          promotionSum_data.push(data);
        }
        promotionSum_data.push(ps);
        lastps = ps;
      }
    })

    return promotionSum_data;
  }
  rowClassName(record, index) {
    var style = [styles.table_row];
    if (record.mark == 1) {
      style.push(styles.path_cell);
    }
    return style.join(' ');
  }
  render() {
    var scrolly = 350;
    var height = document.body.clientHeight;
    if (height > 0) {
      scrolly = height - 370;
    }
    return (
      <div className={styles.visitorcontent}>
        <p className={styles.visitortitle}>促销陈列统计</p>
        <div className={styles.queryContainer}>
          <Select onChange={this.onAreaChange} placeholder="请选择系统区域" style={{ width: 140, marginRight: '10px' }}>
            {this.getAreaOption()}
          </Select>
          <Input ref="schedule" onChange={this.onTextChange} style={{ width: '140px', marginRight: '20px' }} prefix={<Icon type="calendar" style={{ fontSize: 13 }} />} placeholder="请输入档期" />
          <Button icon="search" onClick={this.onClickQuery} type="primary">查询</Button>
        </div>
        <div className={styles.promotionresult}>
          {this.getProductDom()}
        </div>
        <div className={styles.promotiontable}>
          <div className={styles.signList}>
            <Table size="small" pagination={false} scroll={{ y: scrolly, x: 1350 }}
              rowClassName={this.rowClassName}
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
        <Modal width={350} title={this.state.modaltitle} visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>{this.state.modalkey}</span>
            <div className={styles.form}>
              <Input value={this.state.modalvalue} onChange={this.onModalvalueChange} placeholder="请输入" />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default PromotionSum;