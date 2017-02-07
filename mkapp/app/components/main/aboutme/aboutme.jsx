import React from 'react';
import styles from './aboutme.less';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import PosIcon from 'material-ui/svg-icons/maps/my-location';
import { cyan600} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';

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
          title='个人中心'
          iconElementLeft={<span></span>}
          />
        <div className={styles.usercontainer}>
          <Paper className={styles.userphoto} zDepth={3} circle={true} />
          <p className={styles.username}>李春香</p>
        </div>
        <List>
          <ListItem primaryText="我的位置" leftIcon={<PosIcon color={cyan600} />} />
          <Divider />
        </List>
      </div>
    );
  }
}

export default Aboutme;