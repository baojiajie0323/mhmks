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
          defaultOpenKeys={['work_sub','info_sub']}
          selectedKeys={[this.state.current]}
          mode="inline"
          >
          <SubMenu key="work_sub" title={<span>工作记录</span>}>
            <Menu.Item key="record">拜访</Menu.Item>
            <Menu.Item key="plan">报到</Menu.Item>
          </SubMenu>
          {/*<SubMenu key="info_sub" title={<span>信息采集</span>}>
            <Menu.Item key="mainstore">主货架陈列</Menu.Item>
            <Menu.Item key="offlinestore">离架陈列</Menu.Item>
            <Menu.Item key="promotionstore">促销陈列</Menu.Item>
            <Menu.Item key="stock">库存采集</Menu.Item>
            <Menu.Item key="abnormalstock">异常库存</Menu.Item>
            <Menu.Item key="competitor">竞品采集</Menu.Item>
          </SubMenu>*/}
        </Menu>
      </div>
    );
  }
}

export default VisitorMenu;