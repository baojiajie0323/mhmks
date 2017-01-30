import React from 'react';
import { Tree, Button, Icon, Modal, Input, Select, message } from 'antd';
import styles from './config.less';
const TreeNode = Tree.TreeNode;
const Option = Select.Option;
const confirm = Modal.confirm;

class Department extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      department: Store.getDepartment(),
      user: Store.getUser(),
      departname: '',
      uservalue: '',
      visible: false,
    };
    this.selectedkeys = '0';
    this.onUserChange = this.onUserChange.bind(this);
    this.onDepartmentChange = this.onDepartmentChange.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickDeleteDepartment = this.onClickDeleteDepartment.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onDepartnameChange = this.onDepartnameChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_DEPARTMENT, this.onDepartmentChange);
    Store.addChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Action.getDepartment();
    Action.getUser();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_USER, this.onUserChange);
    Store.removeChangeListener(StoreEvent.SE_DEPARTMENT, this.onDepartmentChange);
  }
  onUserChange() {
    this.setState({
      user: Store.getUser()
    })
  }
  onDepartmentChange() {
    this.setState({
      department: Store.getDepartment(),
      loading: false,
      visible: false,
    })
  }
  onDepartnameChange(e) {
    this.setState({
      departname: e.target.value
    })
  }
  onClickAdd() {
    this.modaltype = 'add';
    this.setState({
      departname: '',
      uservalue: '',
      visible: true
    })
  }
  onClickEdit() {
    console.log(this.selectedkeys);
    if (this.selectedkeys == '0') {
      message.info('请选择部门');
      return;
    }
    this.modaltype = 'mod';
    this.setState({
      departname: '',
      uservalue: '',
      visible: true,
    })
  }
  handleOk() {
    if (this.modaltype == 'add') {
      var data = {
        name: this.state.departname,
        userid: this.state.uservalue,
        parentid: this.selectedkeys
      }
      console.log('addmode', data);
      Action.addDepartment(data);
    } else if (this.modaltype == 'mod') {
      var data = {
        name: this.state.departname,
        userid: this.state.uservalue,
        id: this.selectedkeys,
      }
      console.log('modmode', data);
      Action.modDepartment(data);
    }
  }
  handleCancel() {
    this.setState({ visible: false })
  }
  onClickDeleteDepartment() {
    if (this.selectedkeys == '0') {
      message.info('请选择部门');
      return;
    }
    var data = {
      id: this.selectedkeys
    }
    confirm({
      title: '确定要删除该部门吗？',
      onOk() {
        Action.delDepartment(data);
      },
    });
  }
  onSelect(info) {
    if (info.length > 0) {
      this.selectedkeys = info[0];
    } else {
      this.selectedkeys = '0';
    }
  }
  getUserInfo(userid) {
    for (var i = 0; i < this.state.user.length; i++) {
      if (this.state.user[i].id == userid) {
        return this.state.user[i];
      }
    }
    return null;
  }
  getChildTreeNode(parentId) {
    var childNode = [];
    var department = this.state.department;
    var context = this;
    department.forEach(function (depart) {
      if (depart.parentid == parentId) {
        var titlename = depart.name;
        if (depart.userid) {
          var userInfo = context.getUserInfo(depart.userid);
          var username = userInfo.realname;
          titlename = titlename + '[' + username + ']'
        }
        var treenode = <TreeNode title={titlename} key={depart.id.toString() }>
          {context.getChildTreeNode(depart.id) }
        </TreeNode>
        childNode.push(treenode);
      }
    })
    return childNode.length > 0 ? childNode : null;
  }
  getTreeNode() {
    var childTreeNode = this.getChildTreeNode(0);
    return <TreeNode title="上海满好日用品有限公司" key="0">
      {childTreeNode}
    </TreeNode>
  }
  handleUserChange(value) {
    this.setState({ uservalue: value })
  }
  getUserOption() {
    return this.state.user.map((u) => {
      return <Option value={u.id.toString() }>{u.realname}</Option>
    })
  }
  render() {
    return (
      <div className={styles.configcontent}>
        <p className={styles.configtitle}>部门</p>
        <div className={styles.editcontent}>
          <Button style={{ marginRight: '5px' }} onClick={this.onClickAdd} type="primary" icon="plus">创建子部门</Button>
          <Button style={{ marginRight: '5px' }} onClick={this.onClickEdit} type="ghost" icon="edit">编辑部门</Button>
          <Button style={{ marginRight: '5px' }} onClick={this.onClickDeleteDepartment} type="ghost" icon="delete">删除部门</Button>
        </div>
        <div className={styles.configtable}>
          {this.state.department.length > 0 ? <Tree onSelect={this.onSelect} defaultSelectedKeys='0' defaultExpandAll={true} >
            {this.getTreeNode() }
          </Tree> : null
          }
        </div>
        <Modal width={420} title="新部门" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
          >
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>名称</span>
            <div className={styles.form}>
              <Input value={this.state.departname} onChange={this.onDepartnameChange} placeholder="请输入名称" />
            </div>
            <span className={styles.formstar}>*</span>
          </div>
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>负责人</span>
            <div className={styles.form}>
              <Select style={{ width: '100%' }} value={this.state.uservalue} onChange={this.handleUserChange}>
                {this.getUserOption() }
              </Select>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Department;