import React from 'react';
import Headertitle from './headertitle';
import Headernav from './headernav';
import Headeruser from './headeruser';
import styles from './header.less';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div className={styles.header}>
        <Headertitle />
        <Headernav />
        <Headeruser />
      </div>
    );
  }
}

export default Header;