import React from 'react';
import { Tree, Button, Icon, Modal, Input, Select} from 'antd';
import styles from './config.less';
const TreeNode = Tree.TreeNode;

class Department extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      department: Store.getDepartment(),
      user: Store.getUser(),
      departname: '',
      visible: false,
    };
    this.selectedkeys = '0';
    this.onUserChange = this.onUserChange.bind(this);
    this.onDepartmentChange = this.onDepartmentChange.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onDepartnameChange = this.onDepartnameChange.bind(this);
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
      loading: false
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
      准备些用户OPTION
      visible: true
    })
  }
  onClickEdit() {
    this.modaltype = 'mod';
    this.setState({ visible: true})
  }
  handleOk() {
    if(this.modaltype == 'add'){

    }
  }
  handleCancel() {
    this.setState({ visible: false })
  }
  onClickDeleteDepartment() {

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
  handleUserChange() {

  }
  getUserOption() {
    return this.state.user.map((u) => {
      return <Option value={u.id}>{u.realname}</Option>
    })
  }
  render() {
    return (
      <div className={styles.configcontent}>
        <p className={styles.configtitle}>部门</p>
        <div className={styles.editcontent}>
          <Button style={{ marginRight: '5px' }} onClick={this.onClickAdd} type="primary" icon="plus">创建子部门</Button>
          <Button style={{ marginRight: '5px' }} onClick={this.onClickAdd} type="ghost" icon="edit">编辑部门</Button>
          <Button style={{ marginRight: '5px' }} onClick={this.onClickAdd} type="ghost" icon="delete">删除部门</Button>
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
              <Select style={{ width: '100%' }} onChange={this.handleUserChange}>
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