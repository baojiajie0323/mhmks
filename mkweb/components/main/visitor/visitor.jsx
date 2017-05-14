import React from 'react';
import VisitorMenu from './visitor_menu';
import Record from './record';
import StoreSum from './storesum';
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
    } else if (this.state.contentkey == 'storesum') {
      return <StoreSum />;
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