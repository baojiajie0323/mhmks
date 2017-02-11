import React from 'react';
import styles from './home.less';


import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';


import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';

class SelectStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  getStorelist() {
    return [<ListItem
      leftCheckbox={<Checkbox />}
      primaryText="华北大润发即墨店"
      />,
      <ListItem
        leftCheckbox={<Checkbox />}
        primaryText="华北大润发城阳店"
        />,
      <ListItem
        leftCheckbox={<Checkbox />}
        primaryText="家乐福青岛新兴店"
        />]
  }
  onClickBack() {
    Store.emit(StoreEvent.SE_VIEW, '');
  }
  onClickOk() {
    Store.emit(StoreEvent.SE_VIEW, '');
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          title='选择门店'
          onLeftIconButtonTouchTap={this.onClickBack}
          onRightIconButtonTouchTap={this.onClickOk}
          iconElementLeft={<IconButton><LeftIcon /></IconButton>}
          iconElementRight={<FlatButton label="确定" />}
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

export default SelectStore;