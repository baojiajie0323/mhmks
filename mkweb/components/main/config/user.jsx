import React from 'react';
import { Table } from 'antd';
import styles from './config.less';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: Store.getUser(),
    };
    this.onUserChange = this.onUserChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Action.getUser();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_USER, this.onUserChange);
  }
  onUserChange() {
    this.setState({
      user: Store.getUser(),
      loading:false
    })
  }
  getTableColumn() {
    return [{
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '姓名',
      dataIndex: 'realname',
      key: 'realname',
    }, {
      title: '部门',
      dataIndex: 'depart',
      key: 'depart',
    }, {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    }, {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '稽查',
      dataIndex: 'check',
      key: 'check',
      render : (text,record) => (<span>{text == 1? '是':'否'}</span>), 
    }, {
      title: '后台状态',
      dataIndex: 'enableweb',
      key: 'enableweb',
      render : (text,record) => (<span>{text == 1? '启用':'不启用'}</span>), 
    }, {
      title: 'APP状态',
      dataIndex: 'enableapp',
      key: 'enableapp',
      render : (text,record) => (<span>{text == 1? '启用':'不启用'}</span>), 
    }];
  }
  getTableData() {
    this.state.user.forEach((sa, i) => {
      sa.key = i.toString();
    })
    return this.state.user;
  }
  render() {
    return (
      <div className={styles.configcontent}>
        <p className={styles.configtitle}>用户</p>
        <div className={styles.configtable}>
          <Table loading={this.state.loading} bordered
            columns={this.getTableColumn()} dataSource={this.getTableData()} />
        </div>
      </div>
    );
  }
}

export default User;