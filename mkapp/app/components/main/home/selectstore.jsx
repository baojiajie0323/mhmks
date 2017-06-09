import React from 'react';
import styles from './home.less';


import { Spin, message, Input, Icon } from 'antd';
const Search = Input.Search;
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import config from '../../config';
import ContentInbox from 'material-ui/svg-icons/content/inbox';


import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import StoreIcon from 'material-ui/svg-icons/action/store';

class SelectStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeBasic: Store.getStoreBasic(),
      loading: true,
      checkedId: '',
      tipText: '正在加载，请稍后',
      searchText: '',
    };
    this.loading = false;
    this.onStoreBasicChange = this.onStoreBasicChange.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onClickOk = this.onClickOk.bind(this);
    this.onPlanChange = this.onPlanChange.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.cancelSearch = this.cancelSearch.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_STOREBASIC, this.onStoreBasicChange);
    Store.addChangeListener(StoreEvent.SE_PLAN, this.onPlanChange);
    if (this.state.storeBasic.length <= 0) {
      var userInfo = Store.getUserInfo();
      if (userInfo.userid == userInfo.id) {
        //用户为区域主管
        Action.getStoreBasic({
          depart: userInfo.depart
        });
      } else {
        Action.getStoreBasic({
          username: localStorage.username
        });
      }
    } else {
      this.setState({
        loading: false,
      })
    }
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_STOREBASIC, this.onStoreBasicChange);
    Store.removeChangeListener(StoreEvent.SE_PLAN, this.onPlanChange);
  }
  onCheckChange(id, isInputChecked) {
    if (isInputChecked) {
      this.setState({ checkedId: id });
    } else {
      this.setState({ checkedId: '' });
    }
  }
  onStoreBasicChange() {
    this.loading = false;
    this.setState({
      storeBasic: Store.getStoreBasic(),
      loading: false,
    })
  }
  onPlanChange() {
    Store.emit(StoreEvent.SE_VIEW, '');
  }
  onSearchChange(e) {
    this.setState({
      searchText: e.target.value
    })
  }
  cancelSearch() {
    this.setState({
      searchText: ""
    })
  }
  getStorelist() {
    var context = this;
    var searchText = this.state.searchText;
    var mystorelist = [];
    var otherstorelist = {};
    var userInfo = Store.getUserInfo();
    this.state.storeBasic.forEach((sb) => {
      if (searchText != "") {
        if (sb.Store_name.indexOf(searchText) < 0) {
          return;
        }
      }
      if (sb.realname == userInfo.realname) {
        mystorelist.push(<ListItem
          disableTouchRipple={true}
          id={sb.Store_id}
          primaryText={sb.Store_name}
          leftCheckbox={<Checkbox
            onCheck={function (e, checked) { context.onCheckChange(sb.Store_id, checked) } }
            checked={context.state.checkedId == sb.Store_id} />}
          />);
        mystorelist.push(<Divider />);
      } else {
        if (!otherstorelist.hasOwnProperty(sb.realname)) {
          otherstorelist[sb.realname] = [];
        }
        otherstorelist[sb.realname].push(<ListItem
          disableTouchRipple={true}
          id={sb.Store_id}
          primaryText={sb.Store_name}
          leftCheckbox={<Checkbox
            onCheck={function (e, checked) { context.onCheckChange(sb.Store_id, checked) } }
            checked={context.state.checkedId == sb.Store_id} />}
          />);
        otherstorelist[sb.realname].push(<Divider />);
      }
    })

    var dom = [<ListItem
      disableTouchRipple={true}
      primaryText="我的门店"
      initiallyOpen={true}
      primaryTogglesNestedList={true}
      nestedItems={mystorelist}
      />];

    console.log('otherstorelist', otherstorelist);
    for (var realname in otherstorelist) {
      dom.push(<ListItem
        disableTouchRipple={true}
        primaryText={realname + "的门店"}
        initiallyOpen={true}
        primaryTogglesNestedList={true}
        nestedItems={otherstorelist[realname]}
        />)
    }
    return dom;
  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, '');
  }
  onClickOk() {
    if (this.state.checkedId == "") {
      message.info('请选择门店');
      return;
    }
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.setState({
      loading: true,
      tipText: '正在创建拜访计划，请稍后',
    })
    var storeInfo = Store.getStoreById(this.state.checkedId);
    var curDate = Store.getCurDate();
    Action.addPlan({
      plan_type: 2,
      year: curDate.getFullYear(),
      month: curDate.getMonth() + 1,
      day: curDate.getDate(),
      store_id: storeInfo.Store_id,
      user_id: localStorage.username,
    });
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          style={{ paddingTop: config.titlebarPadding }}
          title='选择门店'
          onLeftIconButtonTouchTap={this.onClickBack}
          onRightIconButtonTouchTap={this.onClickOk}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton label="确定" />}
          />
        <div style={{ top: config.contentTop }} className={styles.content}>
          <Spin size="large" tip={this.state.tipText} spinning={this.state.loading}>
            <div className={styles.searchcontent}>
              <Input
                value={this.state.searchText}
                placeholder="输入关键字"
                style={{ flexGrow: 1, fontSize: "14px", paddingLeft: '15px' }}
                size="large"
                onChange={this.onSearchChange}
                />
              {this.state.searchText == "" ? null :
                <a style={{ padding: '0 10px', fontSize: '14px', width: '60px' }} onClick={this.cancelSearch} >取消</a>
              }
            </div>
            <List>
              {this.getStorelist()}
            </List>
          </Spin>
        </div>
      </div>
    );
  }
}

export default SelectStore;