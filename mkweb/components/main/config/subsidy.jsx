import React from 'react';
import { Table, Button, Icon, Modal, Input, Tree, Popconfirm, message, Select } from 'antd';
import styles from './config.less';
const TreeNode = Tree.TreeNode;

class Subsidy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      subsidy: Store.getSubsidy(),
      visible: false,
      modaltitle: "",
      modalvalue: '',
    };
    this.subsidyInfo = {
      jt1: { name: '交通工具 500公里以上(含)' },
      jt2: { name: '交通工具 500公里以下' },
      gzdcf1: { name: '误餐标准 一线城市' },
      gzdcf2: { name: '误餐标准 二线城市' },
      gzdcf3: { name: '误餐标准 三线城市' },
      gzdjt1: { name: '工作地交通 一线城市' },
      gzdjt2: { name: '工作地交通 二线城市' },
      gzdjt3: { name: '工作地交通 三线城市' },
      ccjt1: { name: '出差地交通 一线城市' },
      ccjt2: { name: '出差地交通 二线城市' },
      ccjt3: { name: '出差地交通 三线城市' },
      ccbt1: { name: '出差补贴 一线城市' },
      ccbt2: { name: '出差补贴 二线城市' },
      ccbt3: { name: '出差补贴 三线城市' },
      txf: { name: '通讯费补贴' },
      kdf: { name: '快递费补贴' }
    }
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onSubsidyChange = this.onSubsidyChange.bind(this);

    this.onModalvalueChange = this.onModalvalueChange.bind(this);
    this.onClickText = this.onClickText.bind(this);
    this.noValue = " ";
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
    if(text == this.noValue){
      text = "";
    }
    this.setState({
      visible: true,
      modaltitle: this.subsidyInfo[cate].name,
      modalvalue: text,
    })
  }
  getTableColumn() {
    var context = this;
    return [
      {
        title: <p style={{ textAlign: 'center' }}>岗位等级</p>,
        dataIndex: 'level',
        key: 'level',
        width: 65,
        fixed: 'left'
      }, {
        title: <p style={{ textAlign: 'center' }}>适用岗位</p>,
        dataIndex: 'name',
        key: 'name',
        width: 80,
        fixed: 'left'
      }, {
        title: '交通工具类别',
        children: [
          {
            title: <p style={{ textAlign: 'center' }}>500公里以上(含) </p>,
            dataIndex: 'jt1',
            key: 'jt1',
            width: 120,
            render: function (text, record) {
              if (!text) {
                text = context.noValue;
              }
              return <p style={{ whiteSpace:'pre-wrap', textAlign: "center", color: "rgb(16,142,233)", cursor: 'pointer' }}
                onClick={function () { context.onClickText(text, record, 'jt1') } } >{text}</p>
            }
          }, {
            title: <p style={{ textAlign: 'center' }}>500公里以下</p>,
            dataIndex: 'jt2',
            key: 'jt2',
            width: 180,
            render: function (text, record) {
              if (!text) {
                text = context.noValue;
              }
              return <p style={{ whiteSpace:'pre-wrap', textAlign: "center", color: "rgb(16,142,233)", cursor: 'pointer' }}
                onClick={function () { context.onClickText(text, record, 'jt2') } } >{text}</p>
            }
          },
        ]
      }, {
        title: <p>误餐标准</p>,
        children: [
          {
            title: <p style={{textAlign: 'center' }}>一线城市 (元/日) </p>,
            dataIndex: 'gzdcf1',
            key: 'gzdcf1',
            width: 65,
            render: function (text, record) {
              if (!text) {
                text = context.noValue;
              }
              return <p style={{ whiteSpace:'pre-wrap', textAlign: "center", color: "rgb(16,142,233)", cursor: 'pointer' }}
                onClick={function () { context.onClickText(text, record, 'gzdcf1') } } >{text}</p>
            }
          }, {
            title: <p style={{textAlign: 'center' }}>二线城市 (元/日) </p>,
            dataIndex: 'gzdcf2',
            key: 'gzdcf2',
            width: 65,
            render: function (text, record) {
              if (!text) {
                text = context.noValue;
              }
              return <p style={{ whiteSpace:'pre-wrap', textAlign: "center", color: "rgb(16,142,233)", cursor: 'pointer' }}
                onClick={function () { context.onClickText(text, record, 'gzdcf2') } } >{text}</p>
            }
          }, {
            title: <p style={{ textAlign: 'center' }}>三线城市 (元/日) </p>,
            dataIndex: 'gzdcf3',
            key: 'gzdcf3',
            width: 65,
            render: function (text, record) {
              if (!text) {
                text = context.noValue;
              }
              return <p style={{ whiteSpace:'pre-wrap', textAlign: "center", color: "rgb(16,142,233)", cursor: 'pointer' }}
                onClick={function () { context.onClickText(text, record, 'gzdcf3') } } >{text}</p>
            }
          }
        ]
      }, {
        title: <p>工作地交通费标准</p>,
        children: [
          {
            title: <p style={{ whiteSpace:'pre-wrap', textAlign: 'center' }}>一线城市 (元/日) </p>,
            dataIndex: 'gzdjt1',
            key: 'gzdjt1',
            width: 65,
            render: function (text, record) {
              if (!text) {
                text = context.noValue;
              }
              return <p style={{ whiteSpace:'pre-wrap', textAlign: "center", color: "rgb(16,142,233)", cursor: 'pointer' }}
                onClick={function () { context.onClickText(text, record, 'gzdjt1') } } >{text}</p>
            }
          }, {
            title: <p style={{ textAlign: 'center' }}>二线城市 (元/日) </p>,
            dataIndex: 'gzdjt2',
            key: 'gzdjt2',
            width: 65,
            render: function (text, record) {
              if (!text) {
                text = context.noValue;
              }
              return <p style={{ whiteSpace:'pre-wrap', textAlign: "center", color: "rgb(16,142,233)", cursor: 'pointer' }}
                onClick={function () { context.onClickText(text, record, 'gzdjt2') } } >{text}</p>
            }
          }, {
            title: <p style={{ textAlign: 'center' }}>三线城市 (元/日) </p>,
            dataIndex: 'gzdjt3',
            key: 'gzdjt3',
            width: 65,
            render: function (text, record) {
              if (!text) {
                text = context.noValue;
              }
              return <p style={{ whiteSpace:'pre-wrap', textAlign: "center", color: "rgb(16,142,233)", cursor: 'pointer' }}
                onClick={function () { context.onClickText(text, record, 'gzdjt3') } } >{text}</p>
            }
          }
        ]
      }, {
        title: <p>出差地交通费标准</p>,
        children: [
          {
            title: <p style={{ textAlign: 'center' }}>一线城市 (元/日) </p>,
            dataIndex: 'ccjt1',
            key: 'ccjt1',
            width: 65,
            render: function (text, record) {
              if (!text) {
                text = context.noValue;
              }
              return <p style={{ whiteSpace:'pre-wrap', textAlign: "center", color: "rgb(16,142,233)", cursor: 'pointer' }}
                onClick={function () { context.onClickText(text, record, 'ccjt1') } } >{text}</p>
            }
          }, {
            title: <p style={{ textAlign: 'center' }}>二线城市 (元/日) </p>,
            dataIndex: 'ccjt2',
            key: 'ccjt2',
            width: 65,
            render: function (text, record) {
              if (!text) {
                text = context.noValue;
              }
              return <p style={{ whiteSpace:'pre-wrap', textAlign: "center", color: "rgb(16,142,233)", cursor: 'pointer' }}
                onClick={function () { context.onClickText(text, record, 'ccjt2') } } >{text}</p>
            }
          }, {
            title: <p style={{ textAlign: 'center' }}>三线城市 (元/日) </p>,
            dataIndex: 'ccjt3',
            key: 'ccjt3',
            width: 65,
            render: function (text, record) {
              if (!text) {
                text = context.noValue;
              }
              return <p style={{ whiteSpace:'pre-wrap', textAlign: "center", color: "rgb(16,142,233)", cursor: 'pointer' }}
                onClick={function () { context.onClickText(text, record, 'ccjt3') } } >{text}</p>
            }
          }
        ]
      }, {
        title: <p>出差 补贴标准</p>,
        children: [
          {
            title: <p style={{textAlign: 'center' }}>一线城市 (元/日) </p>,
            dataIndex: 'ccbt1',
            key: 'ccbt1',
            width: 65,
            render: function (text, record) {
              if (!text) {
                text = context.noValue;
              }
              return <p style={{ whiteSpace:'pre-wrap', textAlign: "center", color: "rgb(16,142,233)", cursor: 'pointer' }}
                onClick={function () { context.onClickText(text, record, 'ccbt1') } } >{text}</p>
            }
          }, {
            title: <p style={{ textAlign: 'center' }}>二线城市 (元/日) </p>,
            dataIndex: 'ccbt2',
            key: 'ccbt2',
            width: 65,
            render: function (text, record) {
              if (!text) {
                text = context.noValue;
              }
              return <p style={{ whiteSpace:'pre-wrap', textAlign: "center", color: "rgb(16,142,233)", cursor: 'pointer' }}
                onClick={function () { context.onClickText(text, record, 'ccbt2') } } >{text}</p>
            }
          }, {
            title: <p style={{ textAlign: 'center' }}>三线城市 (元/日) </p>,
            dataIndex: 'ccbt3',
            key: 'ccbt3',
            width: 65,
            render: function (text, record) {
              if (!text) {
                text = context.noValue;
              }
              return <p style={{ whiteSpace:'pre-wrap', textAlign: "center", color: "rgb(16,142,233)", cursor: 'pointer' }}
                onClick={function () { context.onClickText(text, record, 'ccbt3') } } >{text}</p>
            }
          }
        ]
      }, {
        title: <p>通讯费 (元/月)</p>,
        dataIndex: 'txf',
        key: 'txf',
        width: 60,
        render: function (text, record) {
          if (!text) {
            text = context.noValue;
          }
          return <p style={{ whiteSpace:'pre-wrap', textAlign: "center", color: "rgb(16,142,233)", cursor: 'pointer' }}
            onClick={function () { context.onClickText(text, record, 'txf') } } >{text}</p>
        }
      }, {
        title: <p>快递费 (元/月)</p>,
        dataIndex: 'kdf',
        key: 'kdf',
        width: 60,
        render: function (text, record) {
          if (!text) {
            text = context.noValue;
          }
          return <p style={{ whiteSpace:'pre-wrap', textAlign: "center", color: "rgb(16,142,233)", cursor: 'pointer' }}
            onClick={function () { context.onClickText(text, record, 'kdf') } } >{text}</p>
        }
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
        <p className={styles.configtitle}>补贴报销标准</p>
        <div className={styles.configtable}>
          <Table size="small" loading={this.state.loading} bordered scroll={{ x: 1345 }}
            columns={this.getTableColumn()} dataSource={this.getTableData()} />
        </div>
        <Modal width={350} title={this.state.modaltitle} visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
          >
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>标准</span>
            <div className={styles.form}>
              <Input value={this.state.modalvalue} autoFocus="autoFocus" onChange={this.onModalvalueChange} placeholder="请输入标准" />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Subsidy;