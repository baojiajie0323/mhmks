import React from 'react';
import styles from './home.less';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import areIntlLocalesSupported from 'intl-locales-supported';
import { List, ListItem } from 'material-ui/List';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Spin, Alert, message } from 'antd';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import config from '../../config';
import AddIcon from 'material-ui/svg-icons/content/add-box';
import LineIcon from 'material-ui/svg-icons/action/timeline';
import PhoneIcon from 'material-ui/svg-icons/action/settings-phone';
import TmpIcon from 'material-ui/svg-icons/action/restore';
import Note from 'material-ui/svg-icons/action/assignment';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import NotstartIcon from 'material-ui/svg-icons/toggle/star-border';
import HasstartIcon from 'material-ui/svg-icons/toggle/star-half';
import FinishIcon from 'material-ui/svg-icons/toggle/star';
import MoreVertIcon from 'material-ui/svg-icons/navigation/menu';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DoneIcon from 'material-ui/svg-icons/action/done';


import { cyan800, cyan100, cyan600, green600, indigo600, red600 } from 'material-ui/styles/colors';

var DateTimeFormat;
if (areIntlLocalesSupported(['zh'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/zh');
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><AddIcon color={cyan800} /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    {/*<MenuItem onTouchTap={props.onClickAddPath} primaryText="路线拜访" leftIcon={<LineIcon color={cyan600} />} />*/}
    <MenuItem onTouchTap={props.onClickAddTmp} primaryText="临时拜访" leftIcon={<TmpIcon color={green600} />} />
    <MenuItem onTouchTap={props.onClickAddCall} primaryText="电话拜访" leftIcon={<PhoneIcon color={indigo600} />} />
    {/*<MenuItem disabled={true} onTouchTap={props.onClickAddCheck} primaryText="稽核拜访" leftIcon={<DoneIcon color={red600} />} />*/}
  </IconMenu>
);

const PlanOperate = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon color={cyan800} /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="执行" onTouchTap={props.onClickDoPlan} leftIcon={<PlayIcon color={cyan600} />} />
    <MenuItem primaryText="删除" onTouchTap={props.onClickDelete} leftIcon={<DeleteIcon color={red600} />} />
  </IconMenu>
);

const Noplan = (props) => (
  <div className={styles.noplan}>当日暂无计划，您可以添加计划</div>
);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: Store.getPlan(),
      curDate: Store.getCurDate(),
      loading: true,
      open: false,
      expense: Store.getExpense(),
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.onPlanChange = this.onPlanChange.bind(this);
    this.getcurPlan = this.getcurPlan.bind(this);
    this.onClickNote = this.onClickNote.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickDoPlan = this.onClickDoPlan.bind(this);
    this.onClickExpense = this.onClickExpense.bind(this);
    this.onExpenseChange = this.onExpenseChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_PLAN, this.onPlanChange);
    Store.addChangeListener(StoreEvent.SE_EXPENSE, this.onExpenseChange);
    var context = this;
    this.getcurPlan();
    this.getExpense();
  }
  getcurPlan() {
    this.setState({
      loading: true,
    })
    Action.getPlan({
      //date: this.state.curDate.Format('yyyy-MM-dd'),
      userid: localStorage.username,
      year: this.state.curDate.getFullYear(),
      month: this.state.curDate.getMonth() + 1,
      day: this.state.curDate.getDate()
    });
  }
  getExpense() {
    Action.getExpense({
      begindate: this.state.curDate.Format('yyyy-MM-dd'),
      enddate: this.state.curDate.Format('yyyy-MM-dd'),
      userid: localStorage.username,
    });
  }
  onExpenseChange() {
    this.setState({
      expense: Store.getExpense()
    })
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_PLAN, this.onPlanChange);
    Store.removeChangeListener(StoreEvent.SE_EXPENSE, this.onExpenseChange);
  }
  onPlanChange() {
    this.setState({
      plan: Store.getPlan(),
      loading: false,
      open: false,
    })
  }
  onDateChange(e, curDate) {
    var context = this;
    this.setState({ curDate }, function () {
      context.getcurPlan();
      Store.setCurDate(curDate);
    })
  }
  onClickPrev() {
    var { curDate } = this.state;
    curDate.setDate(curDate.getDate() - 1);
    this.setState({
      curDate
    }, this.getcurPlan)
  }
  onClickNext() {
    var { curDate } = this.state;
    curDate.setDate(curDate.getDate() + 1);
    this.setState({
      curDate
    }, this.getcurPlan)
  }
  onClickAddPath() {
    if (!this.checkToday()) {
      message.info("只能增加今日的计划！");
      return;
    }
    Store.emit(StoreEvent.SE_VIEW, 'selectpathview');
  }
  onClickAddTmp() {
    //message.info("暂不支持，请在后台安排计划");
    if (!this.checkToday()) {
      message.info("只能增加今日的计划！");
      return;
    }
    Store.emit(StoreEvent.SE_VIEW, 'selectstoreview', 2);
  }
  onClickAddCall() {
    if (!this.checkToday()) {
      message.info("只能增加今日的计划！");
      return;
    }
    Store.emit(StoreEvent.SE_VIEW, 'selectstoreview', 3);
  }
  onClickAddCheck() {
    if (!this.checkToday()) {
      message.info("只能增加今日的计划！");
      return;
    }
    Store.emit(StoreEvent.SE_VIEW, 'selectstoreview');
  }
  checkToday() {
    var nowDate = new Date();
    var curSelDate = this.state.curDate;
    if (nowDate.getFullYear() == curSelDate.getFullYear() &&
      nowDate.getMonth() == curSelDate.getMonth() &&
      nowDate.getDate() == curSelDate.getDate()) {
      return true;
    }
    return false;
  }
  onClickDoPlan(path_id, store_id) {
    if (!this.checkToday()) {
      message.info("只能执行今日的计划！");
      return;
    }
    Store.setCurPlan(path_id, store_id);
    Store.emit(StoreEvent.SE_VIEW, 'doplanview');
  }
  onClickNote() {
    Store.emit(StoreEvent.SE_VIEW, 'noteview');
  }
  getPlanCount() {
    var planCount = 0;
    var linePlan = false;
    var finishCount = 0;
    var linePlanFinish = 1;
    for (var i = 0; i < this.state.plan.length; i++) {
      var plan = this.state.plan[i];
      if (plan.plan_type == 1) {
        if (!linePlan) {
          linePlan = true;
          planCount++;
        }
        if (plan.isfinish == 0) {
          linePlanFinish = 0;
        }
      } else {
        planCount++;
        if (plan.isfinish == 1) {
          finishCount++;
        }
      }
    }
    if (linePlan && linePlanFinish) {
      finishCount++;
    }
    return {
      planCount: planCount,
      nofinishCount: planCount - finishCount,
      finishCount: finishCount
    };
  }
  getStoreListName(path_id) {
    var storeNameList = [];
    for (var i = 0; i < this.state.plan.length; i++) {
      var plan = this.state.plan[i];
      if (plan.plan_type == 1 && path_id == plan.path_id) {
        storeNameList.push(plan.Store_name);
      }
    }
    return storeNameList.join(' ， ');
  }
  getPlanState(pl) {
    if (pl.plan_type == 1) {
      var allFinish = true;
      var hasStart = false;
      for (var i = 0; i < this.state.plan.length; i++) {
        var plan = this.state.plan[i];
        if (plan.plan_type == 1 && plan.path_id == pl.path_id) {
          if (plan.isfinish == 0) {
            allFinish = false;
          }
          if (plan.signin_time) {
            hasStart = true;
          }
        }
      }
      if (allFinish) {
        return 'finish'
      } else if (hasStart) {
        return 'hasstart'
      } else {
        return 'nostart'
      }
    } else {
      if (pl.isfinish == 1) {
        return 'finish'
      } else {
        if (pl.signin_time) {
          return 'hasstart'
        } else {
          return 'nostart'
        }
      }
    }
  }
  getStateIcon(pl) {
    var state = this.getPlanState(pl);
    if (state == 'finish') {
      return <FinishIcon color={cyan600} />
    } else if (state == 'hasstart') {
      return <HasstartIcon color={cyan600} />
    } else if (state == 'nostart') {
      return <NotstartIcon color={cyan600} />
    }
  }
  getPlanlist() {
    var context = this;
    var allPlanInfo = this.getPlanCount();
    if (this.state.plan.length <= 0) {
      return <Noplan />
    } else {
      var planDom = [];
      var headerTitle = '共' + allPlanInfo.planCount + '个计划，已完成' + allPlanInfo.finishCount + '个，未完成' + allPlanInfo.nofinishCount + '个';
      planDom.push(<Subheader>{headerTitle}</Subheader>)
      var pathTitle = ['路线拜访', '临时拜访', '电话拜访', '稽核拜访'];
      var linepath = false;
      this.state.plan.forEach((pl) => {
        var pathName = '';
        var storeName = pl.Store_name;
        var planstate = this.getPlanState(pl);
        if (pl.plan_type == 1) {
          if (!linepath) {
            pathName = ' ' + pl.Path_Name;
            linepath = true;
            storeName = context.getStoreListName(pl.path_id);
          } else {
            return;
          }
        }
        planDom.push(<ListItem
          primaryText={pathTitle[pl.plan_type - 1] + pathName}
          secondaryText={storeName}
          secondaryTextLines={2}
          disableTouchRipple={true}
          rightIconButton={<PlanOperate
            onClickDoPlan={function () {
              context.onClickDoPlan(pl.path_id, pl.store_id);
            }}
            onClickDelete={function () {
              context.onClickDelete(pl.path_id, pl.store_id);
            }}
          />}
          leftIcon={this.getStateIcon(pl)}
        />)
        planDom.push(<Divider />);
      })
      return planDom;
    }
  }
  onClickDelete(path_id, store_id) {
    if (!this.checkToday()) {
      message.info("只能删除今日的计划！");
      return;
    }
    if (path_id && path_id != "") {
      message.info("路线拜访不能被删除！");
      return;
    }
    this.predelpath_id = path_id;
    this.predelstore_id = store_id;
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  handleOk() {
    Action.delPlan({
      userid: localStorage.username,
      store_id: this.predelstore_id,
      year: this.state.curDate.getFullYear(),
      month: this.state.curDate.getMonth() + 1,
      day: this.state.curDate.getDate()
    });
  }
  onClickExpense() {
    Store.emit(StoreEvent.SE_VIEW, 'expenseview');
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
        onTouchTap={this.handleOk}
      />,
    ];
    var isToday = false;
    if (this.state.curDate.Format("yyyy-MM-dd") == new Date().Format("yyyy-MM-dd")) {
      isToday = true;
    }
    var isExpense = this.state.expense.length > 0;
    return (
      <div className={styles.container}>
        <AppBar
          style={{ paddingTop: config.titlebarPadding }}
          title='拜访'
          iconElementLeft={<span />}
        />
        <Paper zDepth={1}>
          <Toolbar noGutter={true} style={{ backgroundColor: 'white' }}>
            <ToolbarGroup>
              <IconButton onTouchTap={this.onClickPrev}><LeftIcon color={cyan800} /></IconButton>
              <DatePicker
                value={this.state.curDate}
                DateTimeFormat={DateTimeFormat}
                locale="zh"
                autoOk={true}
                textFieldStyle={{ textAlign: 'center', width: '120px' }}
                inputStyle={{ textAlign: 'center' }}
                hintText="请选择日期"
                okLabel="确定"
                cancelLabel="取消"
                onChange={this.onDateChange}
                formatDate={new DateTimeFormat('zh', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).format}
              />
              <IconButton onTouchTap={this.onClickNext}><RightIcon color={cyan800} /></IconButton>
            </ToolbarGroup>
            <ToolbarGroup >
              {/*<IconButton onTouchTap={this.onClickNote} style={{ marginRight: '-10px' }}><Note color={cyan800} /></IconButton>*/}
              <Logged
                onClickAddPath={this.onClickAddPath.bind(this)}
                onClickAddTmp={this.onClickAddTmp.bind(this)}
                onClickAddCall={this.onClickAddCall.bind(this)}
                onClickAddCheck={this.onClickAddCheck.bind(this)}
              />
            </ToolbarGroup>
          </Toolbar>
        </Paper>

        <div style={{ top: config.contentLargeTop }} className={styles.content}>
          <Spin size="large" tip="正在加载，请稍后" spinning={this.state.loading}>
            {this.getPlanlist()}
          </Spin>
        </div>

        {isToday ? <FloatingActionButton style={{
          position: 'absolute',
          bottom: '15px',
          right: '25px',
        }}
          onTouchTap={this.onClickExpense}
          secondary={!isExpense}
        >
          {isExpense ? <DoneIcon /> : <EditIcon />}
        </FloatingActionButton> : null}
        <Dialog
          title="确定要删除计划吗？"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          该计划删除后，与该计划相关的数据将同时删除，后台无法查看到你本次计划的实际情况，请谨慎操作！
        </Dialog>
      </div>
    );
  }
}

export default Home;