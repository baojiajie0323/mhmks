import React from 'react';
import { Table } from 'antd';
import styles from './info.less';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      product: Store.getProduct(),
    };
    this.onProductChange = this.onProductChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_PRODUCT, this.onProductChange);
    Action.getProduct();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_PRODUCT, this.onProductChange);
  }
  onProductChange() {
    this.setState({
      product: Store.getProduct(),
      loading:false
    })
  }
  getTableColumn() {
    return [{
      title: '品牌',
      dataIndex: 'Brand_name',
      key: 'Brand_name',
    }, {
      title: '产品编号',
      dataIndex: 'Product_id',
      key: 'Product_id',
    }, {
      title: '产品名称',
      dataIndex: 'Product_name',
      key: 'Product_name',
    }, {
      title: '产品条码',
      dataIndex: 'Product_code',
      key: 'Product_code',
    }, {
      title: '产品规格',
      dataIndex: 'Product_cname',
      key: 'Product_cname',
    }, {
      title: '箱规',
      dataIndex: 'Product_box',
      key: 'Product_box',
    }, {
      title: '状态',
      dataIndex: 'Status',
      key: 'Status',
      render : (text,record) => (<span>{text == 'Y'?'有效':'无效'}</span>), 
    }];
  }
  getTableData() {
    console.log(this.state.product);
    this.state.product.forEach((sa, i) => {
      sa.key = i.toString();
    })
    return this.state.product;
  }
  render() {
    return (
      <div className={styles.infocontent}>
        <p className={styles.infotitle}>产品</p>
        <div className={styles.infotable}>
          <Table loading={this.state.loading} bordered
            columns={this.getTableColumn()} dataSource={this.getTableData()} />
        </div>
      </div>
    );
  }
}

export default Product;