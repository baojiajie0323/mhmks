import React from 'react';
import styles from './home.less';


import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';


import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';

class DoPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, '');
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          title='执行计划'
          onLeftIconButtonTouchTap={this.onClickBack}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          />
        <div className={[styles.content,styles.content_notoolbar].join(' ')}>
          <List>
          {this.getStorelist()}
          </List>
        </div>
      </div>
    );
  }
}

export default DoPlan;