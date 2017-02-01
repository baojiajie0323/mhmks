import React from 'react';
import ConfigMenu from './config_menu';
import User from './user';
import Depart from './department';
import Role from './role';
import styles from './config.less';

class Config extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentkey: 'user'
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
    if (this.state.contentkey == 'user') {
      return <User />;
    } else if(this.state.contentkey == 'depart') {
      return <Depart />
    } else if(this.state.contentkey == 'role') {
      return <Role />
    }
    return <User />;
  }
  render() {
    return (
      <div className={styles.container}>        
        <ConfigMenu clickcb={this.onMenuClick} />
        {this.getContent()}
      </div>
    );
  }
}

export default Config;