import React from 'react';
import styles from './store.less';
import AppBar from 'material-ui/AppBar';
import { Spin } from 'antd';
import { List, ListItem } from 'material-ui/List';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { cyan600 } from 'material-ui/styles/colors';

class StoreView extends React.Component {
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
  onClickStore(id) {
    console.log(id);
    Store.emit(StoreEvent.SE_VIEW, 'storedetailview', id);
  }
  getStoreDom() {
    var domlist = [];
    var context = this;
    this.state.storeBasic.forEach((sb) => {
      domlist.push(<ListItem
        id={sb.Store_id}
        primaryText={sb.Store_name}
        rightIcon={<RightIcon color={cyan600} />}
        onTouchTap={function () { context.onClickStore(sb.Store_id) } }
        />);
      domlist.push(<Divider />);
    })
    return domlist;
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          title='门店'
          iconElementLeft={<span></span>}
          />
        <Spin size="large" tip="正在加载，请稍后" spinning={this.state.loading}>
          <div className={styles.content}>
            <List>
              {this.getStoreDom() }
            </List>
          </div>
        </Spin>
      </div>
    );
  }
}

export default StoreView;