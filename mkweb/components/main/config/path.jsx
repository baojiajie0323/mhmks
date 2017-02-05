import React from 'react';
import { Table, Button, Icon, Modal, message, Timeline} from 'antd';
import styles from './config.less';

class Path extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      path: Store.getPath(),
      pathdetail: [],
      visible: false,
      pathname: '',
      pagination: {}
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onPathChange = this.onPathChange.bind(this);
    this.onClickDetail = this.onClickDetail.bind(this);
  }
  componentDidMount() {
    Store.addChangeListener(StoreEvent.SE_PATH, this.onPathChange);
    Store.addChangeListener(StoreEvent.SE_PATHDETAIL, this.onPathDetailChange);
    Action.getPath();
    Action.getPathDetail();
  }
  componentWillUnmount() {
    Store.removeChangeListener(StoreEvent.SE_PATH, this.onPathChange);
    Store.removeChangeListener(StoreEvent.SE_PATHDETAIL, this.onPathDetailChange);
  }
  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
  }
  onPathChange() {
    this.setState({
      path: Store.getPath(),
      visible: false,
      loading: false
    })
  }
  onPathDetailChange() {

  }
  onClickDetail(e) {
    var id = e.currentTarget.dataset.id;
    this.selectedkeys = id;
    var pathInfo = Store.getPathbyId(id);
    var pathDetail = Store.getPathDetailbyId(id);

    this.setState({
      pathname: pathInfo.Path_name,
      pathdetail: pathDetail,
      visible: true
    })
  }
  handleOk() {
    this.setState({ visible: false })
  }
  handleCancel() {
    this.setState({ visible: false })
  }
  getTableColumn() {
    var context = this;
    return [{
      title: '路线编号',
      dataIndex: 'Path_id',
      key: 'Path_id',
    }, {
        title: '路线名称',
        dataIndex: 'Path_name',
        key: 'Path_name',
      }, {
        title: '操作',
        key: 'operate',
        render: function (text, record) {
          return (<div className={styles.operatecontent}>
            <a data-id={record.Path_id} onClick={context.onClickDetail}><Icon type="share-alt" /></a>
          </div>)
        },
      }];
  }
  getTableData() {
    this.state.path.forEach((sa, i) => {
      sa.key = i.toString();
    })
    return this.state.path;
  }
  getPathDetail() {
    if (this.state.pathdetail.length == 0) {
      return null;
    }
    var pathDetail = this.state.pathdetail.map((pd) => {
      return <Timeline.Item>{pd.Store_name}</Timeline.Item>
    })
    return <Timeline>
      {pathDetail}
    </Timeline>
  }
  render() {
    return (
      <div className={styles.configcontent}>
        <p className={styles.configtitle}>路线</p>
        <div className={styles.configtable}>
          <Table loading={this.state.loading} bordered
            columns={this.getTableColumn() } dataSource={this.getTableData() } 
            pagination={this.state.pagination} onChange={this.handleTableChange} />
        </div>
        <Modal width={420} title='路线详情' visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
          >
          <div className={styles.formcontent}>
            <span className={styles.formtitle}>路线名称</span>
            <div className={styles.form}>
              <p>{this.state.pathname}</p>
            </div>
          </div>
          <div className={[styles.formcontent, styles.formtreecontent].join(' ') }>
            <span className={styles.formtitle}>门店详情</span>
            <div style={{ paddingTop: '17px' }} className={styles.form}>
              {this.getPathDetail() }
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Path;