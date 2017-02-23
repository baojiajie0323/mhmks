import React from 'react';
import styles from './home.less';


import { Spin } from 'antd';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';


import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import StoreIcon from 'material-ui/svg-icons/action/store';

class SelectStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeBasic: Store.getStoreBasic(),
      loading: true,
      checkedId: '',
      tipText: '正在加载，请稍后'
    };
    this.onStoreBasicChange = this.onStoreBasicChange.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onClickOk = this.onClickOk.bind(this);
    this.onPlanChange = this.onPlanChange.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_STOREBASIC, this.onStoreBasicChange);
    Store.addChangeListener(StoreEvent.SE_PLAN, this.onPlanChange);
    if (this.state.storeBasic.length <= 0) {
      Action.getStoreBasic({
        username: localStorage.username
      });
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
    this.setState({
      storeBasic: Store.getStoreBasic(),
      loading: false,
    })
  }
  onPlanChange(){
    Store.emit(StoreEvent.SE_VIEW,'',this.props.userdata);
  }
  getStorelist() {
    var context = this;
    var domlist = [];
    this.state.storeBasic.forEach((sb) => {
      domlist.push(<ListItem
        id={sb.Store_id}
        primaryText={sb.Store_name}
        leftCheckbox={<Checkbox
          onCheck={function (e, checked) { context.onCheckChange(sb.Store_id, checked) } }
          checked={context.state.checkedId == sb.Store_id} />}
        />);
      domlist.push(<Divider />);
    })
    return domlist;
  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, '',this.props.userdata);
  }
  onClickOk() {
    if (this.state.checkedId == "") {
      message.info('请选择门店');
      return;
    }
    this.setState({
      loading: true,
      tipText: '正在创建拜访计划，请稍后',
    })
    var storeInfo = Store.getStoreById(this.state.checkedId);
  
    Action.addPlan({
      Plan_Type: 2,
      Plan_Date: this.props.userdata.Format('yyyy-MM-dd'),
      Store_Id:storeInfo.Store_id,
      Store_Name: storeInfo.Store_name,
      User_Id: localStorage.username,
    });
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          title='选择门店'
          onLeftIconButtonTouchTap={this.onClickBack}
          onRightIconButtonTouchTap={this.onClickOk}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton label="确定" />}
          />
        <div className={[styles.content, styles.content_notoolbar].join(' ') }>
          <Spin size="large" tip="正在加载，请稍后" spinning={this.state.loading}>
            <List>
              {this.getStorelist() }
            </List>
          </Spin>
        </div>
      </div>
    );
  }
}

export default SelectStore;