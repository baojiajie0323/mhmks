import React from 'react';
import styles from './home.less';
import AppBar from 'material-ui/AppBar';
import AddIcon from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';

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
  onClickAddPlan(){
  }

  render() {
    return (
      <div className={styles.container}>
        <AppBar
          title='首页'
          iconElementLeft={<span />}
          iconElementRight={<IconButton><AddIcon /></IconButton>}
          onRightIconButtonTouchTap={this.onClickAddPlan}
          />
      </div>
    );
  }
}

export default Home;