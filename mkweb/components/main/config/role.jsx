import React from 'react';
import { Table, Button, Icon, Modal, Input, Tree, Popconfirm, message, Select } from 'antd';
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
    this.handleLevelChange = this.handleLevelChange.bind(this);
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
  onPermissonValueChange(value) {
    this.setState({
      permissonvalue: value
    })
  }
  getLevelOption() {
    var level = ["一职等","二职等","三职等","四职等","五职等"]
    return level.map((u) => {
      return <Option value={u}>{u}</Option>
    })
  }
  handleLevelChange(value) {
    this.setState({ level: value })
  }
  onClickAdd() {
    this.modaltype = 'add';
    this.setState({
      rolename: '',
      level: '',
      permissonvalue: [],
      visible: true
    })
  }
  onClickEdit(e) {
    var id = e.currentTarget.dataset.id;
    this.selectedkeys = id;
    var roleInfo = Store.getRolebyId(id);
    this.modaltype = 'mod';
    this.setState({
      rolename: roleInfo.name,
      level: roleInfo.level,
      permissonvalue: JSON.parse(roleInfo.permisson),
      visible: true
    })
  }
  handleOk() {
    var data = {
      name: this.state.rolename,
      level: this.state.level,
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
      title: '岗位职等',
      dataIndex: 'level',
      key: 'level',
    },{
      title: '岗位名称',
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
        var treenode = <TreeNode title={permisson.name} key={permisson.permissonid.toString()}>
          {context.getChildTreeNode(permisson.id)}
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
        <p className={styles.configtitle}>岗位</p>
        <div className={styles.addcontent}>
          <Button onClick={this.onClickAdd} type="primary" icon="plus">新岗位</Button>
        </div>
        <div className={styles.configtable}>
          <Table size="small" loading={this.state.loading} bordered
            columns={this.getTableColumn()} dataSource={this.getTableData()} />
        </div>
        <Modal width={420} title={this.modaltype == 'add' ? '创建岗位' : '修改岗位'} visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
          >
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>岗位</span>
            <div className={styles.form}>
              <Input value={this.state.rolename} onChange={this.onRolenameChange} placeholder="请输入岗位名" />
            </div>
            <span className={styles.formstar}>*</span>
          </div>
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>职等</span>
            <div className={styles.form}>
              <Select style={{ width: '100%' }} value={this.state.level} placeholder="请选择职等" onChange={this.handleLevelChange}>
                {this.getLevelOption()}
              </Select>
            </div>
            <span className={styles.formstar}>*</span>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Role;