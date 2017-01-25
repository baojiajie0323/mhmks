import React from 'react';
import { Table } from 'antd';
import styles from './info.less';

class Promotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      promotion: Store.getPromotion(),
    };
    this.onPromotionChange = this.onPromotionChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_PROMOTION, this.onPromotionChange);
    Action.getPromotion();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_PROMOTION, this.onPromotionChange);
  }
  onPromotionChange() {
    this.setState({
      promotion: Store.getPromotion(),
      loading:false
    })
  }
  getTableColumn() {
    return [{
      title: '档期',
      dataIndex: 'Pro_name',
      key: 'Pro_name',
    }, {
      title: '门店名称',
      dataIndex: 'Store_name',
      key: 'Store_name',
    }, {
      title: '产品名称',
      dataIndex: 'Product_name',
      key: 'Product_name',
    }, {
      title: '促销类型',
      dataIndex: 'Promotion_name',
      key: 'Promotion_name',
    }, {
      title: '促销开始日',
      dataIndex: 'Date3',
      key: 'Date3',
      render : (text,record) => (<span>{new Date(text).Format("yyyy/MM/dd")}</span>)
    }, {
      title: '促销结束日',
      dataIndex: 'Date4',
      key: 'Date4',
      render : (text,record) => (<span>{new Date(text).Format("yyyy/MM/dd")}</span>)
    }, {
      title: '促销天数',
      dataIndex: 'Day',
      key: 'Day',
    }, {
      title: '促销进价',
      dataIndex: 'Price1',
      key: 'Price1',
    }, {
      title: '促销售价',
      dataIndex: 'Price2',
      key: 'Price2',
    }];
  }
  getTableData() {
    console.log(this.state.promotion);
    this.state.promotion.forEach((sa, i) => {
      sa.key = i.toString();
    })
    return this.state.promotion;
  }
  render() {
    return (
      <div className={styles.infocontent}>
        <p className={styles.infotitle}>促销活动</p>
        <div className={styles.infotable}>
          <Table loading={this.state.loading} bordered
            columns={this.getTableColumn()} dataSource={this.getTableData()} />
        </div>
      </div>
    );
  }
}

export default Promotion;