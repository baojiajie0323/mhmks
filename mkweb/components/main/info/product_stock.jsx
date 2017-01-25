import React from 'react';
import { Table } from 'antd';
import styles from './info.less';

class ProductStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      productStock: Store.getProductStock(),
    };
    this.onProductStockChange = this.onProductStockChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_PRODUCTSTOCK, this.onProductStockChange);
    Action.getProductStock();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_PRODUCTSTOCK, this.onProductStockChange);
  }
  onProductStockChange() {
    this.setState({
      productStock: Store.getProductStock(),
      loading:false
    })
  }
  getTableColumn() {
    return [{
      title: '年',
      dataIndex: 'Year',
      key: 'Year',
    }, {
      title: '月',
      dataIndex: 'Month',
      key: 'Month',
    }, {
      title: '门店编号',
      dataIndex: 'Store_id',
      key: 'Store_id',
    }, {
      title: '门店名称',
      dataIndex: 'Store_name',
      key: 'Store_name',
    }, {
      title: '产品编号',
      dataIndex: 'Product_id',
      key: 'Product_id',
    }, {
      title: '产品名称',
      dataIndex: 'Product_name',
      key: 'Product_name',
    }, {
      title: '库存单位',
      dataIndex: 'Unit',
      key: 'Unit',
    }, {
      title: '安全库存量',
      dataIndex: 'Stock_qty',
      key: 'Stock_qty',
    }, {
      title: 'DMS',
      dataIndex: 'DMS',
      key: 'DMS',
    }];
  }
  getTableData() {
    console.log(this.state.productStock);
    this.state.productStock.forEach((sa, i) => {
      sa.key = i.toString();
    })
    return this.state.productStock;
  }
  render() {
    return (
      <div className={styles.infocontent}>
        <p className={styles.infotitle}>产品安全库存</p>
        <div className={styles.infotable}>
          <Table loading={this.state.loading} bordered
            columns={this.getTableColumn()} dataSource={this.getTableData()} />
        </div>
      </div>
    );
  }
}

export default ProductStock;