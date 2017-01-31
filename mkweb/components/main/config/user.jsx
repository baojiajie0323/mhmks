import React from 'react';
import { Table, Button, Icon, Modal, Input, Popconfirm, Select, message} from 'antd';
import styles from './config.less';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      department: Store.getDepartment(),
      user: Store.getUser(),
      visible: false,

      username: '',
      password: '',
      password_cfm: '',
      realname: '',
      phone: '',
      email: '',
      departvalue: ''
    };
    this.onUserChange = this.onUserChange.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onDepartnameChange = this.onDepartnameChange.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickDeleteUser = this.onClickDeleteUser.bind(this);

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPasswordCfmChange = this.onPasswordCfmChange.bind(this);
    this.onRealnameChange = this.onRealnameChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.handleDepartChange = this.handleDepartChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Store.addChangeListener(StoreEvent.SE_DEPARTMENT, this.onDepartnameChange);
    Action.getUser();
    Action.getDepartment();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Store.removeChangeListener(StoreEvent.SE_DEPARTMENT, this.onDepartnameChange);
  }
  onDepartnameChange() {
    this.setState({
      department: Store.getDepartment()
    })
  }
  onUserChange() {
    this.setState({
      user: Store.getUser(),
      visible: false,
      loading: false
    })
  }
  onUsernameChange(e) {
    this.setState({
      username: e.target.value
    })
  }
  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }
  onPasswordCfmChange(e) {
    this.setState({
      password_cfm: e.target.value
    })
  }
  onRealnameChange(e) {
    this.setState({
      realname: e.target.value
    })
  }
  onPhoneChange(e) {
    this.setState({
      phone: e.target.value
    })
  }
  onEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }
  onClickAdd() {
    this.modaltype = 'add';
    this.setState({
      username: '',
      password: '',
      password_cfm: '',
      realname: '',
      phone: '',
      email: '',
      departvalue: '',
      visible: true
    })
  }
  onClickEdit(e) {
    var id = e.currentTarget.dataset.id;
    this.selectedkeys = id;
    var userInfo = Store.getUserbyId(id);
    this.modaltype = 'mod';
    this.setState({
      username: userInfo.username,
      password: userInfo.password,
      password_cfm: userInfo.password,
      realname: userInfo.realname,
      phone: userInfo.phone,
      email: userInfo.email,
      departvalue: userInfo.depart?userInfo.depart.toString():"",
      visible: true
    })
  }
  handleOk() {
    if(this.state.password !== this.state.password_cfm){
      message.info('2次密码不一致');
      return;
    }
    var data = {
      username: this.state.username,
      password: this.state.password,
      realname: this.state.realname,
      phone: this.state.phone,
      email: this.state.email,
      depart: this.state.departvalue,
    }
    if (this.modaltype == 'add') {
      console.log('addmode', data);
      Action.addUser(data);
    } else if (this.modaltype == 'mod') {
      data.id = this.selectedkeys;
      console.log('modmode', data);
      Action.modUser(data);
    }
  }
  handleCancel() {
    this.setState({ visible: false })
  }
  onClickDeleteUser(id) {
    var data = {
      id: id
    }
    Action.delUser(data);
  }
  getTableColumn() {
    var context = this;
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
        render: function (text, record) {
          var depart = Store.getDepartmentbyId(text);
          return (<span>{depart?depart.name:''}</span>)
        } 
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
        //   title: '稽查',
        //   dataIndex: 'check',
        //   key: 'check',
        //   render: (text, record) => (<span>{text == 1 ? '是' : '否'}</span>),
        // }, {
        title: '操作',
        key: 'operate',
        render: function(text, record) {
           return (<div className={styles.operatecontent}>
          <a data-id={record.id} onClick={context.onClickEdit}><Icon type="edit" /></a>
          <Popconfirm title="确定要删除这条记录吗?" onConfirm={function(){context.onClickDeleteUser(record.id)}}>
            <a><Icon type="delete" /></a>
          </Popconfirm>
        </div>)
        },
      }];
  }
  getTableData() {
    this.state.user.forEach((sa, i) => {
      sa.key = i.toString();
    })
    return this.state.user;
  }
  handleDepartChange(value) {
    this.setState({ departvalue: value })
  }
  getDepartOption() {
    return this.state.department.map((u) => {
      return <Option value={u.id.toString() }>{u.name}</Option>
    })
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
        <Modal width={420} title={this.modaltype == 'add' ? '创建用户' : '修改用户'} visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
          >
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>用户名</span>
            <div className={styles.form}>
              <Input value={this.state.username} onChange={this.onUsernameChange} placeholder="请输入用户名" />
            </div>
            <span className={styles.formstar}>*</span>
          </div>
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>密码</span>
            <div className={styles.form}>
              <Input value={this.state.password} onChange={this.onPasswordChange} type="password" placeholder="请输入密码" />
            </div>
            <span className={styles.formstar}>*</span>
          </div>
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>确认密码</span>
            <div className={styles.form}>
              <Input value={this.state.password_cfm} onChange={this.onPasswordCfmChange} type="password" placeholder="请再次输入密码" />
            </div>
            <span className={styles.formstar}>*</span>
          </div>
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>姓名</span>
            <div className={styles.form}>
              <Input value={this.state.realname} onChange={this.onRealnameChange} placeholder="请输入姓名" />
            </div>
            <span className={styles.formstar}>*</span>
          </div>
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>电话</span>
            <div className={styles.form}>
              <Input value={this.state.phone} onChange={this.onPhoneChange} placeholder="请输入电话" />
            </div>
          </div>
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>邮箱</span>
            <div className={styles.form}>
              <Input value={this.state.email} onChange={this.onEmailChange} placeholder="请输入邮箱" />
            </div>
          </div>
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>部门</span>
            <div className={styles.form}>
              <Select style={{ width: '100%' }} value={this.state.departvalue} onChange={this.handleDepartChange}>
                {this.getDepartOption() }
              </Select>
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