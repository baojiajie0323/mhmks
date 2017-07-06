import React from 'react';
import styles from '../home.less';


import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { message, Modal, Card, Avatar } from 'antd';
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
      preSaveProduct: [],
    };
    this.onClickBack = this.onClickBack.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onStockChange = this.onStockChange.bind(this);
  }

  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_STOCK, this.onStockChange);

    this.checkProductList();

    var curDate = Store.getCurDate();
    Action.getStock({
      year: curDate.getFullYear(),
      month: curDate.getMonth() + 1,
      day: curDate.getDate(),
      userid: localStorage.username,
      store_id: this.props.userdata.store_id,
    });
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_STOCK, this.onStockChange);
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
    preSaveProduct.forEach((sp) => {
      sp.Product_id = sp.product_id;
    })

    this.setState({
      preSaveProduct
    })
    
    console.log('onStockChange', preSaveProduct);
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

  getOrderDom() {
    var orderDom = [];
    for (var i = 0; i < 8; i++) {
      orderDom.push(<Card title={<span><span style={{
        color: '#ecf6fd',
        backgroundColor: '#0DCC6C',
        margin: '0 3px 0 0',
        padding: '1px 3px'
      }}>促</span>巧姿沐浴按摩手套2只</span>} extra={"21317860"} style={{ width: "100%" }}>
        <div style={{ justifyContent: 'space-between' }} className={styles.ordercontent}>
          <p>库存：12</p>
          <div style={{ backgroundColor: '#F3F3F3' }} className={styles.line}></div>
          <p>在途：48</p>
          <div style={{ backgroundColor: '#F3F3F3' }} className={styles.line}></div>
          <p>销售量：128</p>
        </div>
        <div className={styles.orderline}></div>
        <div className={styles.ordercontent}>
          <p>单位：PK</p>
          <div className={styles.line}></div>
          <p>箱规：48</p>
          <div className={styles.line}></div>
          <p style={{
            flexGrow: 1,
            textAlign: 'center'
          }}>建议订货量：<span style={{
            color: '#0e77ca',
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '0 8px'
          }}>96</span></p>
        </div>
      </Card>)
      orderDom.push(<div style={{ height: '15px' }}></div>)
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
          <div id="ordercontainer" className={styles.ordercontainer}>
            <p className={styles.ordertitle}>{this.props.userdata.Store_name + " 建议订货单"}</p>
            <p className={styles.ordersubtitle}>上海满好日用品有限公司</p>
            {this.getOrderDom()}
          </div>
        </div>
      </div >
    );
  }
}

export default Order;