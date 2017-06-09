import React from 'react';
import styles from './home.less';


import AppBar from 'material-ui/AppBar';
import {
  Step,
  Stepper,
  StepLabel,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import { message, Spin, Modal, Button } from 'antd';
import { List, ListItem } from 'material-ui/List';

const confirm = Modal.confirm;


import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import SortIcon from 'material-ui/svg-icons/content/sort';


import { cyan600 } from 'material-ui/styles/colors';
import config from '../../config';

class DoPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: -1,
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
    this.map = null;
  }
  onPlanChange() {
    this.setState({
      loading: false
    })
    this.getStorelist();
  }
  handleSign(store, signType) {
    var context = this;
    confirm({
      title: '确定要' + (signType == 'signin' ? '签到' : '签退') + '吗？',
      onOk() {
        context.setState({
          loading: true
        })
        if (config.debug) {
          Action.sign({
            userid: localStorage.username,
            year: store.year,
            month: store.month,
            day: store.day,
            store_id: store.store_id,
            sign_type: signType,
            lat: 1,
            lon: 2
          });
          return;
        }

        //ANDROID 定位
        if (config.platform == "android") {
          baidu_location.getCurrentPosition(function (data) {
            if (data.locType == 61 || data.locType == 161) {
              //定位成功
              Action.sign({
                userid: localStorage.username,
                year: store.year,
                month: store.month,
                day: store.day,
                store_id: store.store_id,
                sign_type: signType,
                lat: data.latitude,
                lon: data.lontitude
              });
            } else {
              message.error(data.describe);
              context.setState({
                loading: false
              })
            }
          }, function (data) {
            //定位失败
            message.error("定位失败");
            context.setState({
              loading: false
            })
          });
        } else {
          //IOS 定位
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              //onSuccees        
              var point = new BMap.Point(position.coords.longitude, position.coords.latitude);

              var translateCallback = function (data) {
                if (data.status === 0) {
                  Action.sign({
                    userid: localStorage.username,
                    year: store.year,
                    month: store.month,
                    day: store.day,
                    store_id: store.store_id,
                    sign_type: signType,
                    lat: data.points[0].lat,
                    lon: data.points[0].lng
                  });
                }
              }

              var convertor = new BMap.Convertor();
              var pointArr = [];
              pointArr.push(point);
              convertor.translate(pointArr, 1, 5, translateCallback);

            }, function (error) {
              //onError
              message.error('定位失败' + error.message);
              context.setState({
                loading: false
              })
            }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
          } else { message.error("没有开启定位权限！") }
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });


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
    var context = this;
    var bSign = !!store.signin_time;
    //bSign = true;
    console.log('renderStepActions', store, bSign);
    var signin_distance = 0;
    if (this.map) {
      var pointStore = new BMap.Point(store.Gps_x, store.Gps_y);
      if (store.signin_gps_x && store.signin_gps_y) {
        var pointSignin = new BMap.Point(store.signin_gps_x, store.signin_gps_y);
        signin_distance = parseInt(this.map.getDistance(pointStore, pointSignin));
      }
    } else {
      signin_distance = "未知";
    }
    return (
      <div style={{ margin: '12px 0' }}>
        {bSign ?
          [<p>签到成功，偏差<span style={{
            margin: '0px 10px',
            color: '#ef6b1e',
            fontSize: '20px'
          }}>{signin_distance}</span>米</p>,
          <List>
            <ListItem
              disableTouchRipple={true}
              primaryText="主货架陈列"
              rightIcon={<RightIcon color={cyan600} />}
              onTouchTap={function () { context.onClickShelfMain(store) } }
              />
            <ListItem
              disableTouchRipple={true}
              primaryText="离架陈列"
              rightIcon={<RightIcon color={cyan600} />}
              onTouchTap={function () { context.onClickShelfAway(store) } }
              />
            <ListItem
              disableTouchRipple={true}
              primaryText="促销陈列"
              rightIcon={<RightIcon color={cyan600} />}
              onTouchTap={function () { context.onClickPromotion(store) } }
              />
            <ListItem
              disableTouchRipple={true}
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
              disableTouchRipple={true}
              primaryText="洽谈记录"
              rightIcon={<RightIcon color={cyan600} />}
              onTouchTap={function () { context.onClickChat(store) } }
              />
          </List>,
          <RaisedButton
            label="签退"
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
    if (_plan.length <= 0) {
      message.error("没有找到相应的计划");
    } else if (storelist.length <= 0) {
      message.error("没有找到相应的门店" + path_id + "_" + store_id);
    }
    this.setState({
      storelist: storelist
    })
  }

  componentDidMount() {
    if (typeof (BMap) != "undefined") {
      this.map = new BMap.Map("allmap");
    } else {
      this.map = null;
      message.info("地图服务未启动，无法计算偏差距离！");
    }
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
    var stepIndex = this.state.stepIndex;
    var finishCount = 0;
    var stepDom = this.state.storelist.map((store, index) => {
      if (stepIndex < 0 && !store.isfinish) {
        stepIndex = index;
      }
      if (store.isfinish) {
        if (stepIndex == index) {
          stepIndex = -1;
        }
        finishCount++;
      }
      return <Step completed={store.isfinish}>
        <StepButton onTouchTap={() => this.setState({ stepIndex: index })}>{store.Store_name}</StepButton>
        <StepContent>
          {this.renderStepActions(store, index)}
        </StepContent>
      </Step>
    });
    var stepper = [<Stepper activeStep={stepIndex} linear={false} orientation="vertical">
      {stepDom}
    </Stepper>]

    if (finishCount >= this.state.storelist.length) {
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
        <div style={{ top: config.contentTop }} className={styles.content}>
          <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>

            <Spin size="large" tip="正在定位，请稍后" spinning={this.state.loading}>
              <Subheader>{planname}</Subheader>
              {this.getStep()}
            </Spin>
          </div>
        </div>
        <div id="allmap" style={{ visibility: 'hidden' }}>
        </div>
      </div>
    );
  }
}

export default DoPlan;