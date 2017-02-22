import React from 'react';
import styles from './home.less';
import { message } from 'antd';


import { Spin } from 'antd';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';


import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';

class SelectPath extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: Store.getPath(),
      loading: true,
      checkedId: '',
      tipText: '正在加载，请稍后'
    };
    this.onPathChange = this.onPathChange.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onClickOk = this.onClickOk.bind(this);
    this.onPlanChange = this.onPlanChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_PATH, this.onPathChange);
    Store.addChangeListener(StoreEvent.SE_PLAN, this.onPlanChange);
    if (this.state.path.length <= 0) {
      Action.getPath({
        userid: localStorage.username
      });
    } else {
      this.setState({
        loading: false,
      })
    }
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_PATH, this.onPathChange);
    Store.removeChangeListener(StoreEvent.SE_PLAN, this.onPlanChange);
  }
  onCheckChange(id, isInputChecked) {
    if (isInputChecked) {
      this.setState({ checkedId: id });
    } else {
      this.setState({ checkedId: '' });
    }
  }
  onPathChange() {
    this.setState({
      path: Store.getPath(),
      loading: false,
    })
  }
  onPlanChange(){
    Store.emit(StoreEvent.SE_VIEW,'',this.props.userdata);
  }
  getPathlist() {
    var context = this;
    var domlist = [];
    this.state.path.forEach((sb) => {
      if (!sb) return;
      var pathDetail = Store.getPathDetail(sb.Path_id);
      var detailText = pathDetail.join('->');
      domlist.push(<ListItem
        id={sb.Path_id}
        primaryText={sb.Path_name}
        secondaryText={detailText}
        secondaryTextLines = {2}
        leftCheckbox={<Checkbox
          onCheck={function (e, checked) { context.onCheckChange(sb.Path_id, checked) } }
          checked={context.state.checkedId == sb.Path_id} />}
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
      message.info('请选择路线');
      return;
    }
    this.setState({
      loading: true,
      tipText: '正在创建拜访计划，请稍后',
    })
    var pathDetail = Store.getPathDetail(this.state.checkedId);
    var detailText = pathDetail.join('->');
    Action.addPlan({
      Plan_Type: 1,
      Plan_Date: this.props.userdata.Format('yyyy-MM-dd'),
      Path_Id: this.state.checkedId,
      Store_Name: detailText,
      User_Id: localStorage.username,
    });
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          title='选择路线'
          onLeftIconButtonTouchTap={this.onClickBack}
          onRightIconButtonTouchTap={this.onClickOk}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton label="确定" />}
          />
        <div className={[styles.content, styles.content_notoolbar].join(' ') }>
          <Spin size="large" tip={this.state.tipText} spinning={this.state.loading}>
            <List>
              {this.getPathlist() }
            </List>
          </Spin>
        </div>
      </div>
    );
  }
}

export default SelectPath;