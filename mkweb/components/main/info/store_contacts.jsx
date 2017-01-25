import React from 'react';
import { Table } from 'antd';
import styles from './info.less';

class StoreContacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      storeContacts: Store.getStoreContacts(),
    };
    this.onStoreContactsChange = this.onStoreContactsChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_STORECONTACTS, this.onStoreContactsChange);
    Action.getStoreContacts();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_STORECONTACTS, this.onStoreContactsChange);
  }
  onStoreContactsChange() {
    this.setState({
      storeContacts: Store.getStoreContacts(),
      loading:false
    })
  }
  getTableColumn() {
    return [{
      title: '门店编码',
      dataIndex: 'Store_id',
      key: 'Store_id',
    }, {
      title: '门店名称',
      dataIndex: 'Store_name',
      key: 'Store_name',
    }, {
      title: '联系人姓名',
      dataIndex: 'Contacts_name',
      key: 'Contacts_name',
    }, {
      title: '性别',
      dataIndex: 'Sex',
      key: 'Sex',
    }, {
      title: '职位',
      dataIndex: 'Prework',
      key: 'Prework',
    }, {
      title: '电话',
      dataIndex: 'Tel',
      key: 'Tel',
    },{
      title: '状态',
      dataIndex: 'Status',
      key: 'Status',
      render : (text,record) => (<span>{text == 'Y'?'有效':'无效'}</span>), 
    }];
  }
  getTableData() {
    this.state.storeContacts.forEach((sa, i) => {
      sa.key = i.toString();
    })
    return this.state.storeContacts;
  }
  render() {
    return (
      <div className={styles.infocontent}>
        <p className={styles.infotitle}>门店联系人</p>
        <div className={styles.infotable}>
          <Table loading={this.state.loading} bordered
            columns={this.getTableColumn()} dataSource={this.getTableData()} />
        </div>
      </div>
    );
  }
}

export default StoreContacts;