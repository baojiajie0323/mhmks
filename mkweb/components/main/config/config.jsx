import React from 'react';
import ConfigMenu from './config_menu';
import User from './user';
import Depart from './department';
import Role from './role';
import Path from './path';
import Subsidy from './subsidy';
import Routecost from './routecost';
import RoutecostArea from './routecost_area';
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
    } else if(this.state.contentkey == 'path') {
      return <Path />
    } else if(this.state.contentkey == 'subsidy') {
      return <Subsidy />
    } else if(this.state.contentkey == 'routecost') {
      return <Routecost />
    } else if(this.state.contentkey == 'routecostarea') {
      return <RoutecostArea />
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