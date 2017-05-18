import React from 'react';
import { Table, Button, Radio, Icon, Modal, Input, Popconfirm, message, Select } from 'antd';
import styles from './config.less';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Routecost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      subsidy: Store.getSubsidy(),
      visible: false,
      modaltitle: "",
      modalvalue: '',
    };
    this.routetype = [{
      type: 1,
      name: "所辖门店"
    }, {
      type: 2,
      name: "稽核门店"
    }];
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onSubsidyChange = this.onSubsidyChange.bind(this);

    this.onModalvalueChange = this.onModalvalueChange.bind(this);
    this.onClickText = this.onClickText.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_SUBSIDY, this.onSubsidyChange);
    Action.getSubsidy();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_SUBSIDY, this.onSubsidyChange);
  }

  onSubsidyChange() {
    this.setState({
      subsidy: Store.getSubsidy(),
      visible: false,
      loading: false
    })
  }

  onModalvalueChange(e) {
    this.setState({
      modalvalue: e.target.value
    })
  }
  handleOk() {
    var data = {
      role_id: this._curRecord.id,
      key: this._cate,
      value: this.state.modalvalue,
    }
    console.log("updateSubsidy", data);
    Action.updateSubsidy(data);
  }
  handleCancel() {
    this.setState({ visible: false })
  }

  onClickText(text, record, cate) {
    this._curRecord = record;
    this._cate = cate;
    this.setState({
      visible: true,
      modaltitle: this.subsidyInfo[cate].name,
      modalvalue: text,
    })
  }
  getDepartOption() {
    return null;
  }
  getTableColumn() {
    var context = this;
    return [
      {
        title: <p style={{ textAlign: 'center' }}>路线</p>,
        dataIndex: 'level',
        key: 'level',
        width: 65,
        fixed: 'left'
      }, {
        title: <p style={{ textAlign: 'center' }}>负责人</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
        fixed: 'left'
      }, {
        title: <p style={{ textAlign: 'center' }}>岗位</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
      }, {
        title: <p style={{ textAlign: 'center' }}>门店名称</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
      }, {
        title: <p style={{ textAlign: 'center' }}>门店地址</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
      }, {
        title: <p style={{ textAlign: 'center' }}>城市等级</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
      }, {
        title: <p style={{ textAlign: 'center' }}>路线描述</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
      }, {
        title: <p style={{ textAlign: 'center' }}>交通工具</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
      }, {
        title: <p style={{ textAlign: 'center' }}>交通班次</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
      }, {
        title: <p style={{ textAlign: 'center' }}>出发时间</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
      }, {
        title: <p style={{ textAlign: 'center' }}>到达时间</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
      }, {
        title: <p style={{ textAlign: 'center' }}>长途交通费</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
      }, {
        title: <p style={{ textAlign: 'center' }}>住宿酒店</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
      }, {
        title: <p style={{ textAlign: 'center' }}>住宿费</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
      }, {
        title: <p style={{ textAlign: 'center' }}>到达时间</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
      }, {
        title: <p style={{ textAlign: 'center' }}>到达时间</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
      }, {
        title: <p style={{ textAlign: 'center' }}>到达时间</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
      }, {
        title: <p style={{ textAlign: 'center' }}>到达时间</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
      }, {
        title: <p style={{ textAlign: 'center' }}>到达时间</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
      }];
  }
  getTableData() {
    this.state.subsidy.forEach((sa, i) => {
      sa.key = i.toString();
    })
    return this.state.subsidy;
  }
  render() {
    return (
      <div className={styles.configcontent}>
        <p className={styles.configtitle}>路线费用标准</p>
        <div className={styles.editcontent}>
          <Select defaultValue={1} style={{ width: 120, marginRight: '10px' }}>
            {this.routetype.map((rt) => {
              return <Option value={rt.type}>{rt.name}</Option>
            })}
          </Select>
          <Select defaultValue={0} style={{ width: 120 }}>
            {this.getDepartOption()}
          </Select>
        </div>
        <div className={styles.configtable}>
          <Table size="small" loading={this.state.loading} bordered scroll={{ x: 1500 }}
            columns={this.getTableColumn()} dataSource={this.getTableData()} />
        </div>
        <Modal width={350} title={this.state.modaltitle} visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
          >
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>标准</span>
            <div className={styles.form}>
              <Input value={this.state.modalvalue} onChange={this.onModalvalueChange} placeholder="请输入标准" />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Routecost;