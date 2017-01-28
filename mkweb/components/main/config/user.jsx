import React from 'react';
import { Table, Button, Icon, Modal, Input, Popconfirm} from 'antd';
import styles from './config.less';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: Store.getUser(),
      visible: false,
    };
    this.onUserChange = this.onUserChange.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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
      loading: false
    })
  }
  onClickAdd() {
    this.setState({ visible: true })
  }
  onClickEdit() {
    this.setState({ visible: true })
  }
  handleOk() {
    
  }
  handleCancel() {
    this.setState({ visible: false })
  }
  onClickDeleteUser(){

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
        render: (text, record) => (<span>{text == 1 ? '是' : '否'}</span>),
      }, {
        title: '操作',
        key: 'operate',
        render: (text, record) => (<div className={styles.operatecontent}>
          <a onClick={this.onClickEdit}><Icon type="edit" /></a>
          <Popconfirm title="确定要删除这条记录吗?" onConfirm={this.onClickDeleteUser}>
            <a><Icon type="delete" /></a>
          </Popconfirm>
          </div>),
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
        <div className={styles.addcontent}>
          <Button onClick={this.onClickAdd} type="primary" icon="plus">新用户</Button>
        </div>
        <div className={styles.configtable}>
          <Table loading={this.state.loading} bordered
            columns={this.getTableColumn() } dataSource={this.getTableData() } />
        </div>
        <Modal width={420} title="新用户" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
          >
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>用户名</span>
            <div className={styles.form}>
              <Input placeholder="请输入用户名" />
            </div>
            <span className={styles.formstar}>*</span>
          </div>
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>密码</span>
            <div className={styles.form}>
              <Input type="password" placeholder="请输入密码" />
            </div>
            <span className={styles.formstar}>*</span>
          </div>
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>确认密码</span>
            <div className={styles.form}>
              <Input placeholder="请再次输入密码" />
            </div>
            <span className={styles.formstar}>*</span>
          </div>
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>电话</span>
            <div className={styles.form}>
              <Input placeholder="请输入电话" />
            </div>
          </div>
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>邮箱</span>
            <div className={styles.form}>
              <Input placeholder="请输入邮箱" />
            </div>
          </div>
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>部门</span>
            <div className={styles.form}>
              <Input placeholder="请选择部门" />
            </div>
            <span className={styles.formstar}>*</span>
          </div>
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>角色</span>
            <div className={styles.form}>
              <Input placeholder="请选择角色" />
            </div>
            <span className={styles.formstar}>*</span>
          </div>
        </Modal>
      </div>
    );
  }
}

export default User;