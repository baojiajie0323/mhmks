import React from 'react';
import styles from './contacts.less';
import AppBar from 'material-ui/AppBar';

class Contacts extends React.Component {
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
          title='通讯'
          iconElementLeft={<span></span>}
          />
      </div>
    );
  }
}

export default Contacts;