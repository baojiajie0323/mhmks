import React from 'react';
import styles from './header.less';

class HeaderTitle extends React.Component {
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
      <div className={styles.headertitle}>
        <div className={styles.headerlogo}></div>
        铛铛巡店业务管理平台
      </div>
    );
  }
}

export default HeaderTitle;