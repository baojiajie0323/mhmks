import React from 'react';
import styles from './visitor.less';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class VisitorMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'record',
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
    if (this.props.clickcb) {
      this.props.clickcb(e.key);
    }
  }
  render() {
    return (
      <div className={styles.contentmenu}>
        <Menu onClick={this.handleClick}
          style={{ width: 210 }}
          defaultOpenKeys={['work_sub', 'plan_sub']}
          selectedKeys={[this.state.current]}
          mode="inline"
          >
          <SubMenu key="work_sub" title={<span>工作记录</span>}>
            <Menu.Item key="record">拜访</Menu.Item>
            <Menu.Item key="plancheck">路线稽核</Menu.Item>
            <Menu.Item key="saleactual">SKU上架动销</Menu.Item>
            <Menu.Item key="saleactualsum">动销汇总</Menu.Item>
            <Menu.Item key="promotionsum">促销陈列统计</Menu.Item>
            {/*<Menu.Item key="stockmgr">库存管理</Menu.Item>*/}
          </SubMenu>
          <SubMenu key="plan_sub" title={<span>工作计划</span>}>
            <Menu.Item key="storesum">门店拜访频次</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default VisitorMenu;