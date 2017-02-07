import React from 'react';
import styles from './store.less';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { pinkA200, cyan600, transparent } from 'material-ui/styles/colors';

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
        <List>
          <ListItem
            primaryText="Chelsea Otakan"
            rightIcon={<RightIcon color={cyan600} />}
            />
          <Divider />
          <ListItem
            primaryText="Eric Hoffman"
            rightIcon={<RightIcon color={cyan600} />}
            />
          <Divider />
          <ListItem
            primaryText="James Anderson"
            rightIcon={<RightIcon color={cyan600} />}
            />
          <Divider />
          <ListItem
            primaryText="Kerem Suer"
            rightIcon={<RightIcon color={cyan600} />}
            />
          <Divider />
          <ListItem
            primaryText="Adelle Charles"
            rightIcon={<RightIcon color={cyan600} />}
            />
          <Divider />
          <ListItem
            primaryText="Adham Dannaway"
            rightIcon={<RightIcon color={cyan600} />}
            />
          <Divider />
          <ListItem
            primaryText="Allison Grayce"
            rightIcon={<RightIcon color={cyan600} />}
            />
          <Divider />
          <ListItem
            primaryText="Angel Ceballos"
            rightIcon={<RightIcon color={cyan600} />}
            />
          <Divider />
        </List>
      </div>
    );
  }
}

export default Store;