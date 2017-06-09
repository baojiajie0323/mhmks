import React from 'react';
import styles from './contacts.less';
import { Spin } from 'antd';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { cyan600 } from 'material-ui/styles/colors';
import config from '../../config';

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Store.getUser(),
      loading: true,
    };
    this.onUserChange = this.onUserChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_USER, this.onUserChange);
    if (this.state.user.length <= 0) {
      Action.getUser();
    } else {
      this.setState({
        loading: false,
      })
    }
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_USER, this.onUserChange);
  }
  onUserChange() {
    this.setState({
      user: Store.getUser(),
      loading: false,
    })
  }
  getContactsDom() {
    var domlist = [];
    this.state.user.forEach((user) => {
      if (user.phone && user.phone != "") {
        domlist.push(<a href={'tel:' + user.phone}>
          <ListItem
            disableTouchRipple={true}
            primaryText={user.realname}
            rightIcon={<PhoneIcon color={cyan600} />}
            />
        </a>);
        domlist.push(<Divider />);
      }
    })
    return domlist;
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          style={{ paddingTop: config.titlebarPadding }}
          title='通讯录'
          iconElementLeft={<span></span>}
          />
        <div style={{ top: config.contentTop }} className={styles.content}>

          <Spin size="large" tip="正在加载，请稍后" spinning={this.state.loading}>
            <List>
              {this.getContactsDom()}
            </List>
          </Spin>
        </div>
      </div >
    );
  }
}

export default Contacts;