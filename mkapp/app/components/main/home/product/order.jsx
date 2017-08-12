import React from 'react';
import styles from '../home.less';


import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { message, Modal, Card, Avatar, Spin } from 'antd';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import domtoimage from 'dom-to-image';

import config from '../../../config';
const confirm = Modal.confirm;

import { cyan800, cyan100, cyan600 } from 'material-ui/styles/colors';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: Store.getProduct(this.props.userdata.store_id),
      promotion: Store.getPromotionByStore(this.props.userdata.store_id),
      preSaveProduct: [],
      safeStock: [],
      saleActual: [],
      loading: true,
    };
    this.onClickBack = this.onClickBack.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onStockChange = this.onStockChange.bind(this);
    this.onSafeStockChange = this.onSafeStockChange.bind(this);
    this.onPromotionChange = this.onPromotionChange.bind(this);
    this.onSaleActualChange = this.onSaleActualChange.bind(this);
  }

  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_STOCK, this.onStockChange);
    Store.addChangeListener(StoreEvent.SE_SAFESTOCK, this.onSafeStockChange);
    Store.addChangeListener(StoreEvent.SE_PROMOTION, this.onPromotionChange);
    Store.addChangeListener(StoreEvent.SE_SALEACTUAL, this.onSaleActualChange);

    this.checkProductList();

    var curDate = Store.getCurDate();
    Action.getStock({
      year: curDate.getFullYear(),
      month: curDate.getMonth() + 1,
      day: curDate.getDate(),
      userid: localStorage.username,
      store_id: this.props.userdata.store_id,
    });

    if (this.state.promotion.length == 0) {
      Action.getPromotionbyStore({
        store_id: this.props.userdata.store_id,
      })
    }

    var preDate = new Date(curDate);
    var preDate = new Date(preDate.setMonth(preDate.getMonth() - 1));
    Action.getSaleActual({
      year: preDate.getFullYear(),
      month: preDate.getMonth() + 1,
      store_id: this.props.userdata.store_id,
    })


    Action.getSafeStock({
      date: curDate.Format("yyyyMM"),
      store_id: this.props.userdata.store_id,
    })
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_STOCK, this.onStockChange);
    Store.removeChangeListener(StoreEvent.SE_SAFESTOCK, this.onSafeStockChange);
    Store.removeChangeListener(StoreEvent.SE_PROMOTION, this.onPromotionChange);
    Store.removeChangeListener(StoreEvent.SE_SALEACTUAL, this.onSaleActualChange);
  }

  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, 'doplanview');
  }
  checkProductList() {
    if (this.state.product.length <= 0) {
      var store = this.props.userdata;
      Action.getProductbyStore({
        store_id: store.store_id
      });
    }
  }
  onStockChange(preSaveProduct) {
    this.setState({
      preSaveProduct
    })

    console.log('onStockChange', preSaveProduct);
  }
  onSafeStockChange(safeStock) {
    this.setState({
      safeStock,
    })
  }
  onPromotionChange() {
    this.setState({ promotion: Store.getPromotionByStore(this.props.userdata.store_id) })
  }


  onClickSave() {
    // var node = document.getElementById('ordercontainer');

    // domtoimage.toPng(node)
    //   .then(function (dataUrl) {
    //     //console.log(canvas);
    //     window.Base64ImageSaverPlugin.saveImageDataToLibrary(
    //       function (msg) {
    //         message.success("保存成功");
    //         console.log(msg);
    //       },
    //       function (err) {
    //         message.error(msg);
    //         console.log(err);
    //       },
    //       dataUrl
    //     );
    //   })
    //   .catch(function (error) {
    //     console.error('oops, something went wrong!', error);
    //   });
    var w = document.getElementById("ordercontainer").clientWidth;
    var h = document.getElementById("ordercontainer").clientHeight + 60;

    //要将 canvas 的宽高设置成容器宽高的 2 倍
    var canvas = document.createElement("canvas");

    var scale = 2;
    canvas.width = w * scale;
    canvas.height = h * scale;
    canvas.getContext("2d").scale(scale, scale); //获取context,设置scale

    html2canvas(document.getElementById("ordercontainer"), {
      scale: scale, // 添加的scale 参数
      canvas: canvas,
      height: h,
      width: w,
      onrendered: function (canvas) {
        console.log(canvas);
        window.Base64ImageSaverPlugin.saveImageDataToLibrary(
          function (msg) {
            message.success("保存成功");
            console.log(msg);
          },
          function (err) {
            message.error(msg);
            console.log(err);
          },
          canvas.toDataURL()
        );
      }
    });
  }

  getsafeInfo(product_id) {
    for (var i = 0; i < this.state.safeStock.length; i++) {
      if (this.state.safeStock[i].Product_id == product_id) {
        return this.state.safeStock[i];
      }
    }
  }

  getpromotionInfo(product_id) {
    for (var i = 0; i < this.state.promotion.length; i++) {
      if (this.state.promotion[i].Product_id == product_id &&
        new Date(this.state.promotion[i].Date3).getTime() >= Store.getCurDate().getTime()) {
        return this.state.promotion[i];
      }
    }
  }

  getsaleActualInfo(serial_no) {
    for (var i = 0; i < this.state.saleActual.length; i++) {
      if (this.state.saleActual[i].serial_no == serial_no) {
        return this.state.saleActual[i];
      }
    }
  }

  getsaleCount(product_id, serial_no) {
    console.log(product_id, serial_no);
    var promotionInfo = this.getpromotionInfo(product_id);
    if (promotionInfo) {
      console.log("promotion", promotionInfo.Qty1);
      return promotionInfo.Qty1;
    } else {
      var saleActualInfo = this.getsaleActualInfo(serial_no);
      if (saleActualInfo) {
        console.log("saleActualInfo", saleActualInfo.sum);
        return saleActualInfo.sum;
      }
    }
    return "未知"
  }
  onSaleActualChange(saleActual) {
    this.setState({
      saleActual,
      loading: false,
    })
  }

  getOrderDom() {
    var orderDom = [];
    for (var i = 0; i < this.state.preSaveProduct.length; i++) {
      var stockinfo = this.state.preSaveProduct[i];
      var safeInfo = this.getsafeInfo(stockinfo.product_id);
      var promotionInfo = this.getpromotionInfo(stockinfo.product_id);
      if (!promotionInfo) {
        continue;
      }
      if (safeInfo) {
        var saleCount = this.getsaleCount(stockinfo.product_id, safeInfo.serial_no);
        var curstock = stockinfo.count + stockinfo.onway;
        if (curstock < safeInfo.amt) {
          var orderCount = 0;
          var diff = curstock - safeInfo.amt;
          if (parseInt(safeInfo.product_box) <= 0) {
            message.info(safeInfo.product_name + "箱规信息异常");
            continue;
          }
          while (diff < 0) {
            diff += parseInt(safeInfo.product_box);
            orderCount += parseInt(safeInfo.product_box);
          }
          orderDom.push(<Card title={<span><span style={{
            color: '#ecf6fd',
            backgroundColor: promotionInfo ? 'rgb(222, 80, 25)' : '#0DCC6C',
            margin: '0 3px 0 0',
            padding: '1px 3px'
          }}>{promotionInfo ? "促" : "正"}</span>{safeInfo.product_name}</span>} extra={`货号：${safeInfo.serial_no}`} style={{ width: "100%" }}>
            <div style={{ justifyContent: 'space-between' }} className={styles.ordercontent}>
              <p>{"库存：" + stockinfo.count}</p>
              <div style={{ backgroundColor: '#F3F3F3' }} className={styles.line}></div>
              <p>{"在途：" + stockinfo.onway}</p>
              <div style={{ backgroundColor: '#F3F3F3' }} className={styles.line}></div>
              <p>{promotionInfo ? "预估促销量：" : "月实销量：" + saleCount}</p>
            </div>
            <div className={styles.orderline}></div>
            <div className={styles.ordercontent}>
              <p>单位：PK</p>
              <div className={styles.line}></div>
              <p>{"箱规：" + safeInfo.product_box}</p>
              <div className={styles.line}></div>
              <p style={{
                flexGrow: 1,
                textAlign: 'center'
              }}>建议订货量：<span style={{
                color: '#0e77ca',
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '0 8px'
              }}>{orderCount}</span></p>
            </div>
          </Card>)
          orderDom.push(<div style={{ height: '15px' }}></div>)
        }
      }
    }
    for (var i = 0; i < this.state.preSaveProduct.length; i++) {
      var stockinfo = this.state.preSaveProduct[i];
      var safeInfo = this.getsafeInfo(stockinfo.product_id);
      var promotionInfo = this.getpromotionInfo(stockinfo.product_id);
      if (promotionInfo) {
        continue;
      }
      if (safeInfo) {
        var saleCount = this.getsaleCount(stockinfo.product_id, safeInfo.serial_no);
        var curstock = stockinfo.count + stockinfo.onway;
        if (curstock < safeInfo.amt) {
          var orderCount = 0;
          var diff = curstock - safeInfo.amt;
          if (parseInt(safeInfo.product_box) <= 0) {
            message.info(safeInfo.product_name + "箱规信息异常");
            continue;
          }
          while (diff < 0) {
            diff += parseInt(safeInfo.product_box);
            orderCount += parseInt(safeInfo.product_box);
          }
          orderDom.push(<Card title={<span><span style={{
            color: '#ecf6fd',
            backgroundColor: promotionInfo ? 'rgb(222, 80, 25)' : '#0DCC6C',
            margin: '0 3px 0 0',
            padding: '1px 3px'
          }}>{promotionInfo ? "促" : "正"}</span>{safeInfo.product_name}</span>} extra={`货号：${safeInfo.serial_no}`} style={{ width: "100%" }}>
            <div style={{ justifyContent: 'space-between' }} className={styles.ordercontent}>
              <p>{"库存：" + stockinfo.count}</p>
              <div style={{ backgroundColor: '#F3F3F3' }} className={styles.line}></div>
              <p>{"在途：" + stockinfo.onway}</p>
              <div style={{ backgroundColor: '#F3F3F3' }} className={styles.line}></div>
              <p>{promotionInfo ? "预估促销量：" : "月实销量：" + saleCount}</p>
            </div>
            <div className={styles.orderline}></div>
            <div className={styles.ordercontent}>
              <p>单位：PK</p>
              <div className={styles.line}></div>
              <p>{"箱规：" + safeInfo.product_box}</p>
              <div className={styles.line}></div>
              <p style={{
                flexGrow: 1,
                textAlign: 'center'
              }}>建议订货量：<span style={{
                color: '#0e77ca',
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '0 8px'
              }}>{orderCount}</span></p>
            </div>
          </Card>)
          orderDom.push(<div style={{ height: '15px' }}></div>)
        }
      }
    }
    return orderDom;
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          style={{ paddingTop: config.titlebarPadding }}
          title='订货信息'
          onLeftIconButtonTouchTap={this.onClickBack}
          //onRightIconButtonTouchTap={this.onClickSave}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton onTouchTap={this.onClickSave} label="保存到相册" />}
        />

        <div style={{ top: config.contentTop, backgroundColor: 'white' }} className={styles.content}>
          <Spin size="large" tip={"正在加载，请稍后"} spinning={this.state.loading}>
            <div id="ordercontainer" className={styles.ordercontainer}>
              <p className={styles.ordertitle}>{this.props.userdata.Store_name + " 建议订货单"}</p>
              <p className={styles.ordersubtitle}>上海满好日用品有限公司</p>
              {this.getOrderDom()}
            </div>
          </Spin>
        </div>
      </div >
    );
  }
}

export default Order;