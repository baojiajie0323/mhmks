import React from 'react';
import InfoMenu from './info_menu';
import Store from './store';
import StoreArea from './store_area';

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