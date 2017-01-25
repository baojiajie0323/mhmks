import React from 'react';
import { Table } from 'antd';
import styles from './info.less';

class ProductPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      productPrice: Store.getProductPrice(),
      pagination : {}
    };
    this.onProductPriceChange = this.onProductPriceChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_PRODUCTPRICE, this.onProductPriceChange);
    Action.getProductPrice(0);
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_PRODUCTPRICE, this.onProductPriceChange);
  }
  onProductPriceChange() {
    this.setState({
      productPrice: Store.getProductPrice(),
      loading:false
    })
  }
  getTableColumn() {
    return [{
      title: '门店名称',
      dataIndex: 'Store_name',
      key: 'Store_name',
    }, {
      title: '产品名称',
      dataIndex: 'Product_name',
      key: 'Product_name',
    }, {
      title: '门店货号',
      dataIndex: 'Serial_no',
      key: 'Serial_no',
    }, {
      title: '正常进价',
      dataIndex: 'Price1',
      key: 'Price1',
    }, {
      title: '正常售价',
      dataIndex: 'Price2',
      key: 'Price2',
    }, {
      title: 'DM进价',
      dataIndex: 'Price3',
      key: 'Price3',
    }, {
      title: 'DM售价',
      dataIndex: 'Price4',
      key: 'Price4',
    }, {
      title: '均价进价',
      dataIndex: 'Price5',
      key: 'Price5',
    }, {
      title: '均价售价',
      dataIndex: 'Price6',
      key: 'Price6',
    }, {
      title: 'IP进价',
      dataIndex: 'Price7',
      key: 'Price7',
    }, {
      title: 'IP售价',
      dataIndex: 'Price8',
      key: 'Price8',
    }, {
      title: '状态',
      dataIndex: 'Status',
      key: 'Status',
      render : (text,record) => (<span>{text == '1'?'正常':'下架'}</span>), 
    }];
  }
  getTableData() {
    console.log(this.state.productPrice);
    this.state.productPrice.forEach((sa, i) => {
      sa.key = i.toString();
    })
    return this.state.productPrice;
  }
  render() {
    return (
      <div className={styles.infocontent}>
        <p className={styles.infotitle}>产品价格</p>
        <div className={styles.infotable}>
          <Table loading={this.state.loading} bordered
            columns={this.getTableColumn()} dataSource={this.getTableData()} 
            pagination={this.state.pagination} />
        </div>
      </div>
    );
  }
}

export default ProductPrice;