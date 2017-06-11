import React from 'react';
import { Table, Button, Icon, Modal, Input, Popconfirm, message, DatePicker } from 'antd';
import styles from './visitor.less';
const { MonthPicker, RangePicker } = DatePicker;

class StockMgr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      stockconfig: Store.getStockConfig(),
      stock_l: "",
      stock_h: "",
      caller: "",
      signature: "",
    };

    this.onStockConfigChange = this.onStockConfigChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onClickQuery = this.onClickQuery.bind(this);
    this.onClickSetting = this.onClickSetting.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.onStocklChange = this.onStocklChange.bind(this);
    this.onStockhChange = this.onStockhChange.bind(this);
    this.onCallerChange = this.onCallerChange.bind(this);
    this.onSignatureChange = this.onSignatureChange.bind(this);
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
    var context = this;
    this.setState({
      stockconfig: Store.getStockConfig(),
      visible: false,
    }, function () {
      var stockConfig = this.state.stockconfig;
      stockConfig.forEach((sC) => {
        if (sC.stock_key == "stock_l") {
          context.setState({
            stock_l: sC.stock_value
          })
        }
        else if (sC.stock_key == "stock_h") {
          context.setState({
            stock_h: sC.stock_value
          })
        }
        else if (sC.stock_key == "caller") {
          context.setState({
            caller: sC.stock_value
          })
        }
        else if (sC.stock_key == "signature") {
          context.setState({
            signature: sC.stock_value
          })
        }
      })
    })
  }

  handleCancel() {
    this.setState({ visible: false })
  }

  onClickQuery() {
    // var data = {
    //   signtime: this.queryData,
    //   userid: this.userid
    // };
    // console.log(data);
    // Action.getSignList(data);
    message.info("此功能待开发");
  }

  onClickSetting() {
    this.setState({
      visible: true
    })
  }

  handleOk() {
    Action.updateStockConfig({
      stock_l: this.state.stock_l,
      stock_h: this.state.stock_h,
      caller: this.state.caller,
      signature: this.state.signature
    })
  }

  onDateChange(date, dateString) {
    this.queryData = dateString;
    console.log("onDateChange", date, dateString);
  }

  onStocklChange(e) {
    this.setState({
      stock_l: e.target.value,
    })
  }

  onStockhChange(e) {
    this.setState({
      stock_h: e.target.value,
    })
  }

  onCallerChange(e) {
    this.setState({
      caller: e.target.value,
    })
  }

  onSignatureChange(e) {
    this.setState({
      signature: e.target.value,
    })
  }

  onTextChange(e) {
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