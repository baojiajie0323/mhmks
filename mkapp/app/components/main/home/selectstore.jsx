import React from 'react';
import styles from './home.less';


import { Spin } from 'antd';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';


import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import StoreIcon from 'material-ui/svg-icons/action/store';

class SelectStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeBasic: Store.getStoreBasic(),
      loading: true,
    };
    this.onStoreBasicChange = this.onStoreBasicChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_STOREBASIC, this.onStoreBasicChange);
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
  }
  onStoreBasicChange() {
    this.setState({
      storeBasic: Store.getStoreBasic(),
      loading: false,
    })
  }

  getStorelist() {
    var context = this;
    return this.state.storeBasic.map((sb) => {
      domlist.push(<ListItem
        id={sb.Store_id}
        primaryText={sb.Store_name}
        leftCheckbox={<Checkbox />}
        />);
      domlist.push(<Divider />);
    })
  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, '');
  }
  onClickOk() {
    Store.emit(StoreEvent.SE_VIEW, '');
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
        <Spin size="large" tip="正在加载，请稍后" spinning={this.state.loading}>
          <div className={[styles.content, styles.content_notoolbar].join(' ')}>
            <List>
              {this.getStorelist()}
            </List>
          </div>
        </Spin>
      </div>
    );
  }
}

export default SelectStore;