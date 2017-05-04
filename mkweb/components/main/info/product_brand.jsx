import React from 'react';
import { Table } from 'antd';
import styles from './info.less';

class ProductBrand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      productBrand: Store.getProductBrand(),
    };
    this.onProductBrandChange = this.onProductBrandChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_PRODUCTBRAND, this.onProductBrandChange);
    Action.getProductBrand();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_PRODUCTBRAND, this.onProductBrandChange);
  }
  onProductBrandChange() {
    this.setState({
      productBrand: Store.getProductBrand(),
      loading:false
    })
  }
  getTableColumn() {
    return [{
      title: '品牌编号',
      dataIndex: 'Brand_id',
      key: 'Brand_id',
    }, {
      title: '品牌名称',
      dataIndex: 'Brand_name',
      key: 'Brand_name',
    }];
  }
  getTableData() {
    console.log(this.state.productBrand);
    this.state.productBrand.forEach((sa, i) => {
      sa.key = i.toString();
    })
    return this.state.productBrand;
  }
  render() {
    return (
      <div className={styles.infocontent}>
        <p className={styles.infotitle}>品牌</p>
        <div className={styles.infotable}>
          <Table size="small" loading={this.state.loading} bordered
            columns={this.getTableColumn()} dataSource={this.getTableData()} />
        </div>
      </div>
    );
  }
}

export default ProductBrand;