import React from 'react';
import { Table, Button, Icon, Modal, Input, Popconfirm, message, DatePicker } from 'antd';
import styles from './visitor.less';
const { MonthPicker, RangePicker } = DatePicker;

class StockMgr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      stockconfig: Store.getStockConfig(),
    };

    this.onStockConfigChange = this.onStockConfigChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onClickQuery = this.onClickQuery.bind(this);
    this.onClickSetting = this.onClickSetting.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.queryData = "";
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_STOCKCONFIG, this.onStockConfigChange);
    Action.getStockConfig();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_STOCKCONFIG, this.onStockConfigChange);

  }
  onStockConfigChange() {
    this.setState({
      stockconfig: Store.getStockConfig()
    })
  }

  handleCancel(){
    this.setState({visible:false})
  }

  onClickQuery(){
    var data = {
      signtime:this.queryData,
      userid:this.userid
    };
    console.log(data);
    Action.getSignList(data);
  }

  onClickSetting(){
    this.setState({
      visible: true
    })
  }

  handleOk(){

  }

  onDateChange(date, dateString) {
    this.queryData = dateString;
    console.log("onDateChange", date, dateString);
  }

  onTextChange(e){
    this.userid = e.target.value;
  }

  getTableColumn() {
    // var context = this;
    // return [{
    //   title: '时间',
    //   dataIndex: 'signtime',
    //   key: 'signtime',
    // }];
  }
  getTableData() {
    return this.state.signList;
  }
  render() {
    return (
      <div className={styles.visitorcontent}>
        <p className={styles.visitortitle}>库存管理</p>
        <div className={styles.queryContainer}>
          <Input onChange={this.onTextChange} style={{ width: '200px', marginRight: '20px' }} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="工号" />
          <RangePicker defaultValue={[moment(), moment()]} style={{ marginRight: '20px' }} onChange={this.onDateChange} />
          <Button style={{ marginRight: '10px' }} icon="search" onClick={this.onClickQuery} type="primary">查询</Button>
          <Button icon="setting" onClick={this.onClickSetting} type="primary">配置</Button>
        </div>
        <div className={styles.signContent}>
          {/*<div className={styles.signList}>
            <Table showHeader={false} size="small" columns={this.getTableColumn()} dataSource={this.getTableData()} />
          </div>*/}
        </div>
        <Modal width={400} title='库存设置' visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
          >
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>低警戒值</span>
            <div className={styles.form}>
              <Input value={this.state.stock_l} onChange={this.onStocklChange} placeholder="请输入数值" />
            </div>
          </div>
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>高警戒值</span>
            <div className={styles.form}>
              <Input value={this.state.stock_h} onChange={this.onStockhChange} placeholder="请输入数值" />
            </div>
          </div>
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>尊称</span>
            <div className={styles.form}>
              <Input value={this.state.caller} onChange={this.onCallerChange} placeholder="请输入" />
            </div>
          </div>
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>署名</span>
            <div className={styles.form}>
              <Input value={this.state.signature} onChange={this.onSignatureChange} placeholder="请输入" />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default StockMgr;