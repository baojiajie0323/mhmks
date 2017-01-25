import React from 'react';
import { Table } from 'antd';
import styles from './info.less';

class StoreDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      storeDisplay: Store.getStoreDisplay(),
    };
    this.onStoreDisplayChange = this.onStoreDisplayChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_STOREDISPLAY, this.onStoreDisplayChange);
    Action.getStoreDisplay();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_STOREDISPLAY, this.onStoreDisplayChange);
  }
  onStoreDisplayChange() {
    this.setState({
      storeDisplay: Store.getStoreDisplay(),
      loading:false
    })
  }
  getTableColumn() {
    return [{
      title: '陈列编号',
      dataIndex: 'Display_id',
      key: 'Display_id',
    }, {
      title: '陈列名称',
      dataIndex: 'Display_name',
      key: 'Display_name',
    }, {
      title: '陈列类型',
      dataIndex: 'Display_type',
      key: 'Display_type',
    }, {
      title: '促销类型',
      dataIndex: 'Pro_type',
      key: 'Pro_type',
    }, {
      title: '单位',
      dataIndex: 'Unit',
      key: 'Unit',
    }];
  }
  getTableData() {
    this.state.storeDisplay.forEach((sa, i) => {
      sa.key = i.toString();
    })
    return this.state.storeDisplay;
  }
  render() {
    return (
      <div className={styles.infocontent}>
        <p className={styles.infotitle}>陈列方式</p>
        <div className={styles.infotable}>
          <Table loading={this.state.loading} bordered
            columns={this.getTableColumn()} dataSource={this.getTableData()} />
        </div>
      </div>
    );
  }
}

export default StoreDisplay;