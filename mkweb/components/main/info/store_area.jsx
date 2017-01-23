import React from 'react';
import {Table} from 'antd';
import styles from './info.less';

class StoreArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    const columns = [{
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
    const data = [{
      key: '1',
      System_id: 'CAF',
      System_name: '家乐福',
      Region_id: 'CAF001',
      Region_name: '家乐福华东区',
    }, {
      key: '2',
      System_id: 'CAF',
      System_name: '家乐福',
      Region_id: 'CAF003',
      Region_name: '家乐福华中区',
    }, {
      key: '3',
      System_id: 'CAF',
      System_name: '家乐福',
      Region_id: 'CAF002',
      Region_name: '家乐福华南区',
    }];
    return (
      <div className={styles.infocontent}>
        <p className={styles.infotitle}>门店系统区域</p>
        <div className={styles.infotable}>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    );
  }
}

export default StoreArea;