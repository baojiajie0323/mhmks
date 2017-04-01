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

class PromotionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promotion: Store.getPromotionByStore(this.props.userdata.store.store_id),
      open: false
    };
    this.onClickBack = this.onClickBack.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onStoreUser = this.onStoreUser.bind(this);
    this.onChatContent = this.onChatContent.bind(this);
    this.onChatResult = this.onChatResult.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.storeUser = "";
    this.chatContent = "";
    this.chatResult = "";
  }

  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_CHAT_SUBMIT, this.onSumitSuccess);
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_CHAT_SUBMIT, this.onSumitSuccess);
  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, 'promotionview', this.props.userdata.store);
  }
  onStoreUser(e, value) {
    this.storeUser = value;
  }
  onChatContent(e, value) {
    this.chatContent = value;
  }
  onChatResult(e, value) {
    this.chatResult = value;
  }
  onSumitSuccess() {
    Store.emit(StoreEvent.SE_VIEW, 'promotionview', this.props.userdata.store);
  }
  onClickSubmit() {
    this.setState({ open: true })
  }
  handleClose() {
    this.setState({ open: false });
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

  getPromotionDom() {
    var context = this;

    var nowDate = new Date();
    var pmDom = [];

    var pm = this.props.userdata.pm;
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
    return <Paper zDepth={1} className={[styles.promotionPanel,styles.nomargin].join(' ')}
      onClick={function () { context.onClickPromotion(pm) } }>
      <div className={styles.titlebar}>
        <p>{pm.Pro_name}</p>
        <p>{pm.promotion_name}</p>
      </div>
      <div className={styles.content}>
        <p>{"促销时间：" + proBeginDate.Format("yyyy-MM-dd ") + "至" + proEndDate.Format(" yyyy-MM-dd")}</p>
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
    </Paper>

  }

  handleSubmit() {
    var curDate = Store.getCurDate();
    var data = {
      store_id: this.props.userdata.store_id,
      userid: localStorage.username,
      year: curDate.getFullYear(),
      month: curDate.getMonth() + 1,
      day: curDate.getDate(),
      storeUser: this.storeUser,
      chatContent: this.chatContent,
      chatResult: this.chatResult
    }
    Action.submitChat(data);
  }
  render() {
    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleClose}
        />,
      <FlatButton
        label="确定"
        primary={true}
        onTouchTap={this.handleSubmit}
        />,
    ];
    return (
      <div className={styles.container}>
        <AppBar
          style={{ paddingTop: '20px' }}
          title='促销详情'
          onLeftIconButtonTouchTap={this.onClickBack}
          onRightIconButtonTouchTap={this.onClickSubmit}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton label="提交" />}
          />

        <div className={[styles.content, styles.content_notoolbar].join(' ')}>
          {this.getPromotionDom()}
          <Paper zDepth={1} className={styles.productPanel}>
            <div className={styles.titlebar}>
              巧心烹调纸8+2米
            </div>
            <div className={styles.content}>
            </div>
          </Paper>
        </div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          >
          确定要提交数据吗？
        </Dialog>
      </div>
    );
  }
}

export default PromotionDetail;