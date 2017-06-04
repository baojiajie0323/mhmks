import React from 'react';
import { Table, Button, Icon, Modal, Input, Popconfirm, message, Tag, Select} from 'antd';
import styles from './visitor.less';

class PromotionSum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeArea: Store.getStoreArea(),
      promotionSum: Store.getPromotionSum()
    };

    this.onStoreAreaChange = this.onStoreAreaChange.bind(this);
    this.onPromotionSumChange = this.onPromotionSumChange.bind(this);
    this.onAreaChange = this.onAreaChange.bind(this);

    this.onClickQuery = this.onClickQuery.bind(this);
    this.onTextChange = this.onTextChange.bind(this);

    this.areaid = "";
    this.schedule = "";
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_STOREAREA, this.onStoreAreaChange);
    Store.addChangeListener(StoreEvent.SE_PROMOTIONSUM, this.onPromotionSumChange);
    Action.getStoreArea();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_STOREAREA, this.onStoreAreaChange);
    Store.removeChangeListener(StoreEvent.SE_PROMOTIONSUM, this.onPromotionSumChange);
  }

  onStoreAreaChange() {
    this.setState({
      storeArea: Store.getStoreArea()
    })
  }
  onPromotionSumChange() {
    this.setState({
      promotionSum: Store.getPromotionSum()
    })
  }
  onAreaChange(e) {
    this.areaid = e;
  }

  onClickQuery() {
    if(this.areaid == "" || this.schedule == ""){
      message.info("请输入查询条件！");
      return;
    }
    var data = {
      areaid: this.areaid,
      schedule: this.schedule,
    };
    console.log(data);
    Action.getPromotionSum(data);
  }

  onTextChange(e) {
    this.schedule = e.target.value;
  }

  getAreaOption() {
    return this.state.storeArea.map((sa) => {
      return <Option value={sa.Region_id}>{sa.Region_name}</Option>
    })
  }

  getTableColumn() {
    var context = this;
    return [{
      title: '销售代表',
      dataIndex: 'username',
      key: 'username',
    }, {
        title: '门店名称',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: '海报产品量',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: 'IP产品量',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: '照片',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: '海报陈列量',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: 'IP陈列量',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: '海报调整量',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: 'IP调整量',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: '海报陈列率',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: 'IP陈列率',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: '合计陈列率',
        dataIndex: 'username',
        key: 'username',
      }];
  }
  getTableData() {
    return this.state.signList;
  }
  render() {
    return (
      <div className={styles.visitorcontent}>
        <p className={styles.visitortitle}>促销陈列统计</p>
        <div className={styles.queryContainer}>
          <Select onChange={this.onAreaChange} placeholder="请选择系统区域" style={{ width: 120, marginRight: '10px' }}>
            {this.getAreaOption() }
          </Select>
          <Input onChange={this.onTextChange} style={{ width: '120px', marginRight: '20px' }} prefix={<Icon type="calendar" style={{ fontSize: 13 }} />} placeholder="请输入档期" />
          <Button icon="search" onClick={this.onClickQuery} type="primary">查询</Button>
        </div>
        <div className={styles.promotionresult}>
          <div className={styles.productcontent} >
            <span style={{ width: '80px', display: 'inline-block' }}>海报产品(8) </span>
            <Tag color="rgb(98, 132, 108)">#87d068</Tag>
            <Tag color="rgb(98, 132, 108)">#87d068</Tag>
            <Tag color="rgb(98, 132, 108)">#87d068</Tag>
            <Tag color="rgb(98, 132, 108)">#87d068</Tag>
            <Tag color="rgb(98, 132, 108)">#87d068</Tag>
            <Tag color="rgb(98, 132, 108)">#87d068</Tag>
            <Tag color="rgb(98, 132, 108)">#87d068</Tag>
            <Tag color="rgb(98, 132, 108)">#87d068</Tag>
          </div>
          <div className={styles.productcontent} >
            <span style={{ width: '80px', display: 'inline-block' }}>IP产品(3) </span>
            <Tag color="rgb(98, 132, 108)">#87d068</Tag>
            <Tag color="rgb(98, 132, 108)">#87d068</Tag>
            <Tag color="rgb(98, 132, 108)">#87d068</Tag>
          </div>
        </div>
        <div className={styles.promotiontable}>
          <div className={styles.signList}>
            <Table size="small" columns={this.getTableColumn() } dataSource={this.getTableData() } />
          </div>
        </div>
      </div>
    );
  }
}

export default PromotionSum;