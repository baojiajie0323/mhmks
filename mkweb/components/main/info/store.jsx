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
      title: '系统',
      dataIndex: 'System_name',
      key: 'System_name',
    }, {
      title: '区域',
      dataIndex: 'Region_name',
      key: 'Region_name',
    }, {
      title: '门店编码',
      dataIndex: 'Store_id',
      key: 'Store_id',
    }, {
      title: '门店名称',
      dataIndex: 'Store_name',
      key: 'Store_name',
    }, {
      title: '等级',
      dataIndex: 'Level',
      key: 'Level',
    }, {
      title: '销售代表',
      dataIndex: 'user_id',
      key: 'user_id',
    }, {
      title: '订货周期',
      dataIndex: 'D1',
      key: 'D1',
      render : (text,record) => (<span>{text? (text + '天'):'暂无数据'}</span>), 
    }, {
      title: '到仓天数',
      dataIndex: 'D2',
      key: 'D2',
      render : (text,record) => (<span>{text? (text + '天'):'暂无数据'}</span>), 
    }, {
      title: '到店天数',
      dataIndex: 'D3',
      key: 'D3',
      render : (text,record) => (<span>{text? (text + '天'):'暂无数据'}</span>), 
    }, {
      title: '状态',
      dataIndex: 'Status',
      key: 'Status',
      render : (text,record) => (<span>{text == 'Y'?'有效':'无效'}</span>), 
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
          <Table size="small" loading={this.state.loading} bordered
            columns={this.getTableColumn()} dataSource={this.getTableData()} />
        </div>
      </div>
    );
  }
}

export default StoreBasic;