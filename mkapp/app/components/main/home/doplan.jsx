import React from 'react';
import styles from './home.less';


import AppBar from 'material-ui/AppBar';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import { message, Spin } from 'antd';
import { List, ListItem } from 'material-ui/List';


import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';


import { cyan600 } from 'material-ui/styles/colors';
import config from '../../config';

class DoPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      storestate: 0, // 0未签到  1已签到未签出  2已签出
      storelist: [],
      loading: false,
    };
    this.handleSign = this.handleSign.bind(this);
    this.onClickShelfMain = this.onClickShelfMain.bind(this);
    this.onClickShelfAway = this.onClickShelfAway.bind(this);
    this.onClickPromotion = this.onClickPromotion.bind(this)
    this.onClickStock = this.onClickStock.bind(this);
    this.onClickChat = this.onClickChat.bind(this);
    this.onPlanChange = this.onPlanChange.bind(this);
  }
  onPlanChange() {
    this.setState({
      loading: false
    })
    this.getStorelist();
  }
  handleSign(store, signType) {
    var context = this;
    this.setState({
      loading: true
    })
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        //message.success();
        Action.sign({
          userid: localStorage.username,
          year: store.year,
          month: store.month,
          day: store.day,
          store_id: store.store_id,
          sign_type: signType,
          lat: r.latitude,
          lon: r.longitude
        });
      }
      else {
        context.setState({
          loading: false
        })
        message.error('定位失败: 错误码为' + this.getStatus());
      }
    }, { enableHighAccuracy: true })
  }

  onClickShelfMain(store) {
    Store.emit(StoreEvent.SE_VIEW, 'shelfmainview', store);
  }
  onClickShelfAway(store) {
    Store.emit(StoreEvent.SE_VIEW, 'shelfawayview', store);
  }
  onClickPromotion(store) {
    Store.emit(StoreEvent.SE_VIEW, 'promotionview', store);
  }
  onClickStock(store) {
    Store.emit(StoreEvent.SE_VIEW, 'stockview', store);
  }
  onClickChat(store) {
    Store.emit(StoreEvent.SE_VIEW, 'chatview', store);
  }

  renderStepActions(store, step) {
    const {stepIndex} = this.state;
    var context = this;
    var bSign = !!store.signin_time;
    //bSign = true;
    console.log('renderStepActions', store, bSign);
    return (
      <div style={{ margin: '12px 0' }}>
        {bSign ?
          [<List>
            <ListItem
              primaryText="主货架陈列"
              rightIcon={<RightIcon color={cyan600} />}
              onTouchTap={function () { context.onClickShelfMain(store) } }
              />
            <ListItem
              primaryText="离架陈列"
              rightIcon={<RightIcon color={cyan600} />}
              onTouchTap={function () { context.onClickShelfAway(store) } }
              />
            <ListItem
              primaryText="促销陈列"
              rightIcon={<RightIcon color={cyan600} />}
              onTouchTap={function () {context.onClickPromotion(store)}}
              />
            <ListItem
              primaryText="库存采集"
              rightIcon={<RightIcon color={cyan600} />}
              onTouchTap={function () { context.onClickStock(store) } }
              />
            {/*<ListItem
              primaryText="异常库存管理"
              rightIcon={<RightIcon color={cyan600} />}
              onTouchTap={this.onClickStore}
              />
            <ListItem
              primaryText="竞品信息采集"
              rightIcon={<RightIcon color={cyan600} />}
              onTouchTap={this.onClickStore}
              />*/}
            <ListItem
              primaryText="洽谈记录"
              rightIcon={<RightIcon color={cyan600} />}
              onTouchTap={function () { context.onClickChat(store) } }
              />
          </List>,
            <RaisedButton
              label="签出"
              secondary={true}
              onTouchTap={function () {
                context.handleSign(store, 'signout');
              } }
              />] :
          <RaisedButton
            label={'签到'}
            primary={true}
            onTouchTap={function () {
              context.handleSign(store, 'signin');
            } }
            />
        }
      </div>
    );
  }

  getStorelist() {
    var planInfo = Store.getCurPlan();
    var _plan = Store.getPlan();
    var path_id = planInfo.path_id;
    var store_id = planInfo.store_id;
    var storelist = [];
    if (path_id) {
      //路线拜访
      for (var i = 0; i < _plan.length; i++) {
        var plan = _plan[i];
        if (plan.plan_type == 1 && plan.path_id == path_id) {
          storelist.push(plan);
        }
      }
    } else {
      //临时拜访
      for (var i = 0; i < _plan.length; i++) {
        var plan = _plan[i];
        if (plan.plan_type != 1 && plan.store_id == store_id) {
          storelist.push(plan);
        }
      }
    }

    this.setState({
      storelist: storelist
    })
  }

  componentDidMount() {
    this.getStorelist();
    Store.addChangeListener(StoreEvent.SE_PLAN, this.onPlanChange);
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_PLAN, this.onPlanChange);
  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, '');
  }
  getPlanName() {
    console.log('getPlanName', this.state.storelist);
    for (var i = 0; i < this.state.storelist.length; i++) {
      var planstore = this.state.storelist[i];
      if (planstore.plan_type == 2) {
        return '临时拜访： ' + planstore.Store_name;
      } else if (planstore.plan_type == 1) {
        return '路线拜访： ' + planstore.Path_Name;
      }
    }
  }
  getStep() {
    var stepIndex = -1;
    //stepIndex = 0;
    var stepDom = this.state.storelist.map((store, index) => {
      if (stepIndex < 0 && store.isfinish == 0) {
        stepIndex = index;
      }
      return <Step>
        <StepLabel>{store.Store_name}</StepLabel>
        <StepContent>
          {this.renderStepActions(store, index) }
        </StepContent>
      </Step>
    });
    var stepper = [<Stepper activeStep={stepIndex} orientation="vertical">
      {stepDom}
    </Stepper>]

    if (stepIndex < 0) {
      stepper.push(<p style={{ margin: '20px 0', textAlign: 'center' }}>
        该线路所有门店都已巡完.
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            this.onClickBack();
          } }
          >
          查看其它计划
        </a>
      </p>)
    }
    return stepper;
  }
  render() {
    const {finished} = this.state;

    var planname = this.getPlanName();
    return (
      <div className={styles.container}>
        <AppBar
          style={{ paddingTop: config.titlebarPadding }}
          title='执行计划'
          onLeftIconButtonTouchTap={this.onClickBack}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          />
        <div style={{top:config.contentTop}} className={styles.content}>
          <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>

            <Spin size="large" tip="正在定位，请稍后" spinning={this.state.loading}>
              <Subheader>{planname}</Subheader>
              {this.getStep() }
            </Spin>
          </div>
        </div>
      </div>
    );
  }
}

export default DoPlan;