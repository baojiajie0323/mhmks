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
  getContactsDom() {
    var domlist = [];
    for (var i = 0; i < 50; i++) {
      domlist.push(<a href='tel:15026489683'>
        <ListItem
          primaryText="鲍嘉捷"
          rightIcon={<PhoneIcon color={cyan600} />}
          />
      </a>);
      domlist.push(<Divider />);
    }
    return domlist;
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          title='通讯录'
          iconElementLeft={<span></span>}
          />
        <div className={styles.content}>
          <List>
            {this.getContactsDom() }
          </List>
        </div>
      </div >
    );
  }
}

export default Contacts;