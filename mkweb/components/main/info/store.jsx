import React from 'react';
import { Table } from 'antd';
import styles from './info.less';

class StoreBasic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      storeBasic: Store.getStoreBasic(),
    };
    this.onStoreBasicChange = this.onStoreBasicChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_STOREBASIC, this.onStoreBasicChange);
    Action.getStoreBasic();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_STOREBASIC, this.onStoreBasicChange);
  }
  onStoreBasicChange() {
    this.setState({
      storeBasic: Store.getStoreBasic(),
      loading:false
    })
  }
  getTableColumn() {
    return [{
      title: '系统编号',
      dataIndex: 'System_id',
      key: 'System_id',
    }, {
      title: '系统名称',
      dataIndex: 'System_name',
      key: 'System_name',
    }, {
      title: '区域编号',
      dataIndex: 'Region_id',
      key: 'Region_id',
    }, {
      title: '区域名称',
      dataIndex: 'Region_name',
      key: 'Region_name',
    }];
  }
  getTableData() {
    this.state.storeBasic.forEach((sa, i) => {
      sa.key = i.toString();
    })
    return this.state.storeBasic;
  }
  render() {
    return (
      <div className={styles.infocontent}>
        <p className={styles.infotitle}>门店</p>
        <div className={styles.infotable}>
          <Table loading={this.state.loading} bordered
            columns={this.getTableColumn()} dataSource={this.getTableData()} />
        </div>
      </div>
    );
  }
}

export default StoreBasic;