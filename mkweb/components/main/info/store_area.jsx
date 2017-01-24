import React from 'react';
import { Table } from 'antd';
import styles from './info.less';

class StoreArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      storeArea: Store.getStoreArea(),
    };
    this.onStoreAreaChange = this.onStoreAreaChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_STOREAREA, this.onStoreAreaChange);
    Action.getStoreArea();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_STOREAREA, this.onStoreAreaChange);
  }
  onStoreAreaChange() {
    this.setState({
      storeArea: Store.getStoreArea(),
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
    console.log(this.state.storeArea);
    return this.state.storeArea.map((sa, i) => {
      sa.key = i.toString();
    })
  }
  render() {
    return (
      <div className={styles.infocontent}>
        <p className={styles.infotitle}>门店系统区域</p>
        <div className={styles.infotable}>
          <Table loading={this.state.loading}
            columns={this.getTableColumn()} dataSource={this.getTableData()} />
        </div>
      </div>
    );
  }
}

export default StoreArea;