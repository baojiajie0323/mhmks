import React from 'react';
import styles from './home.less';
import AppBar from 'material-ui/AppBar';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';

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
          iconElementLeft={<span></span>}
          iconElementRight={<FlatButton label="排班" />}
          onRightIconButtonTouchTap={this.onClickAddPlan}
          />
      </div>
    );
  }
}

export default Home;