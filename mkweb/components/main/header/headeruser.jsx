import React from 'react';
import styles from './header.less';
import {Icon,Popconfirm,Button} from 'antd';

class HeaderUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onClickLogout = this.onClickLogout.bind(this);
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  onClickLogout(){
    Action.logout();
  }
  render() {
    return (
      <div className={styles.headeruser}>
        <Icon style={{marginRight:'15px'}} type="user" />
        <span style={{marginRight:'10px'}} >鲍嘉捷</span>
        <span style={{  fontSize: '12px', color: 'rgb(215, 215, 215)'}} > 系统管理员</span>
        <Popconfirm placement="bottomRight" title="  确定要注销吗？  " onConfirm={this.onClickLogout} >
        <div className={styles.headerlogout}>
          <Icon style={{marginRight:'5px'}} type="poweroff" />
        注销登录
        </div>
        </Popconfirm>
      </div>
    );
  }
}

export default HeaderUser;