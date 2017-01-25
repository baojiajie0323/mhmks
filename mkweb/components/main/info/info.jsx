import React from 'react';
import InfoMenu from './info_menu';
import Store from './store';
import StoreArea from './store_area';
import StoreContacts from './store_contacts';
import StoreDisplay from './store_display';
import Product from './product';
import ProductPrice from './product_price';
import ProductStock from './product_stock';
import ProductBrand from './product_brand';
import PromotionType from './promotion_type';
import Promotion from './promotion';

import styles from './info.less';

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentkey: 'store_area'
    };
    this.onMenuClick = this.onMenuClick.bind(this);
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  onMenuClick(key) {
    this.setState({
      contentkey: key
    })
  }
  getContent() {
    if (this.state.contentkey == 'store') {
      return <Store />;
    } else if (this.state.contentkey == 'store_area') {
      return <StoreArea />;
    } else if (this.state.contentkey == 'store_contacts') {
      return <StoreContacts />
    } else if (this.state.contentkey == 'store_display') {
      return <StoreDisplay />
    } else if (this.state.contentkey == 'product') {
      return <Product />
    } else if (this.state.contentkey == 'product_price') {
      return <ProductPrice />
    } else if (this.state.contentkey == 'product_stock') {
      return <ProductStock />
    } else if (this.state.contentkey == 'product_brand') {
      return <ProductBrand />
    } else if (this.state.contentkey == 'promotion_type') {
      return <PromotionType />
    } else if (this.state.contentkey == 'promotion') {
      return <Promotion />
    }
    return <StoreArea />;
  }
  render() {
    return (
      <div className={styles.container}>
        <InfoMenu clickcb={this.onMenuClick} />
        {this.getContent()}
      </div>
    );
  }
}

export default Info;