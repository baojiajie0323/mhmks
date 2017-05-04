import React from 'react';
import { Table, Button, Icon, Modal, Input, Tree, Popconfirm, message} from 'antd';
import styles from './config.less';
const TreeNode = Tree.TreeNode;

class Role extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      permissontype: Store.getPermissonType(),
      role: Store.getRole(),
      visible: false,
      rolename: '',
      permissonvalue: [],
    };
    this.onClickAdd = this.onClickAdd.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onRoleChange = this.onRoleChange.bind(this);
    this.onPermissonTypeChange = this.onPermissonTypeChange.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickDeleteRole = this.onClickDeleteRole.bind(this);

    this.onRolenameChange = this.onRolenameChange.bind(this);
    this.onPermissonValueChange = this.onPermissonValueChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_ROLE, this.onRoleChange);
    Store.addChangeListener(StoreEvent.SE_PERMISSONTYPE, this.onPermissonTypeChange);
    Action.getRole();
    Action.getPermissonType();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_ROLE, this.onRoleChange);
    Store.removeChangeListener(StoreEvent.SE_PERMISSONTYPE, this.onPermissonTypeChange);
  }
  onDepartnameChange() {
    this.setState({
      department: Store.getDepartment()
    })
  }
  onRoleChange() {
    this.setState({
      role: Store.getRole(),
      visible: false,
      loading: false
    })
  }
  onPermissonTypeChange() {
    this.setState({
      permissontype: Store.getPermissonType(),
    })
  }
  onRolenameChange(e) {
    this.setState({
      rolename: e.target.value
    })
  }
  onPermissonValueChange(value){
    this.setState({
      permissonvalue:value
    })
  }
  onClickAdd() {
    this.modaltype = 'add';
    this.setState({
      rolename: '',
      permissonvalue: [],
      visible: true
    })
  }
  onClickEdit(e) {
    var id = e.currentTarget.dataset.id;
    this.selectedkeys = id;
    var roleInfo = Store.getRolebyId(id);
    console.log('test1',roleInfo);
    this.modaltype = 'mod';
    this.setState({
      rolename: roleInfo.name,
      permissonvalue: JSON.parse(roleInfo.permisson),
      visible: true
    })
  }
  handleOk() {
    var data = {
      name: this.state.rolename,
      permisson: JSON.stringify(this.state.permissonvalue),
    }
    if (this.modaltype == 'add') {
      console.log('addmode', data);
      Action.addRole(data);
    } else if (this.modaltype == 'mod') {
      data.id = this.selectedkeys;
      console.log('modmode', data);
      Action.modRole(data);
    }
  }
  handleCancel() {
    this.setState({ visible: false })
  }
  onClickDeleteRole(id) {
    var data = {
      id: id
    }
    Action.delRole(data);
  }
  getTableColumn() {
    var context = this;
    return [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
        title: '操作',
        key: 'operate',
        render: function (text, record) {
          return (<div className={styles.operatecontent}>
            <a data-id={record.id} onClick={context.onClickEdit}><Icon type="edit" /></a>
            <Popconfirm title="确定要删除这条记录吗?" onConfirm={function () { context.onClickDeleteRole(record.id) } }>
              <a><Icon type="delete" /></a>
            </Popconfirm>
          </div>)
        },
      }];
  }
  getTableData() {
    this.state.role.forEach((sa, i) => {
      sa.key = i.toString();
    })
    return this.state.role;
  }
  getChildTreeNode(parentId) {
    var childNode = [];
    var permissontype = this.state.permissontype;
    var context = this;
    permissontype.forEach(function (permisson) {
      if (permisson.parentid == parentId) {
        var treenode = <TreeNode title={permisson.name} key={permisson.permissonid.toString() }>
          {context.getChildTreeNode(permisson.id) }
        </TreeNode>
        childNode.push(treenode);
      }
    })
    return childNode.length > 0 ? childNode : null;
  }
  getTreeNode() {
    var childTreeNode = this.getChildTreeNode(0);
    return <TreeNode title="所有权限" key="0">
      {childTreeNode}
    </TreeNode>
  }
  render() {
    return (
      <div className={styles.configcontent}>
        <p className={styles.configtitle}>角色</p>
        <div className={styles.addcontent}>
          <Button onClick={this.onClickAdd} type="primary" icon="plus">新角色</Button>
        </div>
        <div className={styles.configtable}>
          <Table size="small" loading={this.state.loading} bordered
            columns={this.getTableColumn() } dataSource={this.getTableData() } />
        </div>
        <Modal width={420} title={this.modaltype == 'add' ? '创建角色' : '修改角色'} visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
          >
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>角色名</span>
            <div className={styles.form}>
              <Input value={this.state.rolename} onChange={this.onRolenameChange} placeholder="请输入角色名" />
            </div>
            <span className={styles.formstar}>*</span>
          </div>
          <div className={[styles.formcontent,styles.formtreecontent].join(' ')}>
            <span className={styles.formtitle}>权限</span>
            <div className={styles.form}>
              <Tree checkable checkStrictly onCheck={this.onPermissonValueChange} checkedKeys={this.state.permissonvalue} defaultExpandAll={true} >
                {this.getTreeNode() }
              </Tree>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Role;