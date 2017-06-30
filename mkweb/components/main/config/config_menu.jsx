import React from 'react';
import styles from './config.less';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class ConfigMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'user',
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
          defaultOpenKeys={['user_sub', 'standard_sub', 'path_sub']}
          selectedKeys={[this.state.current]}
          mode="inline"
          >
          <SubMenu key="user_sub" title={<span>用户管理</span>}>
            <Menu.Item key="user">用户</Menu.Item>
            <Menu.Item key="depart">区域</Menu.Item>
            <Menu.Item key="role">岗位</Menu.Item>
          </SubMenu>
          <SubMenu key="standard_sub" title={<span>标准管理</span>}>
            <Menu.Item key="subsidy">补贴报销</Menu.Item>
          </SubMenu>
          <SubMenu key="path_sub" title={<span>路线管理</span>}>
            <Menu.Item key="routecost">销售访店</Menu.Item>
            <Menu.Item key="path">路线</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default ConfigMenu;