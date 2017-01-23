import React from 'react';
import styles from './info.less';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class InfoMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'store_area',
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
    if(this.props.clickcb){
      this.props.clickcb(e.key);
    }
  }
  render() {
    return (
      <div className={styles.infomenu}>
        <Menu onClick={this.handleClick}
          style={{ width: 210 }}
          defaultOpenKeys={['store_sub']}
          selectedKeys={[this.state.current]}
          mode="inline"
          >
          <SubMenu key="store_sub" title={<span>门店管理</span>}>
              <Menu.Item key="store_area">门店系统区域</Menu.Item>
              <Menu.Item key="store">门店</Menu.Item>
              <Menu.Item key="store_contacts">门店联系人</Menu.Item>
              <Menu.Item key="store_display">陈列方式</Menu.Item>
          </SubMenu>
          <SubMenu key="product_sub" title={<span>产品管理</span>}>
            <Menu.Item key="product">产品</Menu.Item>
            <Menu.Item key="product_price">产品价格</Menu.Item>
            <Menu.Item key="product_stock">产品安全库存</Menu.Item>
            <Menu.Item key="product_brand">品牌</Menu.Item>
          </SubMenu>
          <SubMenu key="promotion_sub" title={<span>促销管理</span>}>
            <Menu.Item key="promotion">促销活动</Menu.Item>
            <Menu.Item key="promotion_type">促销类型</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default InfoMenu;