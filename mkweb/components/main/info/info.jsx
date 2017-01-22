import React from 'react';
import InfoMenu from './info_menu';
import styles from './info.less';

class Info extends React.Component {
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
      <div className={styles.container}>
        <InfoMenu />
      </div>
    );
  }
}

export default Info;