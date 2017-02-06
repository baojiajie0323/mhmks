import React from 'react';
import styles from './aboutme.less';
import AppBar from 'material-ui/AppBar';

class Aboutme extends React.Component {
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
          title='我的'
          iconElementLeft={<span></span>}
          />
      </div>
    );
  }
}

export default Aboutme;