import React from 'react';
import { Table, Button, Icon, Modal, Input, Tree, Popconfirm, message} from 'antd';
import styles from './visitor.less';
const TreeNode = Tree.TreeNode;

class Plan extends React.Component {
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
    }];
  }
  getTableData() {
  }
  render() {
    return (
      <div className={styles.visitorcontent}>
        <p className={styles.visitortitle}>计划</p>
        <div className={styles.visitortable}>
          <Table loading={this.state.loading} bordered
            columns={this.getTableColumn() } dataSource={this.getTableData() } />
        </div>
      </div>
    );
  }
}

export default Plan;