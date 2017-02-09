import React from 'react';
import styles from './contacts.less';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { cyan600} from 'material-ui/styles/colors';

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
          title='通讯录'
          iconElementLeft={<span></span>}
          />
        <List>
          <ListItem
            primaryText={<a href='tel:15026489683'>鲍嘉捷</a>}
            rightIcon={<PhoneIcon color={cyan600} />}
            />
          <Divider />
          <ListItem
            primaryText={<a href='tel:15026489683'>鲍嘉捷</a>}
            rightIcon={<PhoneIcon color={cyan600} />}
            />
          <Divider />
          <ListItem
            primaryText={<a href='tel:15026489683'>鲍嘉捷</a>}
            rightIcon={<PhoneIcon color={cyan600} />}
            />
          <Divider />
          <ListItem
            primaryText={<a href='tel:15026489683'>鲍嘉捷</a>}
            rightIcon={<PhoneIcon color={cyan600} />}
            />
          <Divider />
          <ListItem
            primaryText={<a href='tel:15026489683'>鲍嘉捷</a>}
            rightIcon={<PhoneIcon color={cyan600} />}
            />
          <Divider />
          <ListItem
            primaryText={<a href='tel:15026489683'>鲍嘉捷</a>}
            rightIcon={<PhoneIcon color={cyan600} />}
            />
          <Divider />
          <ListItem
            primaryText={<a href='tel:15026489683'>鲍嘉捷</a>}
            rightIcon={<PhoneIcon color={cyan600} />}
            />
          <Divider />
          <ListItem
            primaryText={<a href='tel:15026489683'>鲍嘉捷</a>}
            rightIcon={<PhoneIcon color={cyan600} />}
            />
          <Divider />
        </List>
      </div>
    );
  }
}

export default Contacts;