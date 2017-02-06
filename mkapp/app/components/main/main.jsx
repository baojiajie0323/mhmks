import React from 'react';
import styles from './main.less';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import ContactsIcon from 'material-ui/svg-icons/communication/contact-phone';
import MyIcon from 'material-ui/svg-icons/action/account-circle';
import StoreIcon from 'material-ui/svg-icons/action/store';
import HomeIcon from 'material-ui/svg-icons/action/home';

import Home from './home/home';
import Store from './store/store';
import Contacts from './contacts/contacts';
import Aboutme from './aboutme/aboutme';


const contactsIcon = <ContactsIcon />;
const myIcon = <MyIcon />;
const storeIcon = <StoreIcon />;
const homeIcon = <HomeIcon />;


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    this.select = this.select.bind(this);
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  
  select(index) {
    this.setState({ selectedIndex: index });
  }

  getContent() {
    if(this.state.selectedIndex == 0){
      return <Home />
    }else if(this.state.selectedIndex == 1){
      return <Store />
    }else if(this.state.selectedIndex == 2){
      return <Contacts />
    }else if(this.state.selectedIndex == 3){
      return <Aboutme />
    }
    return <Home />
  }
  render() {
    const PaperStyle = {
      position: 'absolute',
      bottom: 0
    }
    return (
      <div className={styles.container}>
        {this.getContent()}
        <Paper style={PaperStyle} zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="首页"
              icon={homeIcon}
              onTouchTap={() => this.select(0) }
              />
            <BottomNavigationItem
              label="门店"
              icon={storeIcon}
              onTouchTap={() => this.select(1) }
              />
            <BottomNavigationItem
              label="通讯"
              icon={contactsIcon}
              onTouchTap={() => this.select(2) }
              />
            <BottomNavigationItem
              label="我的"
              icon={myIcon}
              onTouchTap={() => this.select(3) }
              />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

export default Main;