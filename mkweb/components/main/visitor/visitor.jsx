import React from 'react';
import VisitorMenu from './visitor_menu';
import Record from './record';
import OfflineSum from './offlinesum';
import PromotionSum from './promotionsum';
import StoreSum from './storesum';
import StockMgr from './stockmgr';
import PlanCheck from './plancheck';
import SaleActual from './saleactual';
import SaleActualSum from './saleactualsum';
import Expense from './expense';
import Parttime from './parttime';
import styles from './visitor.less';

class Visitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentkey: 'record'
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
    if (this.state.contentkey == 'record') {
      return <Record />;
    } else if (this.state.contentkey == 'offlinesum') {
      return <OfflineSum />;
    } else if (this.state.contentkey == 'promotionsum') {
      return <PromotionSum />;
    } else if (this.state.contentkey == 'storesum') {
      return <StoreSum />;
    } else if (this.state.contentkey == 'stockmgr') {
      return <StockMgr />;
    } else if (this.state.contentkey == 'plancheck') {
      return <PlanCheck />;
    } else if (this.state.contentkey == 'saleactual') {
      return <SaleActual />;
    } else if (this.state.contentkey == 'saleactualsum') {
      return <SaleActualSum />;
    } else if (this.state.contentkey == 'expense') {
      return <Expense />;
    } else if (this.state.contentkey == 'parttime') {
      return <Parttime />;
    }
    return <Record />;
  }
  render() {
    return (
      <div className={styles.container}>
        <VisitorMenu clickcb={this.onMenuClick} />
        {this.getContent()}
      </div>
    );
  }
}

export default Visitor;