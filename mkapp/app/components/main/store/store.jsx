import React from 'react';
import styles from './store.less';
import AppBar from 'material-ui/AppBar';

class Store extends React.Component {
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
        <AppBar
          title='门店'
          iconElementLeft={<span></span>}
          />
      </div>
    );
  }
}

export default Store;