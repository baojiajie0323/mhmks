import React from 'react';
import styles from './home.less';
import AppBar from 'material-ui/AppBar';

class Home extends React.Component {
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
          title='首页'
          iconElementLeft={<span></span>}
          />
      </div>
    );
  }
}

export default Home;