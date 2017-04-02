import React from 'react';
import styles from '../home.less';


import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { message } from 'antd';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';


import { cyan800, cyan100, cyan600 } from 'material-ui/styles/colors';

class Promotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promotion: Store.getPromotionByStore(this.props.userdata.store_id),
    };
    this.onClickBack = this.onClickBack.bind(this);
    this.onPromotionChange = this.onPromotionChange.bind(this);
    this.onClickPromotion = this.onClickPromotion.bind(this);
  }

  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_PROMOTION, this.onPromotionChange);
    if (this.state.promotion.length == 0) {
      Action.getPromotionbyStore({
        store_id: this.props.userdata.store_id,
      })
    }
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_PROMOTION, this.onPromotionChange);
  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, 'doplanview');
  }

  onPromotionChange() {
    this.setState({ promotion: Store.getPromotionByStore(this.props.userdata.store_id) })
  }

  onClickPromotion(pm) {
    var userdata = {
      store: this.props.userdata,
      pm: pm
    }
    Store.emit(StoreEvent.SE_VIEW, 'promotiondetailview', userdata);
  }

  getProductList(pro) {
    var promotion = this.state.promotion;
    var productList = [];
    for (var i = 0; i < promotion.length; i++) {
      if (promotion[i].Pro_name == pro.Pro_name &&
        promotion[i].Promotion_type == pro.Promotion_type) {
        productList.push(promotion[i]);
      }
    }
    return productList;
  }

  getPromotionListDom() {
    var promotion = this.state.promotion;
    var pmList = [];
    var context = this;

    var AddToPmList = function (pro) {
      for (var i = 0; i < pmList.length; i++) {
        if (pmList[i].Pro_name == pro.Pro_name &&
          pmList[i].Promotion_type == pro.Promotion_type) {
          return;
        }
      }
      pmList.push(pro);
    }

    for (var i = 0; i < promotion.length; i++) {
      AddToPmList(promotion[i]);
    }
    var nowDate = new Date();
    var pmDom = [];
    for (var nIndex = 0; nIndex < pmList.length; nIndex++) {
      let pm = pmList[nIndex];
      var proBeginDate = new Date(pm.Date3);
      var proEndDate = new Date(pm.Date4);
      var proState = "";
      if (nowDate < proBeginDate) {
        proState = "未开档"
      } else {
        proState = "档期中"
      }
      var productList = this.getProductList(pm);
      var diff = parseInt(Math.abs(nowDate - proEndDate) / 1000 / 60 / 60 / 24) + 1;
      if (diff > pm.Day) {
        diff = pm.Day;
      }
      pmDom.push(<Paper zDepth={1} className={styles.promotionPanel}
        onClick={function(){context.onClickPromotion(pm)}}>
        <div className={styles.titlebar}>
          <p>{pm.Pro_name}</p>
          <p>{pm.promotion_name}</p>
        </div>
        <div className={styles.content}>
          <p>{"日期：" + proBeginDate.Format("yyyy-MM-dd ") + "至" + proEndDate.Format(" yyyy-MM-dd")}</p>
          <p>{proState}</p>
        </div>
        <div className={styles.footbar}>
          <div className={styles.footcontent}>
            <p>促销天数</p>
            <p>{pm.Day + '天'}</p>
          </div>
          <p className={styles.line}></p>
          <div className={styles.footcontent}>
            <p>剩余天数</p>
            <p>{diff + '天'}</p>
          </div>
          <p className={styles.line}></p>
          <div className={styles.footcontent}>
            <p>产品数量</p>
            <p>{productList.length + "个"}</p>
          </div>
        </div>
      </Paper>)
    }
    return pmDom;
  }

  render() {
    return (
      <div className={styles.container}>
        <AppBar
          style={{ paddingTop: '20px' }}
          title='促销陈列'
          onLeftIconButtonTouchTap={this.onClickBack}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          />

        <div className={[styles.content, styles.content_notoolbar].join(' ')}>
          <Subheader>{this.props.userdata.Store_name}</Subheader>
          {this.getPromotionListDom()}
        </div>
      </div>
    );
  }
}

export default Promotion;