import React from 'react';
import VisitorMenu from './visitor_menu';
import Plan from './plan';
import styles from './visitor.less';

class Visitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentkey: 'plan'
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
    if (this.state.contentkey == 'plan') {
      return <Plan />;
    }
    return <Plan />;
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