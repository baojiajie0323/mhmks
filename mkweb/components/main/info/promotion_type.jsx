import React from 'react';
import { Table } from 'antd';
import styles from './info.less';

class PromotionType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      promotionType: Store.getPromotionType(),
    };
    this.onPromotionTypeChange = this.onPromotionTypeChange.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_PROMOTIONTYPE, this.onPromotionTypeChange);
    Action.getPromotionType();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_PROMOTIONTYPE, this.onPromotionTypeChange);
  }
  onPromotionTypeChange() {
    this.setState({
      promotionType: Store.getPromotionType(),
      loading:false
    })
  }
  getTableColumn() {
    return [{
      title: '类型编号',
      dataIndex: 'Promotion_type',
      key: 'Promotion_type',
    }, {
      title: '类型名称',
      dataIndex: 'Promotion_name',
      key: 'Promotion_name',
    }];
  }
  getTableData() {
    console.log(this.state.promotionType);
    this.state.promotionType.forEach((sa, i) => {
      sa.key = i.toString();
    })
    return this.state.promotionType;
  }
  render() {
    return (
      <div className={styles.infocontent}>
        <p className={styles.infotitle}>促销类型</p>
        <div className={styles.infotable}>
          <Table loading={this.state.loading} bordered
            columns={this.getTableColumn()} dataSource={this.getTableData()} />
        </div>
      </div>
    );
  }
}

export default PromotionType;