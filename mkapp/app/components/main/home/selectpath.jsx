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

class SelectPath extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: Store.getPath(),
      loading: true,
      checkedId: '',
    };
    this.onPathChange = this.onPathChange.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_PATH, this.onPathChange);
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
    Store.emit(StoreEvent.SE_VIEW, '');
  }
  onCurPlanListChange() {
    Store.emit(StoreEvent.SE_VIEW, '');
  }
  onClickOk() {
    Action.addPlan({});
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
        <Spin size="large" tip="正在加载，请稍后" spinning={this.state.loading}>
          <div className={[styles.content, styles.content_notoolbar].join(' ') }>
            <List>
              {this.getPathlist() }
            </List>
          </div>
        </Spin>
      </div>
    );
  }
}

export default SelectPath;