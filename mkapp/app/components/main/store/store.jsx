import React from 'react';
import styles from './store.less';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { cyan600 } from 'material-ui/styles/colors';

class StoreView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  onClickStore(e){
    console.log(e);
    Store.emit(StoreEvent.SE_VIEW,'storedetailview');
  }
  getStoreDom() {
    var domlist = [];
    for (var i = 0; i < 50; i++) {
      domlist.push(<ListItem
        primaryText="家乐福青岛名达店"
        rightIcon={<RightIcon color={cyan600} />}
        onTouchTap={this.onClickStore}
        />);
      domlist.push(<Divider />);
    }
    return domlist;
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          title='门店'
          iconElementLeft={<span></span>}
          />
        <div className={styles.content}>
          <List>
            {this.getStoreDom() }
          </List>
        </div>
      </div>
    );
  }
}

export default StoreView;